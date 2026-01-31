// components/PostList.tsx
import { IBlogPost } from "@/types/blogs.type";
import PostCard from "./PostCard";

export default function PostList({ posts }: { posts: IBlogPost[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
