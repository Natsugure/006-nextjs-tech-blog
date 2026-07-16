import { afterEach, expect, test, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import axios from "axios"
import BlogContentPage from "./page"
import { type CmsContent } from "@/services/api/microCms"

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}))

const mockedAxiosGet = vi.mocked(axios.get)

afterEach(() => {
  mockedAxiosGet.mockReset()
})

const cmsContent: { data: CmsContent } = {
  data: {
    id: "1",
    publishedAt: "2026-01-01T00:00:00.000Z",
    revisedAt: "2026-01-01T00:00:00.000Z",
    title: "microCMS記事1",
    content: "<p>記事の本文</p>",
    eyecatch: {
      url: "https://example.com/eyecatch1.jpg",
      height: 600,
      width: 800,
    },
  },
}

test("タイトル・公開日・画像・本文が正しく表示される", async () => {
  mockedAxiosGet.mockResolvedValueOnce(cmsContent)
  render(await BlogContentPage({ params: Promise.resolve({ id: "1" }) }))

  expect(screen.getByRole("heading", { level: 1, name: "microCMS記事1" })).toBeDefined()
  expect(screen.getByRole("img", { name: "microCMS記事1" })).toBeDefined()
  expect(screen.getByText("記事の本文")).toBeDefined()
})

test("本文中のscriptタグが無効化される", async () => {
  const cmsContentWithScript: { data: CmsContent } = {
    data: {
      ...cmsContent.data,
      content: "<p>記事の本文</p><script>alert('XSS');</script>",
    },
  }
  mockedAxiosGet.mockResolvedValueOnce(cmsContentWithScript)
  render(await BlogContentPage({ params: Promise.resolve({ id: "1" }) }))

  expect(screen.getByText("記事の本文")).toBeDefined()
  expect(screen.queryByText("alert('XSS');")).toBeNull()
})