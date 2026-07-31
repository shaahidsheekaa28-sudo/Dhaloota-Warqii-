import React from 'react';
import { FileText, Sparkles, X, ArrowRight, Download, CheckCircle2 } from 'lucide-react';

interface ExportSuggestionToastProps {
  changeCount: number;
  isOpen: boolean;
  onOpenDocsExport: () => void;
  onDownloadDocx: () => void;
  onDismiss: () => void;
}

export const ExportSuggestionToast: React.FC<ExportSuggestionToastProps> = ({
  changeCount,
  isOpen,
  onOpenDocsExport,
  onDownloadDocx,
  onDismiss,
}) => {
  if (!isOpen || changeCount < 3) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-bounce-subtle">
      <div className="bg-[#1B365D] text-white p-5 rounded-2xl shadow-2xl border-2 border-emerald-400/40 relative overflow-hidden backdrop-blur-md">
        
        {/* Background Decorative Accent */}
        <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -left-8 -top-8 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

        {/* Dismiss Close Button */}
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-all cursor-pointer"
          title="Dhiisi (Dismiss)"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5">
          {/* Icon Badge */}
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#4285F4] to-blue-600 text-white flex items-center justify-center shrink-0 shadow-md border border-blue-400/30">
            <FileText className="w-6 h-6 text-white" />
          </div>

          <div className="space-y-2.5 flex-1 pr-6">
            {/* Counter Header */}
            <div className="flex items-center gap-2">
              <span className="bg-emerald-400 text-slate-900 text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-slate-900" />
                <span>{changeCount} Jijjiirama Galmaa'ee</span>
              </span>
              <span className="text-[11px] text-slate-300 font-bold">Updated Schedule</span>
            </div>

            {/* Notification Title & Body */}
            <div>
              <h4 className="text-sm font-extrabold text-white leading-snug">
                Karoora keessatti jijjiirama {changeCount} galmeessiteeta!
              </h4>
              <p className="text-xs text-slate-300 font-medium leading-relaxed mt-0.5">
                Karoora barattootaa fooyya'ee kana gara <strong className="text-blue-300">Google Docs</strong>'tti ol-kaawwachuuf ykn erguuf barbaaddaa?
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  onOpenDocsExport();
                  onDismiss();
                }}
                className="px-4 py-2 bg-[#4285F4] hover:bg-blue-600 text-white text-xs font-extrabold rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-[1.02]"
              >
                <span>Google Docs'tti Ergi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  onDownloadDocx();
                  onDismiss();
                }}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer border border-white/10"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>.docx</span>
              </button>

              <button
                onClick={onDismiss}
                className="text-xs text-slate-400 hover:text-slate-200 font-medium underline px-1 py-1 cursor-pointer ml-auto"
              >
                Booda
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
