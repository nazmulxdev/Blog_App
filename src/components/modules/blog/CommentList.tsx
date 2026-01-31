// components/comments/CommentList.tsx

import CommentItem from "./CommentItem";

export default function CommentList({ comments }: { comments: any[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>

      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
