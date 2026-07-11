import axios from "axios";

interface QiitaResponse {
  id: string;
  title: string;
  url: string;
  image: string;
  created_at: string;
}

export async function getQiitaItems(): Promise<QiitaResponse[]> {
  const response = await axios.get<QiitaResponse[]>(
    "https://qiita.com/api/v2/authenticated_user/items",
    {
      headers: {
        Authorization: `Bearer ${process.env.QIITA_API_TOKEN}`,
      },
    }
  );
  return response.data;
}