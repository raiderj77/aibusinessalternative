'use client';

import { useState } from 'react';

type Involvement = 'diy' | 'handoff' | null;
type Workload = 'routine' | 'judgment' | null;
type Budget = 'under-100' | 'over-400' | null;

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

export default function CustomerSupportDecisionHelper() {
  const [involvement, setInvolvement] = useState<Involvement>(null);
  const [workload, setWorkload] = useState<Workload>(null);
  const [budget, setBudget] = useState<Budget>(null);

  const answered = involvement !== null && workload !== null && budget !== null;

  let score = 0;
  if (involvement === 'diy') score += 2;
  if (involvement === 'handoff') score -= 2;
  if (workload === 'routine') score += 1;
  if (workload === 'judgment') score -= 1;
  if (budget === 'under-100') score += 1;
  if (budget === 'over-400') score -= 1;

  const recommendation = score > 0 ? 'tidio' : score < 0 ? 'timeetc' : 'either';

  return (
    <section className="card p-6 sm:p-8 mb-10" aria-label="Which one is right for you">
      <h2 className="text-[16px] font-semibold mb-1">Which one is right for you?</h2>
      <p className="text-[13px] text-gray-500 mb-6">Answer 3 quick questions, no email required, nothing saved.</p>

      <div className="space-y-5">
        <div>
          <p className="text-[13px] font-medium text-gray-700 mb-2">1. Do you want software that answers customers automatically, or a person you can hand your support inbox to?</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <OptionButton selected={involvement === 'diy'} onClick={() => setInvolvement('diy')}>
              Software that answers automatically, I handle the rest
            </OptionButton>
            <OptionButton selected={involvement === 'handoff'} onClick={() => setInvolvement('handoff')}>
              A real person who handles support for me
            </OptionButton>
          </div>
        </div>

        <div>
          <p className="text-[13px] font-medium text-gray-700 mb-2">2. What does your support workload actually look like?</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <OptionButton selected={workload === 'routine'} onClick={() => setWorkload('routine')}>
              Mostly the same routine questions again and again
            </OptionButton>
            <OptionButton selected={workload === 'judgment'} onClick={() => setWorkload('judgment')}>
              Lots of refunds, judgment calls, and one-off cases
            </OptionButton>
          </div>
        </div>

        <div>
          <p className="text-[13px] font-medium text-gray-700 mb-2">3. What&apos;s your monthly budget for this?</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <OptionButton selected={budget === 'under-100'} onClick={() => setBudget('under-100')}>
              Under $100/mo
            </OptionButton>
            <OptionButton selected={budget === 'over-400'} onClick={() => setBudget('over-400')}>
              $400+/mo is fine for real help
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
            {recommendation === 'tidio' && (
              <p className="m-0 text-[14px] text-gray-800">
                Based on your answers, <strong>Tidio</strong> looks like the better fit. Your workload is
                mostly repeat questions, which is exactly what an AI agent answers well at low cost.
              </p>
            )}
            {recommendation === 'timeetc' && (
              <p className="m-0 text-[14px] text-gray-800">
                Based on your answers, <strong>Time Etc</strong> looks like the better fit. You want a
                real person handling judgment calls and taking the inbox off your plate.
              </p>
            )}
            {recommendation === 'either' && (
              <p className="m-0 text-[14px] text-gray-800">
                Your answers are split down the middle, either could work, and plenty of businesses run
                both. Read the full comparison below to decide based on price and workload.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
