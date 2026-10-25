import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('next/headers', () => ({ cookies: async () => ({ set: vi.fn(), delete: vi.fn(), get: vi.fn(() => undefined) }) }))
vi.mock('@/lib/logger', () => ({ logger: { error: vi.fn() } }))

describe('auth actions', () => {
  beforeEach(() => {
    process.env.MOCK_USER_EMAIL = 'demo@example.com'
    process.env.MOCK_USER_PASSWORD = 'secret'
  })

  it('login fails with wrong creds', async () => {
    const { login } = await import('../app/actions/auth')
    const res = await login(null, { email: 'x@y.com', password: 'wrong' })
    expect(res.success).toBe(false)
  })

  it('login rejects empty password config', async () => {
    process.env.MOCK_USER_PASSWORD = ''
    const { login } = await import('../app/actions/auth')
    const res = await login(null, { email: 'demo@example.com', password: 'secret' })
    expect(res.success).toBe(false)
  })
})
