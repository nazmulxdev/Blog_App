import { env } from "@/env";
import { IGetBlogsParams, IServiceOption } from "@/types/blogs.type";

// export const PostStatus = {
//   DRAFT: "DRAFT",
//   PUBLISHED: "PUBLISHED",
//   ARCHIVED: "ARCHIVED",
// } as const;

// export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus];

// interface IGetBlogsParams {
//   search?: string;
//   tags?: string[];
//   isFeatured?: boolean | undefined;
//   status?: PostStatus | undefined;
//   author_id?: string | undefined;
//   page?: number;
//   limit?: number;
//   sortBy?: string;
//   sortOrder?: string;
//   skip?: number;
// }

const API_URL = env.API_URL;

export const blogService = {
  getAllBlogPOst: async function (
    payload?: IGetBlogsParams,
    options?: IServiceOption,
  ) {
    try {
      // use cache:"no-store" for no cashing data . always get it from server like server site though its have not dynamic route

      // use next:{revalidate: second} for timing revalidate post data. this will create new build static data then give new data;

      console.log(payload);

      const url = new URL(`${API_URL}/posts`);

      if (payload) {
        Object.entries(payload).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      // declared config
      const config: RequestInit = {};

      // checking cache and setting cache
      if (options?.cache) {
        config.cache = options?.cache;
      }

      // checking revalidate and revalidate

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      const data = await fetch(url.toString(), config);

      const allBlogPost = await data.json();

      if (allBlogPost.success) {
        return { data: allBlogPost.data, error: null };
      } else {
        return { data: null, error: { message: "Failed to load blog posts" } };
      }
    } catch (err) {
      console.error(err);
      return {
        data: null,
        error: { message: "Something went wrong to get blog posts." },
      };
    }
  },

  getBlogById: async function (id: string) {
    try {
      const data = await fetch(`${API_URL}/posts/${id}`);

      const singleBlog = await data.json();

      if (singleBlog.success) {
        return { data: singleBlog, error: null };
      } else {
        return {
          data: null,
          error: { message: "Failed to load blog." },
        };
      }
    } catch (error) {
      console.error(error);

      return {
        data: null,
        error: { message: "Error from single blog fetching." },
      };
    }
  },
};
