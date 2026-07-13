import Image from "next/image"
import DomPurify from "isomorphic-dompurify"
import { getCmsContent } from "@/services/api/microCms"

export default async function BlogContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cmsContent = await getCmsContent(id);
  const sanitizedContent = DomPurify.sanitize(cmsContent.content);
  
  return (
    <div className="container w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{cmsContent.title}</h1>
      <p className="text-gray-600 mb-4">Published at: {new Date(cmsContent.publishedAt).toLocaleDateString()}</p>
      <Image 
        src={cmsContent.eyecatch.url}
        alt={cmsContent.title} className="mb-4"
        width={600}
        height={225}
        loading="eager"
      />
      <div className="prose" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </div>
  );
}