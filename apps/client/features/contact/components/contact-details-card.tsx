const details = [
  {
    title: "Address",
    body: [
      "Kazanchis Business District,",
      "Near UNECA Area, Addis Ababa, Ethiopia",
    ],
    icon: "pin",
  },
  {
    title: "Mobile",
    body: ["+251 900 000000", "+251 900 000000"],
    icon: "phone",
  },
  {
    title: "Availability",
    body: ["Monday - Friday", "8:00 am - 5:00 PM"],
    icon: "clock",
  },
  {
    title: "Email",
    body: ["workbridge@mail.com"],
    icon: "mail",
  },
];

const socials = [
  { label: "YouTube", className: "bg-red-600", text: "▶" },
  { label: "Telegram", className: "bg-sky-500", text: "✈" },
  { label: "LinkedIn", className: "bg-sky-700", text: "in" },
  { label: "TikTok", className: "bg-black", text: "♪" },
];

function DetailIcon({ type }: { type: string }) {
  const path =
    type === "phone"
      ? "M7 5h3l1.5 4-2 1.2c.9 1.9 2.4 3.4 4.3 4.3l1.2-2 4 1.5v3c0 1.1-.9 2-2 2C10.4 19 5 13.6 5 7c0-1.1.9-2 2-2Z"
      : type === "clock"
        ? "M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        : type === "mail"
          ? "M4 6h16v12H4V6Zm1.5 1.5 6.5 5 6.5-5"
          : "M12 21s7-5.4 7-12A7 7 0 1 0 5 9c0 6.6 7 12 7 12Z";

  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
      >
        <path
          d={path}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        {type === "pin" ? (
          <circle
            cx="12"
            cy="9"
            r="2.5"
            stroke="currentColor"
            strokeWidth="2"
          />
        ) : null}
      </svg>
    </span>
  );
}

export function ContactDetailsCard() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white px-6 py-7 shadow-sm">
      <div className="text-center">
        <h2 className="text-lg font-black text-slate-950">Contact Details</h2>
        <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-700">
          Reach out to our team for job support, hiring assistance, or
          payment-related inquiries.
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {details.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <DetailIcon type={item.icon} />
            <div>
              <h3 className="text-sm font-black text-slate-950">
                {item.title}
              </h3>
              {item.body.map((line) => (
                <p key={line} className="text-xs leading-5 text-slate-800">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
        <p className="text-base font-black text-slate-950">Connect with us</p>
        <div className="flex items-center gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href="#social"
              aria-label={social.label}
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-black text-white ${social.className}`}
            >
              {social.text}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
