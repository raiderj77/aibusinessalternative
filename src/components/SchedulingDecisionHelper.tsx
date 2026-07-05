'use client';

import { useState } from 'react';

type Involvement = 'diy' | 'handoff' | null;
type Scope = 'calendar-only' | 'broader-admin' | null;
type Budget = 'under-50' | 'over-300' | null;

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

export default function SchedulingDecisionHelper() {
  const [involvement, setInvolvement] = useState<Involvement>(null);
  const [scope, setScope] = useState<Scope>(null);
  const [budget, setBudget] = useState<Budget>(null);

  const answered = involvement !== null && scope !== null && budget !== null;

  let score = 0;
  if (involvement === 'diy') score += 2;
  if (involvement === 'handoff') score -= 2;
  if (scope === 'calendar-only') score += 1;
  if (scope === 'broader-admin') score -= 1;
  if (budget === 'under-50') score += 1;
  if (budget === 'over-300') score -= 1;

  const recommendation = score > 0 ? 'reclaim' : score < 0 ? 'timeetc' : 'either';

  return (
    <section className="card p-6 sm:p-8 mb-10" aria-label="Which one is right for you">
      <h2 className="text-[16px] font-semibold mb-1">Which one is right for you?</h2>
      <p className="text-[13px] text-gray-500 mb-6">Answer 3 quick questions, no email required, nothing saved.</p>

      <div className="space-y-5">
        <div>
          <p className="text-[13px] font-medium text-gray-700 mb-2">1. Do you want software that manages your existing calendar, or a person you can hand things off to?</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <OptionButton selected={involvement === 'diy'} onClick={() => setInvolvement('diy')}>
              Software that works inside my own calendar
            </OptionButton>
            <OptionButton selected={involvement === 'handoff'} onClick={() => setInvolvement('handoff')}>
              A real person I can hand things off to
            </OptionButton>
          </div>
        </div>

        <div>
          <p className="text-[13px] font-medium text-gray-700 mb-2">2. Is it just calendar/scheduling, or do you need broader admin help too?</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <OptionButton selected={scope === 'calendar-only'} onClick={() => setScope('calendar-only')}>
              Just my calendar and scheduling
            </OptionButton>
            <OptionButton selected={scope === 'broader-admin'} onClick={() => setScope('broader-admin')}>
              Calendar plus other admin tasks too
            </OptionButton>
          </div>
        </div>

        <div>
          <p className="text-[13px] font-medium text-gray-700 mb-2">3. What&apos;s your monthly budget for this?</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <OptionButton selected={budget === 'under-50'} onClick={() => setBudget('under-50')}>
              Under $50/mo
            </OptionButton>
            <OptionButton selected={budget === 'over-300'} onClick={() => setBudget('over-300')}>
              $300+/mo is fine for real help
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
            {recommendation === 'reclaim' && (
              <p className="m-0 text-[14px] text-gray-800">
                Based on your answers, <strong>Reclaim.ai</strong> looks like the better fit. You want
                software that works inside your own calendar and want to keep costs low.
              </p>
            )}
            {recommendation === 'timeetc' && (
              <p className="m-0 text-[14px] text-gray-800">
                Based on your answers, <strong>Time Etc</strong> looks like the better fit. You&apos;d
                rather hand scheduling, and other admin work, to a real person.
              </p>
            )}
            {recommendation === 'either' && (
              <p className="m-0 text-[14px] text-gray-800">
                Your answers are split down the middle, either could work well. Read the full comparison
                below to decide based on price and scope of work.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
