import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import LaunchList from '../components/LaunchList'
import { test , expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

test('renders list and filters by search', async () => {
  render(
  <MemoryRouter>
    <LaunchList />
  </MemoryRouter>
  )
  // wait for network to settle
  await waitFor(() => expect(screen.queryByText(/Failed to load/)).not.toBeInTheDocument())

  // Search "CRS-20"
  const search = screen.getByRole('textbox', { name:/search/i })
  await userEvent.type(search, 'CRS-20')

  // should show filtered card
  await screen.findByText('CRS-20')
  expect(screen.queryByText('FalconSat')).not.toBeInTheDocument()
})
