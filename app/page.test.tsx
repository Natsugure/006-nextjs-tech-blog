import { afterEach, expect, test, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import axios from "axios"
import Page from "./page"

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}))

const mockedAxiosGet = vi.mocked(axios.get)

const qiitaItems = [
  {
    id: "1",
    title: "Qiita記事1",
    url: "https://qiita.com/items/1",
    image: "",
    created_at: "2026-01-01T00:00:00.000Z",
  },
]

const cmsItems = [
  {
    id: "1",
    publishedAt: "2026-01-01T00:00:00.000Z",
    created_at: "2026-01-01T00:00:00.000Z",
    title: "microCMS記事1",
    eyecatch: {
      url: "https://example.com/eyecatch1.jpg",
      height: 600,
      width: 800,
    },
  },
]

afterEach(() => {
  mockedAxiosGet.mockReset()
})

function mockHomeApiResponses() {
  mockedAxiosGet
    .mockResolvedValueOnce({ data: qiitaItems })
    .mockResolvedValueOnce({ data: { contents: cmsItems } })
}

test("トップページにh2タグが正しく表示される", async () => {
  mockHomeApiResponses()

  render(await Page())
  
  expect(screen.getByRole("heading", { level: 2, name: "Qiita 最近の記事" })).toBeDefined()
  expect(screen.getByRole("heading", { level: 2, name: "microCMS 最近の記事" })).toBeDefined()
  expect(axios.get).toHaveBeenCalled()
})

test("もっと見るリンクが正しい遷移先を持つ", async () => {
  mockHomeApiResponses()

  render(await Page())

  const links = screen.getAllByRole('link', { name: 'もっと見る' })
  const hrefs = links.map((link) => link.getAttribute('href'))

  expect(hrefs).toEqual(['/qiita', '/blogs'])
})

