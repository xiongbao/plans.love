import Link from "next/link";
import CardsList from "@/components/CardsList";
import { CardSkeleton } from "@/components/Card";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "爱的计划",
  description:
    "记录我在父母与妻女之间的幸福事件",
};

const Page = () => {
  return (
    <main className="max-w-screen-md mx-auto px-4">
      <section className="my-20">
        <header>
          <h1 className="mb-8 text-2xl uppercase font-semibold text-neutral-400">
            爱的计划
          </h1>
          <p className="text-4xl font-semibold leading-snug">
            2023 年 7 月开始了异地工作，此站记录老家-工作地-妻女之间的计划。
          </p>
        </header>
      </section>

      <section className="my-20">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">临近计划</h2>
          <Link
            href="/plans"
            className="group block text-xs uppercase hover:text-neutral-400 duration-200"
          >
            <span>所有计划</span>
            <span className="inline-block transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none">
              &nbsp;-&gt;
            </span>
          </Link>
        </header>
        <Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        >
          <CardsList limit={3} offset={0} />
        </Suspense>
      </section>
    </main>
  );
};

export default Page;
