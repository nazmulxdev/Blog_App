// schemas/post.schema.ts
import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3, "Title is too short"),
  content: z.string().min(10, "Content is too short"),
  thumbnail: z.string().url().optional(),
  is_featured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  tags: z.array(z.string()).min(1, "At least one tag required"),
});

export type PostFormValues = z.infer<typeof postSchema>;

export interface IBlogPost {
  id: string | number;
  title: string;
  content: string;
  thumbnail?: string | null;
  is_featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  tags: string[];
  views: number;
  created_at: string;
  _count?: {
    comments: number;
  };
}

export const PostStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
} as const;

export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus];

export interface IGetBlogsParams {
  search?: string;
  tags?: string[];
  isFeatured?: boolean | undefined;
  status?: PostStatus | undefined;
  author_id?: string | undefined;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  skip?: number;
}

export interface IServiceOption {
  cache?: RequestCache;
  revalidate?: number;
}
