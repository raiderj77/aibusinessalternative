'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

function FAQAccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-200">
      <h3>
        <button
          type="button"
          className="flex w-full items-center justify-between py-4 text-left text-base font-medium text-gray-900 hover:text-indigo-600"
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <span>{item.question}</span>
          <span
            className={`ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform ${
              isOpen ? 'rotate-45 bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500'
            }`}
            aria-hidden="true"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </span>
        </button>
      </h3>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
        role="region"
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-sm leading-relaxed text-gray-600">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="divide-y-0" role="region" aria-label="Frequently asked questions">
      {items.map((item, index) => (
        <FAQAccordionItem
          key={index}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
