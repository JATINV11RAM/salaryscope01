import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SalaryScope",
  description: "Privacy policy for SalaryScope India. Learn how we protect your data.",
  alternates: { canonical: "https://salaryscope.in/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="py-12 px-4" style={{ backgroundColor: "#F5F7FA" }}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-sm" style={{ border: "1px solid #E5E7EB" }}>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#1A1A2E" }}>Privacy Policy</h1>
          <p className="text-sm mb-6" style={{ color: "#6B7280" }}>Last updated: August 2026</p>
          
          <div className="prose text-sm" style={{ color: "#1A1A2E", lineHeight: 1.8 }}>
            <p className="mb-4">
              At SalaryScope, we believe that your salary information is your personal business. 
              We have built our website from the ground up to respect your privacy and protect your data. 
              This policy explains exactly how we handle your information when you use our calculators.
            </p>

            <h2 className="text-lg font-semibold mt-6 mb-2" style={{ color: "#1A6B9A" }}>No Personal Data Collected</h2>
            <p className="mb-4">
              We do not collect any personal data from you. There is no account or sign-up required to use 
              any of our tools. We will never ask for your name, phone number, employer details, or email address 
              just to calculate your salary.
            </p>

            <h2 className="text-lg font-semibold mt-6 mb-2" style={{ color: "#1A6B9A" }}>Calculations Stay in Your Browser</h2>
            <p className="mb-4">
              When you enter your CTC, basic salary, tax deductions, or any other financial information into our 
              calculators, that data never leaves your device. All calculations are performed entirely within 
              your web browser. We do not store your inputs, and we do not transmit them to our servers or any 
              third-party databases. Once you close the tab, your numbers are gone.
            </p>

            <h2 className="text-lg font-semibold mt-6 mb-2" style={{ color: "#1A6B9A" }}>Anonymous Traffic Data</h2>
            <p className="mb-4">
              To understand how people use our website and how we can improve it, we use Google Analytics. 
              This tool collects anonymous, aggregated traffic data. This includes information such as which 
              pages are visited most often, general geographic locations (like city or country), and the types 
              of devices used to access the site (mobile or desktop). None of this data contains personal 
              identifiers that could trace back to you.
            </p>

            <h2 className="text-lg font-semibold mt-6 mb-2" style={{ color: "#1A6B9A" }}>Advertising</h2>
            <p className="mb-4">
              To keep SalaryScope free for everyone, we use Google AdSense to display advertisements. Google 
              AdSense uses cookies to serve ads based on your prior visits to our website or other websites 
              on the internet. These advertising cookies enable Google and its partners to serve personalised 
              ads to you.
            </p>

            <h2 className="text-lg font-semibold mt-6 mb-2" style={{ color: "#1A6B9A" }}>Opting Out of Personalised Ads</h2>
            <p className="mb-4">
              You can easily opt out of personalised advertising at any time. To do so, visit your 
              <strong> Google Ad Settings</strong>. Alternatively, you can opt out of a third-party vendor&apos;s 
              use of cookies for personalised advertising by visiting <strong>www.aboutads.info</strong>.
            </p>

            <h2 className="text-lg font-semibold mt-6 mb-2" style={{ color: "#1A6B9A" }}>Disabling Cookies</h2>
            <p className="mb-4">
              If you prefer not to use cookies at all, you can disable them directly through your web browser&apos;s 
              settings. Look for the privacy or security section in your browser preferences to manage cookie 
              permissions. Disabling cookies will not affect your ability to use our calculators.
            </p>

            <h2 className="text-lg font-semibold mt-6 mb-2" style={{ color: "#1A6B9A" }}>Contact Us</h2>
            <p className="mb-4">
              If you have any questions or concerns about this privacy policy or how we handle your privacy, 
              please feel free to reach out to us. You can contact us at <strong>hello@salaryscope.in</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
