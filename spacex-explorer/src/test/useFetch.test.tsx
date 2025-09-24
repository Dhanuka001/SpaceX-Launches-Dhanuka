import { describe , it , expect } from 'vitest'
import { renderHook , waitFor } from '@testing-library/react'
import { useFetch } from '../hooks/useFetch'

describe('useFetch', () => {
  it('loads data and cache it', async () => {
    const { result , rerender} = renderHook(({ url }) => useFetch<any>({ url }), {
        initialProps: { url: 'https://api.spacexdata.com/v4/launches' }
    })

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.data).toBeTruthy()

    //re render with the same url -> cache should make loading false immediately
    rerender({ url: 'https://api.spacexdata.com/v4/launches' })
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('handles abort when URL changes quickly' , async () => {
    const { result , rerender} = renderHook(({ url }) => useFetch<any>({ url }), {
        initialProps: { url:'https://api.spacexdata.com/v4/launches'}
    })

    // change url before first completes -> previous request is aborted
    rerender({ url: 'https://api.spacexdata.com/v4/launches/2' })
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.data).toBeTruthy()
  })
  
})