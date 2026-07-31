import React from 'react';
import { ADVICE_AND_NASIHA, MOTIVATIONAL_MESSAGES } from '../data/hifzData';
import { BookOpen, Heart, Sparkles, Shield, Flame, Compass, MessageSquareQuote, Rocket, Target, Star, CheckCircle2 } from 'lucide-react';

export const AdviceCard: React.FC = () => {
  const getSectionIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Heart className="w-4 h-4 text-[#00A896]" />;
      case 1:
        return <Compass className="w-4 h-4 text-[#00A896]" />;
      case 2:
        return <BookOpen className="w-4 h-4 text-[#00A896]" />;
      case 3:
        return <Shield className="w-4 h-4 text-[#00A896]" />;
      case 4:
        return <Flame className="w-4 h-4 text-[#00A896]" />;
      case 5:
        return <Sparkles className="w-4 h-4 text-[#00A896]" />;
      default:
        return <BookOpen className="w-4 h-4 text-[#00A896]" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs mb-8 overflow-hidden">
      {/* Header Banner */}
      <div className="bg-[#1B365D] text-white p-6 border-b-4 border-[#00A896] text-center">
        {ADVICE_AND_NASIHA.headerSubtitle && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{ADVICE_AND_NASIHA.headerSubtitle}</span>
          </div>
        )}
        <h1 className="text-xl md:text-2xl font-black tracking-wide text-white">
          {ADVICE_AND_NASIHA.headerTitle}
        </h1>
      </div>

      <div className="p-5 md:p-6 space-y-6">
        {/* Quote Box */}
        <div className="bg-[#E8F5E9] border-l-4 border-[#00A896] p-4 md:p-5 rounded-r-lg text-slate-800 text-sm md:text-base italic leading-relaxed flex items-start gap-3">
          <MessageSquareQuote className="w-6 h-6 text-[#00A896] shrink-0 mt-0.5" />
          <p className="font-serif">{ADVICE_AND_NASIHA.quote}</p>
        </div>

        {/* 6 Core Nasiha Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ADVICE_AND_NASIHA.sections.map((sec, idx) => (
            <div
              key={sec.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-4 shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100">
                  <div className="p-1.5 bg-slate-50 rounded-md border border-slate-200">
                    {getSectionIcon(idx)}
                  </div>
                  <h2 className="text-sm font-bold text-[#1B365D]">
                    {sec.number}. {sec.title.replace(/^📌\s*\d+\.\s*/, '')}
                  </h2>
                </div>
                <h3 className="text-xs font-bold text-[#00A896] mb-1.5">
                  {sec.cardTitle}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {sec.cardBody}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Du'aa'ii Box */}
        <div className="bg-[#1B365D] text-white p-5 rounded-xl border border-white/10 text-center space-y-2">
          <h3 className="text-sm font-extrabold text-[#00A896] tracking-wide uppercase flex items-center justify-center gap-2">
            <span>🤲</span>
            <span>{ADVICE_AND_NASIHA.duaa.title}</span>
          </h3>
          <p className="text-xs md:text-sm text-slate-100 font-serif leading-relaxed italic max-w-3xl mx-auto">
            {ADVICE_AND_NASIHA.duaa.body}
          </p>
        </div>

        {/* --- MOTIVATIONAL MESSAGES (Dhaamsa Kaka'umsaa) --- */}
        <div className="pt-6 border-t border-slate-200 space-y-6">
          <div className="flex items-center gap-2 text-[#1B365D]">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-base font-black uppercase tracking-wide">DHAAMSA KAKA'UMSAA & KUTANNOO (MOTIVATION)</h2>
          </div>

          {/* Block 1: Yaa Barataa Qur'aana, Garaa Jabaadhu! */}
          <div className="bg-gradient-to-br from-slate-900 to-[#1B365D] text-white rounded-xl p-5 md:p-6 shadow-md border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm md:text-base mb-3 pb-2 border-b border-white/10">
              <Sparkles className="w-5 h-5" />
              <span>🌟 {MOTIVATIONAL_MESSAGES.quranStudent.title}</span>
            </div>

            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-lg border-l-4 border-amber-400 text-amber-100 text-xs md:text-sm italic mb-4">
              "{MOTIVATIONAL_MESSAGES.quranStudent.quote}"
            </div>

            <p className="text-xs md:text-sm text-slate-200 leading-relaxed mb-4">
              {MOTIVATIONAL_MESSAGES.quranStudent.intro}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {MOTIVATIONAL_MESSAGES.quranStudent.points.map((p, i) => (
                <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 font-bold text-xs text-emerald-300 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>💡 {p.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-normal">{p.body}</p>
                </div>
              ))}
            </div>

            <div className="bg-emerald-950/60 p-3.5 rounded-lg border border-emerald-500/30 text-emerald-200 text-xs font-medium flex items-start gap-2.5">
              <Rocket className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{MOTIVATIONAL_MESSAGES.quranStudent.closing}</span>
            </div>
          </div>

          {/* Block 2: Kaayyo Kee Bira Gahuuf Ka'i! */}
          <div className="bg-gradient-to-br from-teal-950 to-[#00A896] text-white rounded-xl p-5 md:p-6 shadow-md border border-teal-800">
            <div className="flex items-center gap-2 text-emerald-200 font-extrabold text-sm md:text-base mb-3 pb-2 border-b border-white/10">
              <Target className="w-5 h-5 text-emerald-300" />
              <span>{MOTIVATIONAL_MESSAGES.goalReaching.title}</span>
            </div>

            <div className="bg-black/20 backdrop-blur-xs p-3.5 rounded-lg border-l-4 border-emerald-300 text-emerald-100 text-xs md:text-sm italic mb-4">
              "{MOTIVATIONAL_MESSAGES.goalReaching.quote}"
            </div>

            <p className="text-xs md:text-sm text-emerald-50 leading-relaxed mb-4">
              {MOTIVATIONAL_MESSAGES.goalReaching.intro}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {MOTIVATIONAL_MESSAGES.goalReaching.points.map((p, i) => (
                <div key={i} className="bg-black/20 p-3 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 font-bold text-xs text-emerald-200 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>💡 {p.title}</span>
                  </div>
                  <p className="text-xs text-teal-50 leading-normal">{p.body}</p>
                </div>
              ))}
            </div>

            <div className="bg-teal-950/80 p-3.5 rounded-lg border border-teal-400/30 text-teal-100 text-xs font-medium flex items-start gap-2.5">
              <Rocket className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              <span>{MOTIVATIONAL_MESSAGES.goalReaching.closing}</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-2 text-xs font-semibold text-slate-500 italic flex items-center justify-center gap-2">
          <span>{ADVICE_AND_NASIHA.footerNote}</span>
        </div>
      </div>
    </div>
  );
};

