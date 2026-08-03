const footerColumns = [
  {
    title: "For Job seekers",
    links: ["Browse jobs", "Companies Hiring", "Upload Resume"],
  },
  {
    title: "For Employers",
    links: [
      "Post a Job",
      "Employer Login",
      "Candidate Search",
      "Pricing Plans",
    ],
  },
  {
    title: "Company",
    links: ["About Us", "Contact Us", "Blog"],
  },
  {
    title: "Help &support",
    links: [
      "Help center/ FAQ",
      "Contact Support",
      "Account Issues",
      "Password reset",
      "Billing &payments help",
    ],
  },
];

function getFooterHref(label: string) {
  if (label === "About Us") {
    return "/about-us";
  }

  if (label === "Contact Us") {
    return "/contact-us";
  }

  return "#home";
}

function ContactIcon({ type }: { type: "email" | "location" | "phone" }) {
  if (type === "email") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M4 6h16v12H4V6Zm1.5 1.5 6.5 5 6.5-5"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg
        aria-hidden="true"
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M7 5h3l1.5 4-2 1.2c.9 1.9 2.4 3.4 4.3 4.3l1.2-2 4 1.5v3c0 1.1-.9 2-2 2C10.4 19 5 13.6 5 7c0-1.1.9-2 2-2Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s7-5.4 7-12A7 7 0 1 0 5 9c0 6.6 7 12 7 12Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function LandingFooter() {
  return (
    <footer
      id="help"
      className="border-t-2 border-violet-600 bg-[#1b2855] text-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid gap-10 md:grid-cols-[1.6fr_repeat(4,1fr)]">
          <div>
            <h2 className="text-[28px] font-black leading-none">Workbridge</h2>
            <p className="mt-2 text-sm text-white/85">
              Connects a client with local job seekers.
            </p>

            <div className="mt-5 space-y-2 text-sm text-white/90">
              <p className="flex items-center gap-2">
                <span className="text-emerald-500">
                  <ContactIcon type="email" />
                </span>
                workbridge@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <span className="text-emerald-500">
                  <ContactIcon type="phone" />
                </span>
                +251-909-911-111-11
              </p>
              <p className="flex items-center gap-2">
                <span className="text-emerald-500">
                  <ContactIcon type="location" />
                </span>
                Addis Ababa, Ethiopia
              </p>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-black text-emerald-500">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2 text-xs font-semibold text-white/95">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href={getFooterHref(link)}
                      className="transition hover:text-emerald-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-white/35 pt-5">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p>Terms of Use &privacy policy</p>
            <p className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-500 text-xs font-black text-emerald-500">
                C
              </span>
              2026 Workbridge. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
