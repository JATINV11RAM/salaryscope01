import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Salary & Tax Guides | SalaryScope",
  description: "Plain English guides on salary, tax, and payroll for Indian professionals",
  alternates: { canonical: "https://salaryscope.in/blog" },
};

export default function BlogPage() {
  const articles = getAllPosts();

  return (
    <div className="min-h-[calc(100vh-64px-300px)] bg-[#F5F7FA] px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold text-[#1A1A2E] md:text-4xl">Salary &amp; Tax Guides</h1>
          <p className="text-[#6B7280]">Plain English guides on salary, tax, and payroll for Indian professionals</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.slug} className="flex h-full flex-col rounded-xl border border-[#E5E7EB] bg-white p-6">
              <div className="mb-4 flex items-center justify-between gap-3 text-xs font-semibold">
                <span className="rounded bg-[#EAF4F9] px-2 py-1 text-[#1A6B9A]">{article.category}</span>
                <span className="text-[#6B7280]">{article.readingTime}</span>
              </div>
              <h2 className="mb-3 text-lg font-semibold leading-snug text-[#1A1A2E]">{article.title}</h2>
              <p className="mb-6 flex-1 text-sm leading-6 text-[#6B7280]">{article.description}</p>
              <Link href={`/blog/${article.slug}`} className="font-semibold text-[#1A6B9A] hover:underline">
                Read guide →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
