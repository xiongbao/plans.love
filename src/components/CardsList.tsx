import { memo } from "react";
import Card from "@/components/Card";
import { getPostsList } from "@/lib/api";

type CardsListProps = {
  limit: number;
  offset: number;
  latest?: boolean;
};

const CardsList = async ({ limit, offset, latest }: CardsListProps) => {
  const data = (await getPostsList(limit, offset)).data.repository.discussions;
  const posts = data.edges.flatMap((edge) => edge.node);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 筛选 posts 数组
  const filterPosts = posts.map((post) => {
    const match = post.title.match(/\[(.*?)\]/);
    const dateString = match ? match[1] : '';
    const datetime = dateString ? new Date(dateString) : null;

    // 替换 title 值
    const newTitle = post.title.replace(/\[.*?\]/, '');

    // 返回新的对象
    return {
      ...post,
      title: newTitle,
      datetime,
    };
  });

  // 筛选出日期在今天之后的 posts
  const UpcomingEvents = filterPosts.filter((post) => post.datetime >= today);

  console.log(UpcomingEvents);

  return posts.length > 0 ? (
    posts.map((post) => (
      <Card
        key={post.number}
        id={post.number}
        title={post.title}
        createdAt={post.updatedAt}
        category={post.category}
        labels={post.labels}
      />
    ))
  ) : (
    <div className="p-4 rounded-lg bg-neutral-800 text-center text-neutral-300 font-semibold">
      No events found
    </div>
  );
};

export default memo(CardsList);
