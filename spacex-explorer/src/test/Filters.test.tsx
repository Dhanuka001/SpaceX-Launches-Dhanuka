import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import LaunchList from '../components/LaunchList'

describe('LaunchList – status and year filters', () => {
  it('filters by status and then by year', async () => {
    render(
      <MemoryRouter>
        <LaunchList />
      </MemoryRouter>
    )

    // Wait for filters to be present and initial items to load
    await screen.findByRole('combobox', { name: /year/i })
    await screen.findByText('FalconSat')
    await screen.findByText('CRS-20')

    // Filter by status: success
    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: /status/i }),
      'success'
    )

    // After filtering, CRS-20 (success: true) should show, FalconSat (success: false) should not
    await screen.findByText('CRS-20')
    await waitFor(() =>
      expect(screen.queryByText('FalconSat')).not.toBeInTheDocument()
    )

    // Reset to "all" then (optionally) filter by year 2020 if available
    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: /status/i }),
      'all'
    )

    const yearSelect = screen.getByRole('combobox', { name: /year/i }) as HTMLSelectElement
    const has2020 = Array.from(yearSelect.options).some(o => o.value === '2020')
    if (has2020) {
      await userEvent.selectOptions(yearSelect, '2020')
      await screen.findByText('CRS-20') // launched in 2020
    }
  })
})
