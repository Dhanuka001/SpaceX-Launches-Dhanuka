import '@testing-library/jest-dom'
import { beforeAll , afterEach , afterAll } from 'vitest'
import { server } from './testServer'
import 'whatwg-fetch'

beforeAll(() => server.listen({ onUnhandledRequest: 'warn'}))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())