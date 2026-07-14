import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PostCard, type PostCardItem } from './PostCard'

const item: PostCardItem = {
  url: 'https://example.com/article',
  title: 'テスト記事タイトル',
  publishedAt: '2026-01-01',
  eyecatchUrl: 'https://example.com/image.png',
}

test('タイトル・公開日・画像・リンク先が表示される', () => {
  render(<PostCard item={item} />)

  expect(screen.getByText('テスト記事タイトル')).toBeDefined()
  expect(screen.getByText('2026-01-01')).toBeDefined()
  expect(screen.getByRole('img', { name: 'テスト記事タイトル' })).toBeDefined()

  expect(screen.getByRole('link').getAttribute('href')).toBe(item.url)
})

test('newTabがtrueのときに、リンク先を新しいタブで開く', () => {
  render(<PostCard item={item} newTab={true} />)

  const link = screen.getByRole('link')
  expect(link.getAttribute('target')).toBe('_blank')
  expect(link.getAttribute('rel')).toBe('noopener noreferrer')
})

test('newTab未指定のときに、リンクを既存タブで開く', () => {
  render(<PostCard item={item} />)

  const link = screen.getByRole('link')
  expect(link.getAttribute('target')).toBeNull()
  expect(link.getAttribute('rel')).toBeNull()
})