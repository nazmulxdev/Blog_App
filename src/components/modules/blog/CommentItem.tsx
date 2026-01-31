// components/comments/CommentItem.tsx
import { Badge } from "@/components/ui/badge";

export default function CommentItem({ comment }: { comment: any }) {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border p-4">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{comment.author_id}</span>
          <span>{new Date(comment.created_at).toLocaleString()}</span>
        </div>

        <p className="mt-2">{comment.content}</p>

        <Badge variant="outline" className="mt-2">
          {comment.status}
        </Badge>
      </div>

      {/* Replies */}
      {comment.replies?.length > 0 && (
        <div className="ml-6 space-y-3 border-l pl-4">
          {comment.replies.map((reply: any) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}
