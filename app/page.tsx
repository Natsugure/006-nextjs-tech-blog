import { getQiitaItems } from "@/services/api/qiita";
import { getCmsItems } from "@/services/api/microCms";
import { PostCard, type PostCardItem } from "@/features/blogs/components/PostCard";
import Link from "next/link";

export default async function Home() {
  const getQiitaListItems = async (): Promise<PostCardItem[]> => {
    const qiitaItems = await getQiitaItems();
    return qiitaItems.slice(0, 4).map((item) => ({
      url: item.url,
      title: item.title,
      publishedAt: item.created_at,
      eyecatchUrl: "https://qiita-user-contents.imgix.net/https%3A%2F%2Fcdn.qiita.com%2Fassets%2Fpublic%2Farticle-ogp-background-9f5428127621718a910c8b63951390ad.png?ixlib=rb-4.0.0&w=1200&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTkxNiZoPTMzNiZ0eHQ9SmF2YVNjcmlwdCVFMyU4MSVBN1VSTCVFMyU4MSU4QiVFMyU4MiU4OU9HUCVFNSU4RiU5NiVFNSVCRSU5NyVFMyU4MSU5OSVFMyU4MiU4QiZ0eHQtY29sb3I9JTIzMjEyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTU2JnR4dC1jbGlwPWVsbGlwc2lzJnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnM9NDM5YjY5NjY3Nzg3ZTExYzdmYTM2YjI1ZDg3NTcyN2Y&mark-x=142&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTYxNiZ0eHQ9JTQwa3N5dW5ubm4mdHh0LWNvbG9yPSUyMzIxMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT0zNiZ0eHQtYWxpZ249bGVmdCUyQ3RvcCZzPWUxMjJhOTA1NDdiNTMzNDI4MWY3YmU0M2U2Y2I1M2Rh&blend-x=142&blend-y=491&blend-mode=normal&s=1a611f7e8833ff640580434a1b03d27a",
    }))
  };

  const getCmsListItems = async (): Promise<PostCardItem[]> => {
    const cmsItems = await getCmsItems(4);
    return cmsItems.map((item) => ({
      url: `/blogs/${item.id}`,
      title: item.title,
      publishedAt: item.publishedAt,
      eyecatchUrl: item.eyecatch.url,
    }))
  }

  const qiitaItems = await getQiitaListItems();
  const cmsItems = await getCmsListItems();

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between mb-4 mt-16">
        <h2 className="flex-none text-2xl font-bold">Qiita 最近の記事</h2>
        <a
          href="/qiita"
          className="link"
        >
          もっと見る
        </a>
      </div>
      <div className="flex flex-wrap gap-4">
        {qiitaItems.map((item, index) => (
          <PostCard item={item} key={index} />
        ))}
      </div>

      <div className="flex justify-between mb-4 mt-16">
        <h2 className="flex-none text-2xl font-bold"> microCMS 最近の記事</h2>
        <Link
          href="/blogs/"
          className="link"
        >
          もっと見る
        </Link>
      </div>
      <div className="flex flex-wrap gap-4">
        {cmsItems.map((item, index) => (
          <PostCard item={item} key={index} />
        ))}
      </div>
      </div>
    </>
  );
}
