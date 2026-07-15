import { afterEach, describe, expect, test, vi } from 'vitest'
import axios from 'axios'
import { getCmsContent, getCmsItems, type CmsItemResponse, type CmsContent } from './microCms'

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}))

const mockedAxiosGet = vi.mocked(axios.get)

afterEach(() => {
  mockedAxiosGet.mockReset()
})

describe("getCmsItems", () => {
  test("limit指定時にクエリパラメータが正しく付与される", async () => {
    const mockResponse: CmsItemResponse = {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 10,
    }
    mockedAxiosGet.mockResolvedValueOnce({ data: mockResponse })
    await getCmsItems(5)
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      "https://natsugure.microcms.io/api/v1/blogs?limit=5",
      expect.objectContaining({
        headers: expect.objectContaining({
          "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
        }),
      })
    )
  })

  test("limit未指定時にクエリパラメータが付与されない", async () => {
    const mockResponse: CmsItemResponse = {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 10,
    }
    mockedAxiosGet.mockResolvedValueOnce({ data: mockResponse })
    await getCmsItems()
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      "https://natsugure.microcms.io/api/v1/blogs",
      expect.objectContaining({
        headers: expect.objectContaining({
          "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
        }),
      })
    )
  })

  test("正常系: microCMSから記事一覧を取得できる", async () => {
    const mockResponse: CmsItemResponse = {
      contents: [
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
        {
          id: "2",
          publishedAt: "2026-01-01T00:00:00.000Z",
          created_at: "2026-01-01T00:00:00.000Z",
          title: "microCMS記事2",
          eyecatch: {
            url: "https://example.com/eyecatch2.jpg",
            height: 600,
            width: 800,
          },
        }
      ],
      totalCount: 2,
      offset: 0,
      limit: 10,
    }
    mockedAxiosGet.mockResolvedValueOnce({ data: mockResponse })
    const result = await getCmsItems()
    expect(result).toEqual(mockResponse.contents)
  })
})

describe("getCmsContent", () => {
  test("指定したIDをURLに含めてリクエストする", async () => {
    mockedAxiosGet.mockResolvedValueOnce({ data: {} })
    await getCmsContent("abc123")
    expect(mockedAxiosGet).toHaveBeenCalledWith(
      "https://natsugure.microcms.io/api/v1/blogs/abc123",
      expect.objectContaining({
        headers: expect.objectContaining({
          "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
        }),
      })
    )
  })

  test("正常系: microCMSから記事詳細を取得できる", async () => {
    const mockResponse: CmsContent = {
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
    }
    mockedAxiosGet.mockResolvedValueOnce({ data: mockResponse })
    const result = await getCmsContent("1")
    expect(result).toEqual(mockResponse)
  })
})
