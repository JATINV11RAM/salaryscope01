import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.description, alternates: { canonical: `/blog/${post.slug}` } };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="mt-10 mb-4 text-2xl font-bold text-[#1A1A2E]" {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="mt-8 mb-3 text-xl font-semibold text-[#1A1A2E]" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="mb-5 leading-7 text-[#374151]" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="mb-5 list-disc space-y-2 pl-6 text-[#374151]" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="mb-5 list-decimal space-y-2 pl-6 text-[#374151]" {...props} />,
  table: (props: React.HTMLAttributes<HTMLTableElement>) => <div className="mb-6 overflow-x-auto"><table className="w-full min-w-[520px] border-collapse text-left text-sm" {...props} /></div>,
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => <th className="border border-[#D9E3E8] bg-[#EAF4F9] px-4 py-3 font-semibold text-[#1A1A2E]" {...props} />,
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => <td className="border border-[#E5E7EB] px-4 py-3 text-[#374151]" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="font-semibold text-[#1A6B9A] hover:underline" {...props} />,
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => <blockquote className="mb-6 rounded-lg border-l-4 border-[#F0A500] bg-[#FFF8E8] px-5 py-4 text-[#374151]" {...props} />,
};

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const { content } = await compileMDX({ source: post.content, components: mdxComponents });

  return (
    <article className="bg-[#F5F7FA] px-4 py-12">
      <div className="mx-auto max-w-3xl rounded-xl border border-[#E5E7EB] bg-white px-6 py-8 md:px-12 md:py-12">
        <header className="mb-10 border-b border-[#E5E7EB] pb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-semibold">
            <span className="rounded bg-[#EAF4F9] px-2 py-1 text-[#1A6B9A]">{post.category}</span>
            <span className="text-[#6B7280]">{post.readingTime}</span>
            <time className="text-[#6B7280]" dateTime={post.date}>{post.date}</time>
          </div>
          <h1 className="text-balance text-3xl font-bold leading-tight text-[#1A1A2E] md:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg leading-7 text-[#6B7280]">{post.description}</p>
        </header>
        <div className="text-base">{content}</div>
        <footer className="mt-12 border-t border-[#E5E7EB] pt-6">
          <Link href="/blog" className="font-semibold text-[#1A6B9A] hover:underline">← Back to all guides</Link>
        </footer>
      </div>
    </article>
  );
}
