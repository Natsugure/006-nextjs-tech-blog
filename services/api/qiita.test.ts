import { afterEach, expect, test, vi } from "vitest"
import axios from "axios"
import { getQiitaItems, type QiitaResponse } from "./qiita"

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}))

const mockedAxiosGet = vi.mocked(axios.get)

afterEach(() => {
  mockedAxiosGet.mockReset()
})

test("正常系: Qiitaから記事一覧を取得できる", async () => {
  const mockResponse: QiitaResponse[] = [
    {
      id: "1",
      title: "Qiita記事1",
      url: "https://qiita.com/items/1",
      image: "",
      created_at: "2026-01-01T00:00:00.000Z",
    },
  ]
  mockedAxiosGet.mockResolvedValueOnce({ data: mockResponse })
  const result = await getQiitaItems()
  expect(result).toEqual(mockResponse)
})

test("正しいURLとヘッダーでQiita APIが呼び出される", async () => {
  const mockResponse: QiitaResponse[] = []
  mockedAxiosGet.mockResolvedValueOnce({ data: mockResponse })
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