const faqs = [
  {
    question: "How does WorkBridge help me find jobs?",
    answer:
      "Browse verified job listings, apply easily, and track your applications in one place.",
  },
  {
    question: "How can employers hire through WorkBridge?",
    answer:
      "Post jobs, review applicants, and connect with qualified candidates quickly.",
  },
  {
    question: "Is payment secure on WorkBridge?",
    answer:
      "Yes, we ensure transparent and secure payment handling between clients and workers.",
  },
];

export function ContactFaqSection() {
  return (
    <section className="mt-20 text-center">
      <h2 className="text-3xl font-black tracking-[-0.04em] text-slate-950">
        Frequently Asked Questions
      </h2>
      <p className="mt-4 text-sm text-slate-700">
        Quick answers to help you get started and solve common issues on
        WorkBridge.
      </p>

      <div className="mx-auto mt-7 max-w-[820px] space-y-5 text-left">
        {faqs.map((faq) => (
          <article
            key={faq.question}
            className="rounded-lg bg-slate-200 px-6 py-5"
          >
            <h3 className="text-base font-black text-slate-950">
              {faq.question}
            </h3>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {faq.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
