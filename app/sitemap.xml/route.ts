import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://salaryscope.in";
  
  const pages = [
    "",
    "/in-hand-salary-calculator",
    "/compare-tax-regimes",
    "/salary-breakup",
    "/gratuity-calculator",
    "/notice-period-calculator",
    "/compare-offers",
    "/percentile-estimator",
    "/severance-pay-calculator-india",
    "/how-to-cut-professional-tax-on-salary",
    "/salary/software-engineer-salary-bangalore",
    "/salary/software-engineer-salary-hyderabad",
    "/salary/data-analyst-salary-india",
    "/salary/tcs-fresher-salary",
    "/salary/product-vs-service-company-salary",
    "/salary/ctc-vs-in-hand-salary",
    "/about",
    "/contact",
    "/privacy",
    "/disclaimer",
    "/blog"
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
