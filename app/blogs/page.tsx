import { PostCard, type PostCardItem } from "@/features/blogs/components/PostCard";
import { getCmsItems } from "@/services/api/microCms";

export default async function BlogListPage() {
  const getListItems = async (): Promise<PostCardItem[]> => {
    const cmsItems = await getCmsItems();
    return cmsItems.map((item) => ({
      url: "",
      title: item.title,
      publishedAt: item.publishedAt,
      eyecatchUrl: item.eyecatch.url,
    }));
  }

  const listItems = await getListItems();
  
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4 mt-8"> microCMS 記事一覧</h2>
        <div className="flex flex-wrap gap-4">
          {listItems.map((item, index) => (
            <PostCard item={item} key={index} />
          ))}
        </div>
      </div>
    </>
  )
}