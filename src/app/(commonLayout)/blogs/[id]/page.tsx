import CommentList from "@/components/modules/blog/CommentList";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { blogService } from "@/services/blog.service";
import { IBlogPost } from "@/types/blogs.type";

import { Eye, MessagesSquare } from "lucide-react";

//*  [{id:shjfjkadsjfjkaesfj},{id:isjfieasjfile},{id:hfudshfesh}]

export async function generateStaticParams() {
  const { data } = await blogService.getAllBlogPOst();

  return data?.data
    ?.map((blog: IBlogPost) => ({
      id: String(blog.id),
    }))
    .splice(0, 3);
}

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogData = await blogService.getBlogById(id);

  const post = blogData.data.data;

  // for testing purpose

  return (
    <section className="container mx-auto py-10 space-y-6">
      {/* Thumbnail */}
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full rounded-xl object-cover max-h-[400px]"
        />
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold leading-tight">{post.title}</h1>

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span>{new Date(post.created_at).toDateString()}</span>

        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          {post.views}
        </div>

        <div className="flex items-center gap-1">
          <MessagesSquare className="w-4 h-4" />
          {post._count.comments}
        </div>

        {post.is_featured && <Badge variant="default">Featured</Badge>}
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {post.tags.map((tag: string) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      <Separator />

      {/* Content */}
      <article className="prose prose-neutral max-w-none">
        {post.content}
      </article>

      <Separator />

      {/* Comments */}
      <CommentList comments={post.comments} />
    </section>
  );
}
