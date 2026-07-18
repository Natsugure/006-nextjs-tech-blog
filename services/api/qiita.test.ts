import { afterEach, expect, test, vi } from "vitest"
import axios from "axios"
import openGraphScraper from "open-graph-scraper"
import type { SuccessResult } from "open-graph-scraper/types"
import { getQiitaItems, type QiitaResponse } from "./qiita"

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}))

vi.mock("open-graph-scraper", () => ({
  default: vi.fn(),
}))

const mockedAxiosGet = vi.mocked(axios.get)
const mockedOpenGraphScraper = vi.mocked(openGraphScraper)

const mockOgpResult: SuccessResult = {
  error: false,
  result: {
    ogImage: [
      {
        url: "https://example.com/og-image.jpg",
      }
    ],
  },
  response: {},
  html: "<html></html>",
}

afterEach(() => {
  mockedAxiosGet.mockReset()
  mockedOpenGraphScraper.mockReset()
})

test("正常系: Qiitaから記事一覧を取得できる", async () => {
  const mockResponse: QiitaResponse[] = [
    {
      id: "1",
      title: "Qiita記事1",
      url: "https://qiita.com/items/1",
      created_at: "2026-01-01T00:00:00.000Z",
    },
  ]

  mockedAxiosGet.mockResolvedValueOnce({ data: mockResponse })
  mockedOpenGraphScraper.mockResolvedValueOnce(mockOgpResult)
  const result = await getQiitaItems()
  result.forEach((item, index) => {
    expect(item.id).toEqual(mockResponse[index].id)
    expect(item.title).toEqual(mockResponse[index].title)
    expect(item.url).toEqual(mockResponse[index].url)
    expect(item.created_at).toEqual(mockResponse[index].created_at)
    expect(item.image).toEqual(mockOgpResult.result.ogImage?.[0]?.url || "")
  })

  const expectedQiitaItems = mockResponse.map((item) => ({
    id: item.id,
    title: item.title,
    url: item.url,
    image: mockOgpResult.result.ogImage?.[0]?.url || "",
    created_at: item.created_at,
  }))
  expect(result).toEqual(expectedQiitaItems)
})

test("正しいURLとヘッダーでQiita APIが呼び出される", async () => {
  const mockResponse: QiitaResponse[] = []
  mockedAxiosGet.mockResolvedValueOnce({ data: mockResponse })
  mockedOpenGraphScraper.mockResolvedValueOnce(mockOgpResult)

  await getQiitaItems()
  expect(mockedAxiosGet).toHaveBeenCalledWith(
    "https://qiita.com/api/v2/authenticated_user/items",
    expect.objectContaining({
      headers: expect.objectContaining({
        Authorization: `Bearer ${process.env.QIITA_API_TOKEN}`,
      }),
    })
  )
})