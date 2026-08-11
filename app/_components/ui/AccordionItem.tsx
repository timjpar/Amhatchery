"use client";

import { useState } from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
  /** Zero-padded index printed in mono down the left edge. */
  index?: number;
}

export function AccordionItem({ question, answer, index }: AccordionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b" style={{ borderColor: "var(--c-line)" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-start gap-4 w-full py-5 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-brand)] rounded-btn"
        aria-expanded={open}
      >
        {typeof index === "number" && (
          <span
            className="label-mono pt-1.5 flex-none"
            style={{ color: "var(--c-brand)", opacity: 0.7 }}
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <span
          className="flex-1 font-semibold text-base md:text-lg leading-snug"
          style={{ color: "var(--c-title)", fontFamily: "var(--font-display)" }}
        >
          {question}
        </span>
        <span
          className="flex-none w-6 h-6 mt-0.5 flex items-center justify-center transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "none", color: "var(--c-brand)" }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      {open && (
        <div
          className="pb-6 text-base leading-relaxed"
          style={{ color: "var(--c-ink)", paddingLeft: typeof index === "number" ? "2.25rem" : 0 }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}
