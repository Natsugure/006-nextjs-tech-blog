import { getQiitaItems } from "@/services/api/qiita";
import { getCmsItems } from "@/services/api/microCms";
import { PostCard, type PostCardItem } from "@/features/blogs/components/PostCard";
import Link from "next/link";

export default async function Home() {
  const getQiitaListItems = async (): Promise<PostCardItem[]> => {
    const qiitaItems = await getQiitaItems(4);
    return qiitaItems.map((item) => ({
      url: item.url,
      title: item.title,
      publishedAt: item.created_at,
      eyecatchUrl: item.image,
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
        <Link
          href="/qiita"
          className="link"
        >
          もっと見る
        </Link>
      </div>
      <div className="flex flex-wrap gap-4">
        {qiitaItems.map((item, index) => (
          <PostCard item={item} key={index} newTab={true} />
        ))}
      </div>

      <div className="flex justify-between mb-4 mt-16">
        <h2 className="flex-none text-2xl font-bold">microCMS 最近の記事</h2>
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
