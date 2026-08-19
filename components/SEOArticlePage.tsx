"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type FAQ = { question: string; answer: string };
type Section = { heading: string; paragraphs: string[]; bullets?: string[] };

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  updated: string;
  sections: Section[];
  faqs: FAQ[];
  calculator: React.ReactNode;
  related: { label: string; href: string }[];
};

export default function SEOArticlePage({ eyebrow, title, description, intro, updated, sections, faqs, calculator, related }: Props) {
  const [openFAQ, setOpenFAQ] = useState(0);
  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    dateModified: updated,
    author: { "@type": "Organization", name: "SalaryScope" },
    publisher: { "@type": "Organization", name: "SalaryScope" },
    mainEntity: { "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  }), [description, faqs, title, updated]);

  return <main className="bg-background">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="container-site py-12 md:py-16">
      <article className="mx-auto max-w-4xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{intro}</p>
        <p className="mt-3 text-sm text-muted">Last reviewed {updated} · Informational content only</p>
        <div className="mt-10 rounded-2xl border border-border bg-card p-4 shadow-sm md:p-6">{calculator}</div>
        <div className="mt-12 flex flex-col gap-10 lg:flex-row">
          <div className="min-w-0 flex-1">
            {sections.map((section) => <section key={section.heading} className="mb-10">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">{section.heading}</h2>
              <div className="mt-4 flex flex-col gap-4 text-base leading-8 text-muted">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              {section.bullets && <ul className="mt-5 flex flex-col gap-3 text-muted">{section.bullets.map((bullet) => <li key={bullet} className="flex gap-3"><span className="mt-2 size-2 shrink-0 rounded-full bg-accent" />{bullet}</li>)}</ul>}
            </section>)}
            <section>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Frequently asked questions</h2>
              <div className="mt-5 divide-y divide-border rounded-xl border border-border bg-card">{faqs.map((faq, index) => <div key={faq.question} className="p-5">
                <button type="button" className="flex w-full items-center justify-between gap-4 text-left font-semibold text-foreground" onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)} aria-expanded={openFAQ === index}>{faq.question}<span aria-hidden="true">{openFAQ === index ? "−" : "+"}</span></button>
                {openFAQ === index && <p className="mt-3 leading-7 text-muted">{faq.answer}</p>}
              </div>)}</div>
            </section>
          </div>
          <aside className="h-fit rounded-2xl border border-border bg-light-bg p-5 lg:w-64">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">Related tools</p>
            <nav className="mt-4 flex flex-col gap-3">{related.map((item) => <Link key={item.href} href={item.href} className="text-sm font-semibold text-foreground hover:text-primary">{item.label} →</Link>)}</nav>
          </aside>
        </div>
      </article>
    </div>
  </main>;
}
