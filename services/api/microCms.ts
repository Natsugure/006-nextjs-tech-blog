import axios from "axios";

export interface CmsItemResponse {
  contents: CmsItem[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface CmsItem {
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

export interface CmsContent {
  id: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  eyecatch: {
    url: string;
    height: number;
    width: number;
  };
}

export async function getCmsItems(limit?: number): Promise<CmsItem[]> {
  const url = limit
    ? `https://natsugure.microcms.io/api/v1/blogs?limit=${limit}`
    : "https://natsugure.microcms.io/api/v1/blogs";

  const response = await axios.get<CmsItemResponse>(
    url,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
      },
    }
  );
  return response.data.contents;
}

export async function getCmsContent(id: string): Promise<CmsContent> {
  const response = await axios.get<CmsContent>(
    `https://natsugure.microcms.io/api/v1/blogs/${id}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY,
      },
    }
  );
  return response.data;
}