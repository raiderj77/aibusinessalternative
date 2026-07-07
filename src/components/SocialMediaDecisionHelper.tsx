'use client';

import { useState } from 'react';

type Involvement = 'diy' | 'handoff' | null;
type Scope = 'scheduling-only' | 'strategy-creative' | null;
type Budget = 'under-100' | 'over-500' | null;

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

export default function SocialMediaDecisionHelper() {
  const [involvement, setInvolvement] = useState<Involvement>(null);
  const [scope, setScope] = useState<Scope>(null);
  const [budget, setBudget] = useState<Budget>(null);

  const answered = involvement !== null && scope !== null && budget !== null;

  let score = 0;
  if (involvement === 'diy') score += 2;
  if (involvement === 'handoff') score -= 2;
  if (scope === 'scheduling-only') score += 1;
  if (scope === 'strategy-creative') score -= 1;
  if (budget === 'under-100') score += 1;
  if (budget === 'over-500') score -= 1;

  const recommendation = score > 0 ? 'buffer' : score < 0 ? 'fiverr' : 'either';

  return (
    <section className="card p-6 sm:p-8 mb-10" aria-label="Which one is right for you">
      <h2 className="text-[16px] font-semibold mb-1">Which one is right for you?</h2>
      <p className="text-[13px] text-gray-500 mb-6">Answer 3 quick questions, no email required, nothing saved.</p>

      <div className="space-y-5">
        <div>
          <p className="text-[13px] font-medium text-gray-700 mb-2">1. Do you want software you run yourself, or a person who runs your accounts for you?</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <OptionButton selected={involvement === 'diy'} onClick={() => setInvolvement('diy')}>
              Software I run myself, with AI help
            </OptionButton>
            <OptionButton selected={involvement === 'handoff'} onClick={() => setInvolvement('handoff')}>
              A real person I can hand my accounts to
            </OptionButton>
          </div>
        </div>

        <div>
          <p className="text-[13px] font-medium text-gray-700 mb-2">2. Is the job mostly consistent posting, or do you also need strategy, design, and community management?</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <OptionButton selected={scope === 'scheduling-only'} onClick={() => setScope('scheduling-only')}>
              Mostly scheduling and consistent posting
            </OptionButton>
            <OptionButton selected={scope === 'strategy-creative'} onClick={() => setScope('strategy-creative')}>
              Strategy, creative work, and engagement too
            </OptionButton>
          </div>
        </div>

        <div>
          <p className="text-[13px] font-medium text-gray-700 mb-2">3. What&apos;s your monthly budget for this?</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <OptionButton selected={budget === 'under-100'} onClick={() => setBudget('under-100')}>
              Under $100/mo
            </OptionButton>
            <OptionButton selected={budget === 'over-500'} onClick={() => setBudget('over-500')}>
              $500+/mo is fine for real help
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
            {recommendation === 'buffer' && (
              <p className="m-0 text-[14px] text-gray-800">
                Based on your answers, <strong>Buffer</strong> looks like the better fit. You mostly need
                consistent posting at a low cost, and you&apos;re fine reviewing AI-drafted content yourself.
              </p>
            )}
            {recommendation === 'fiverr' && (
              <p className="m-0 text-[14px] text-gray-800">
                Based on your answers, <strong>a Fiverr freelancer</strong> looks like the better fit.
                You want strategy, creative work, and engagement handled by a real person.
              </p>
            )}
            {recommendation === 'either' && (
              <p className="m-0 text-[14px] text-gray-800">
                Your answers are split down the middle, either could work well, and many businesses use
                both. Read the full comparison below to decide based on price and scope of work.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
