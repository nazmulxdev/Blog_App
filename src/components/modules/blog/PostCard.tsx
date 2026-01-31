// components/PostCard.tsx

"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare } from "lucide-react";
import { IBlogPost } from "@/types/blogs.type";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PostCard({ post }: { post: IBlogPost }) {
  const router = useRouter();
  return (
    <Card className="overflow-hidden hover:shadow-lg transition">
      {post.thumbnail && (
        <img
          src={post.thumbnail}
          alt={post.title}
          className="h-48 w-full object-cover"
        />
      )}

      <CardHeader className="space-y-2">
        <div className="flex gap-2 flex-wrap">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <h2 className="text-xl font-semibold line-clamp-2">{post.title}</h2>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {post.content}
        </p>
        <div className="text-sm text-muted-foreground line-clamp-3 hover:underline">
          <Button onClick={() => router.push(`/blogs/${post.id}`)}>
            {" "}
            Read more
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <span>{new Date(post.created_at).toDateString()}</span>

        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          {post.views}
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className="w-4 h-4" /> {post._count?.comments}
        </div>
      </CardFooter>
    </Card>
  );
}
