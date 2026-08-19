import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CTC to In-Hand Salary Calculator India FY 2025–26",
  description: "Turn your offer CTC into an estimated monthly in-hand salary after PF, gratuity, professional tax and income tax.",
  alternates: { canonical: "https://salaryscope.in" },
};

const faqs = [
  ["What is the difference between CTC and in-hand salary?", "CTC is the employer's total annual cost. In-hand salary is what reaches your bank after employer components, PF, professional tax and income tax are accounted for."],
  ["How accurate is the calculator?", "SalaryScope is a transparent planning estimate. Your payslip can differ based on company policy, state rules, exemptions and payroll timing."],
  ["Do you store my salary details?", "No. The calculator runs in your browser and does not require a sign-up or salary data submission."],
];

const guides = [
  ["Bangalore software engineer salary", "/salary/software-engineer-salary-bangalore"],
  ["Hyderabad software engineer salary", "/salary/software-engineer-salary-hyderabad"],
  ["Data analyst salary in India", "/salary/data-analyst-salary-india"],
  ["TCS fresher salary", "/salary/tcs-fresher-salary"],
  ["Product vs service company salary", "/salary/product-vs-service-company-salary"],
  ["CTC vs in-hand salary", "/salary/ctc-vs-in-hand-salary"],
];

export default function HomePage() {
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    <section className="bg-background py-16 md:py-24">
      <div className="container-site grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[.2em] text-primary">SalaryScope / FY 2025–26</p>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl">Convert your CTC into real monthly in-hand salary.</h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-muted">See what your offer letter means after PF, gratuity, professional tax and income tax. Built for Indian professionals who want a number they can actually plan around.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/in-hand-salary-calculator" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-6 font-semibold text-white transition hover:opacity-90">Calculate my in-hand salary</Link>
            <Link href="#tools" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-background px-6 font-semibold text-foreground transition hover:bg-light-bg">Explore salary tools</Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"><span>Updated for FY 2025–26</span><span>Runs in your browser</span><span>No sign-up</span></div>
        </div>
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-semibold text-muted">Example offer</p><p className="mt-1 text-2xl font-bold">₹12,00,000 CTC</p></div><span className="rounded-full bg-light-bg px-3 py-1 text-xs font-semibold text-primary">Illustrative</span></div>
          <div className="mt-8 border-t border-border pt-6"><p className="text-sm text-muted">Estimated monthly in-hand</p><p className="mt-1 text-4xl font-bold text-primary">₹82,450</p><p className="mt-2 text-sm text-muted">After PF, tax, gratuity and professional tax</p></div>
          <Link href="/in-hand-salary-calculator" className="mt-7 block rounded-lg bg-accent px-4 py-3 text-center font-semibold text-foreground hover:brightness-95">Run your own numbers →</Link>
        </div>
      </div>
    </section>
    <section id="tools" className="border-y border-border bg-light-bg py-16"><div className="container-site"><div className="max-w-2xl"><p className="font-mono text-xs font-semibold uppercase tracking-[.18em] text-primary">The toolkit</p><h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Make salary decisions with the full picture.</h2></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["In-hand salary", "/in-hand-salary-calculator", "Break CTC down to monthly take-home."], ["Compare offers", "/compare-offers", "Choose the offer with better cash flow."], ["Tax regimes", "/compare-tax-regimes", "Compare old and new regime outcomes."], ["Salary breakup", "/salary-breakup", "Understand each component in your CTC."]].map(([title, href, text]) => <Link key={href} href={href} className="group rounded-xl border border-border bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"><p className="font-semibold group-hover:text-primary">{title}</p><p className="mt-2 text-sm leading-6 text-muted">{text}</p><span className="mt-6 block text-sm font-semibold text-primary">Open tool →</span></Link>)}</div></div></section>
    <section className="bg-background py-16"><div className="container-site grid gap-12 lg:grid-cols-2 lg:items-start"><div><p className="font-mono text-xs font-semibold uppercase tracking-[.18em] text-primary">Why CTC misleads</p><h2 className="mt-3 text-3xl font-bold tracking-tight">The number on your offer letter is not the number in your bank account.</h2><p className="mt-5 leading-7 text-muted">Employer PF, gratuity provisions and variable pay can sit inside CTC without becoming monthly cash. Our breakdown makes those assumptions visible, so you can compare jobs, negotiate offers and budget with confidence.</p></div><div className="grid gap-3 sm:grid-cols-3">{[["CTC", "Employer cost"], ["Gross", "Payroll earnings"], ["In-hand", "Spendable cash"]].map(([a,b]) => <div key={a} className="rounded-xl border border-border bg-white p-5"><p className="text-xl font-bold text-primary">{a}</p><p className="mt-2 text-sm text-muted">{b}</p></div>)}</div></div></section>
    <section className="bg-light-bg py-16"><div className="container-site"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="font-mono text-xs font-semibold uppercase tracking-[.18em] text-primary">Salary guides</p><h2 className="mt-3 text-3xl font-bold">Search-friendly context for your next move.</h2></div><Link href="/blog" className="font-semibold text-primary">View all guides →</Link></div><div className="mt-8 grid gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-3">{guides.map(([label, href]) => <Link key={href} href={href} className="border-b border-border py-3 font-medium hover:text-primary">{label}<span className="float-right text-muted">↗</span></Link>)}</div></div></section>
    <section className="bg-background py-16"><div className="container-site max-w-3xl"><p className="text-center font-mono text-xs font-semibold uppercase tracking-[.18em] text-primary">Common questions</p><h2 className="mt-3 text-center text-3xl font-bold">Salary questions, answered plainly.</h2><div className="mt-8 divide-y divide-border">{faqs.map(([q,a]) => <details key={q} className="py-5"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-3 leading-7 text-muted">{a}</p></details>)}</div></div></section>
  </>;
}
