import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import axios from 'axios'
import Page from './page'

vi.mock('axios', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [] }),
  },
}))

test('Page', async () => {
  render(await Page())
  expect(screen.getByRole('heading', { level: 2, name: '記事一覧' })).toBeDefined()
  expect(axios.get).toHaveBeenCalled()
})