'use client';

import { useState } from 'react';

type Involvement = 'diy' | 'handoff' | null;
type Time = 'some-time' | 'no-time' | null;
type Budget = 'under-50' | 'over-200' | null;

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex-1 rounded-xl border px-4 py-3 text-left text-[13px] font-medium transition-colors ${
        selected
          ? 'border-[#2563EB] bg-[rgba(37,99,235,0.08)] text-[#2563EB]'
          : 'border-black/10 text-gray-600 hover:border-black/20'
      }`}
    >
      {children}
    </button>
  );
}

export default function DecisionHelper() {
  const [involvement, setInvolvement] = useState<Involvement>(null);
  const [time, setTime] = useState<Time>(null);
  const [budget, setBudget] = useState<Budget>(null);

  const answered = involvement !== null && time !== null && budget !== null;

  let score = 0;
  if (involvement === 'diy') score += 2;
  if (involvement === 'handoff') score -= 2;
  if (time === 'some-time') score += 1;
  if (time === 'no-time') score -= 1;
  if (budget === 'under-50') score += 1;
  if (budget === 'over-200') score -= 1;

  const recommendation = score > 0 ? 'quickbooks' : score < 0 ? '1800accountant' : 'either';

  return (
    <section className="card p-6 sm:p-8 mb-10" aria-label="Which one is right for you">
      <h2 className="text-[16px] font-semibold mb-1">Which one is right for you?</h2>
      <p className="text-[13px] text-gray-500 mb-6">Answer 3 quick questions, no email required, nothing saved.</p>

      <div className="space-y-5">
        <div>
          <p className="text-[13px] font-medium text-gray-700 mb-2">1. Do you want to do your own books, or hand it off?</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <OptionButton selected={involvement === 'diy'} onClick={() => setInvolvement('diy')}>
              I&apos;ll do it myself, with software to help
            </OptionButton>
            <OptionButton selected={involvement === 'handoff'} onClick={() => setInvolvement('handoff')}>
              I want a real person to handle it
            </OptionButton>
          </div>
        </div>

        <div>
          <p className="text-[13px] font-medium text-gray-700 mb-2">2. How much time can you spend on bookkeeping each month?</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <OptionButton selected={time === 'some-time'} onClick={() => setTime('some-time')}>
              A few hours, I don&apos;t mind the work
            </OptionButton>
            <OptionButton selected={time === 'no-time'} onClick={() => setTime('no-time')}>
              None, I&apos;m too busy running my business
            </OptionButton>
          </div>
        </div>

        <div>
          <p className="text-[13px] font-medium text-gray-700 mb-2">3. What&apos;s your monthly budget for this?</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <OptionButton selected={budget === 'under-50'} onClick={() => setBudget('under-50')}>
              Under $50/mo
            </OptionButton>
            <OptionButton selected={budget === 'over-200'} onClick={() => setBudget('over-200')}>
              $200+/mo is fine for less hassle
            </OptionButton>
          </div>
        </div>
      </div>

      <div
        className={`mt-6 grid transition-all duration-300 ease-in-out ${
          answered ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="rounded-xl border border-[rgba(37,99,235,0.2)] bg-[rgba(37,99,235,0.06)] p-5">
            {recommendation === 'quickbooks' && (
              <p className="m-0 text-[14px] text-gray-800">
                Based on your answers, <strong>QuickBooks Online</strong> looks like the better fit. You&apos;re
                comfortable doing the work yourself with AI-assisted software, and want to keep costs low.
              </p>
            )}
            {recommendation === '1800accountant' && (
              <p className="m-0 text-[14px] text-gray-800">
                Based on your answers, <strong>1-800Accountant</strong> looks like the better fit. You&apos;d
                rather hand bookkeeping to a real team and spend your time elsewhere.
              </p>
            )}
            {recommendation === 'either' && (
              <p className="m-0 text-[14px] text-gray-800">
                Your answers are split down the middle, either could work well. Read the full comparison
                below to decide based on price and features.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
