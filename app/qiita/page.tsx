import { PostCard, type PostCardItem } from "@/features/blogs/components/PostCard";
import { getQiitaItems } from "@/services/api/qiita";

export const revalidate = 300

export default async function QiitaPage() {
  const getQiitaListItems = async (): Promise<PostCardItem[]> => {
    const qiitaItems = await getQiitaItems();
    return qiitaItems.map((item) => ({
      url: item.url,
      title: item.title,
      publishedAt: item.created_at,
      eyecatchUrl: item.image
    }))
  };

  const qiitaItems = await getQiitaListItems();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Qiita 記事一覧</h2>
        <div className="flex flex-wrap gap-4">
          {qiitaItems.map((item, index) => (
            <PostCard item={item} key={index} newTab={true} />
          ))}
        </div>
    </div>
  )
}