import { getPostDetail } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于 | 爱的计划",
  description:
    "这是一个关于爱的计划的站点，我会在这里分享我未来爱的行程。",
};

const Page = async () => {
  const post = (await getPostDetail(process.env.DISCUSSIONS_ABOUT_ID as string)).data.repository.discussion;
  return (
    <main className="px-4 my-20">
      <article className="prose prose-lg mx-auto prose-neutral prose-invert prose-img:rounded-lg prose-img:w-full prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-pre:bg-[#0c1117] prose-pre:p-2 prose-pre:rounded-xl">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.bodyHTML }}></div>
      </article>
    </main>
  );
};

export default Page;
