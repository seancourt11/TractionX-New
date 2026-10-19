type Faq = { q: string; a: string };

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-white/10 border border-white/10 rounded-2xl overflow-hidden">
      {faqs.map((f, i) => (
        <details
          key={i}
          className="group open:bg-white/[0.02]"
        >
          <summary className="cursor-pointer list-none px-5 py-4 flex items-start justify-between gap-4 hover:bg-white/[0.02]">
            <span className="font-medium text-white/90">{f.q}</span>
            <span className="text-purple-300 text-xl leading-none mt-1 group-open:rotate-45 transition-transform">
              +
            </span>
          </summary>
          <div className="px-5 pb-5 -mt-1 text-white/70 leading-relaxed">
            {f.a}
          </div>
        </details>
      ))}
    </div>
  );
}
