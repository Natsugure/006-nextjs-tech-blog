import axios from "axios"
import openGraphScraper from "open-graph-scraper"

export interface QiitaResponse {
  id: string;
  title: string;
  url: string;
  created_at: string;
}

export interface QiitaItem {
  id: string;
  title: string;
  url: string;
  image: string;
  created_at: string;
}

export async function getQiitaItems(limit?: number): Promise<QiitaItem[]> {
  const response = await axios.get<QiitaResponse[]>(
    "https://qiita.com/api/v2/authenticated_user/items",
    {
      headers: {
        Authorization: `Bearer ${process.env.QIITA_API_TOKEN}`,
      },
      params: {
        per_page: limit
      }
    }
  )
  const responseItems = response.data

  const qiitaItems: QiitaItem[] = await Promise.all(
    responseItems.map(async (item) => {
      const ogImageUrl = await fetchQiitaOgpImage(item.url)
      return {
        id: item.id,
        title: item.title,
        url: item.url,
        image: ogImageUrl || "", // OGP画像が取得できない場合は空文字を設定
        created_at: item.created_at,
      }
    })
  )

  return qiitaItems
}

async function fetchQiitaOgpImage(url: string): Promise<string> {
  const ogsOptions = await openGraphScraper({ url, onlyGetOpenGraphInfo: true })
  return ogsOptions.result.ogImage?.[0]?.url || ""
}