import axios from "axios";

interface CmsResponse {
  contents: CmsContent[];
  totalCount: number;
  offset: number;
  limit: number;
}

interface CmsContent {
  id: string;
  publishedAt: string;
  created_at: string;
  title: string;
  eyecatch: {
    url: string;
    height: number;
    width: number;
  };
}

export async function getCmsItems(limit?: number): Promise<CmsContent[]> {
  const url = limit
    ? `https://natsugure.microcms.io/api/v1/blogs?limit=${limit}`
    : "https://natsugure.microcms.io/api/v1/blogs";

  const response = await axios.get<CmsResponse>(
    url,
    {
      headers: {
        "X-API-KEY": process.env.MICROCMS_API_KEY,
      },
    }
  );
  return response.data.contents;
}