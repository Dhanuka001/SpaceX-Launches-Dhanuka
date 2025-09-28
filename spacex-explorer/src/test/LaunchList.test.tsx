import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import LaunchList from '../components/LaunchList'

const waitDebounceWindow = (ms = 350) =>
  new Promise((r) => setTimeout(r, ms))

describe('LaunchList – search filtering (debounce-safe)', () => {
  it('renders initial list, applies search, and hides non-matching items', async () => {
    render(
      <MemoryRouter>
        <LaunchList />
      </MemoryRouter>
    )

    // 1) Wait for initial items from MSW fixtures to be visible
    await screen.findByText('FalconSat')
    await screen.findByText('CRS-20')

    // 2) Type search query
    const search = screen.getByRole('textbox', { name: /search/i })
    await userEvent.clear(search)
    await userEvent.type(search, 'CRS-20')

    // 3) Give the UI a brief real-time pause to cover debounce + URL write
    await waitDebounceWindow()

    // 4) Assert the positive result is present
    await screen.findByText('CRS-20')

    // 5) Assert the negative result disappears (wrap in waitFor as it is async)
    await waitFor(() => {
      expect(screen.queryByText('FalconSat')).not.toBeInTheDocument()
    })
  }, 10000)
})
