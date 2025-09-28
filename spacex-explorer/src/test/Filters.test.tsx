import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LaunchList from '../components/LaunchList'
import { test , expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

test('filters by status and year', async () => {
  render(
  <MemoryRouter>
      <LaunchList />
    </MemoryRouter>
  )
  await waitFor(() => expect(screen.getByRole('combobox', { name:/year/i })).toBeInTheDocument())

  await userEvent.selectOptions(screen.getByRole('combobox', { name:/status/i }), 'success')
  await screen.findByText('CRS-20')
  expect(screen.queryByText('FalconSat')).not.toBeInTheDocument()

  // back to all, then filter by a year if present
  await userEvent.selectOptions(screen.getByRole('combobox', { name:/status/i }), 'all')
  const yearSelect = screen.getByRole('combobox', { name:/year/i }) as HTMLSelectElement
  const option2020 = Array.from(yearSelect.options).find(o => o.value === '2020')
  if (option2020) await userEvent.selectOptions(yearSelect, '2020')
  await screen.findByText('CRS-20')
})
