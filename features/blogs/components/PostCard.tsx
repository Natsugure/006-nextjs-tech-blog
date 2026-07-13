import Image from "next/image";
import Link from "next/link";

export interface PostCardItem {
  url: string;
  title: string;
  publishedAt: string;
  eyecatchUrl: string;
}

interface PostCardProps {
  item: PostCardItem;
  newTab?: boolean;
}

export function PostCard({ item, newTab } : PostCardProps) {
  return (
    <>
      <Link
        href={item.url}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        className="card bg-white w-2xs shadow-md overflow-hidden block hover:shadow-lg transition-shadow"
      >
        <Image src={item.eyecatchUrl} alt={item.title} width={400} height={300} loading="eager" />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-3">{item.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{item.publishedAt}</p>
        </div>  
      </Link>
    </>
  )
}