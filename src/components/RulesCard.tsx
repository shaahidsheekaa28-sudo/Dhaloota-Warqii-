import React from 'react';
import { Flame, Info } from 'lucide-react';
import { RULES_CALLOUT, INTRO_TEXT } from '../data/hifzData';

export const RulesCard: React.FC = () => {
  return (
    <div className="bg-[#F4F6F8] border-l-4 border-[#00A896] rounded-r-xl p-4 shadow-xs mb-6">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-[#00A896]/10 text-[#00A896] mt-0.5">
          <Flame className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-[#1B365D] flex items-center gap-1.5 mb-1">
            <span>{RULES_CALLOUT.title}</span>
          </h3>
          <p className="text-xs text-slate-600 mb-2 italic">
            {INTRO_TEXT}
          </p>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {RULES_CALLOUT.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A896] mt-1.5 shrink-0" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
