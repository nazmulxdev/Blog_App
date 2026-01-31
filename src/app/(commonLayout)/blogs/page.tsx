"use client";
import { getBlog } from "@/actions/blog.action";
import PostList from "@/components/modules/blog/PostLIst";
import { useEffect, useState } from "react";
// import { blogService } from "@/services/blog.service";

export default function Blogs() {
  // const { data } = await blogService.getAllBlogPOst(
  //   {
  //     isFeatured: true,
  //     page: 1,
  //     limit: 10,
  //   },
  //   { cache: "no-store" },
  // );

  // console.log(data);

  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await getBlog();
      setBlogData(data);
    })();
  }, []);

  console.log(blogData);

  return (
    <section className="container py-10 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <PostList posts={blogData?.data} />
    </section>
  );
}
