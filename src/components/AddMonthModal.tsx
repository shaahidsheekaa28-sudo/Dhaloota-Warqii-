import React, { useState } from 'react';
import { MonthItem, ScheduleWeek, Student } from '../types';
import { X, Calendar, Plus, Sparkles, CheckCircle2 } from 'lucide-react';

interface AddMonthModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingMonths?: MonthItem[];
  months?: MonthItem[];
  students?: Student[];
  weeks?: ScheduleWeek[];
  onAddMonth: (newMonth: MonthItem, newWeeks: ScheduleWeek[]) => void;
}

const PRESET_FUTURE_MONTHS = [
  { name: 'Sadaasa', number: 4 },
  { name: 'Muddee', number: 5 },
  { name: 'Amajjii', number: 6 },
  { name: 'Guraandhala', number: 7 },
  { name: 'Bitooteessa', number: 8 },
  { name: 'Ebla', number: 9 },
  { name: 'Caamsaa', number: 10 },
  { name: 'Waxabajjii', number: 11 },
  { name: 'Adooleessa', number: 12 },
];

export const AddMonthModal: React.FC<AddMonthModalProps> = ({
  isOpen,
  onClose,
  existingMonths,
  months,
  students = [],
  weeks = [],
  onAddMonth,
}) => {
  if (!isOpen) return null;

  const actualMonths = existingMonths || months || [];
  const nextDefaultNumber = actualMonths.length + 1;
  const defaultPreset = PRESET_FUTURE_MONTHS.find(p => p.number === nextDefaultNumber) || PRESET_FUTURE_MONTHS[0];

  const [selectedPreset, setSelectedPreset] = useState<string>(defaultPreset.name);
  const [customTitle, setCustomTitle] = useState<string>(`Ji'a ${nextDefaultNumber}ffaa (${defaultPreset.name})`);
  const [workDays, setWorkDays] = useState<number>(20);

  const handleSelectPreset = (name: string, num: number) => {
    setSelectedPreset(name);
    setCustomTitle(`Ji'a ${num}ffaa (${name})`);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    const monthKey = `month_${Date.now()}_${selectedPreset.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    const shortName = customTitle.includes(':') 
      ? customTitle.split(':')[0].trim() 
      : customTitle;

    const newMonthItem: MonthItem = {
      key: monthKey,
      title: customTitle,
      shortName: shortName,
      days: workDays,
    };

    // Calculate starting points for each student based on existing last week data or student start page
    const lastWeek = weeks[weeks.length - 1];
    
    // Map of current last page for each student
    const studentLastPageMap: Record<string, number> = {};
    students.forEach(st => {
      // Find student in last week's rows if available
      const row = lastWeek?.rows.find(r => r.studentName === st.name);
      if (row && row.values.length > 0) {
        const lastValStr = row.values[row.values.length - 1];
        const parsed = parseFloat(lastValStr.replace(/[^0-9.]/g, ''));
        if (!isNaN(parsed)) {
          studentLastPageMap[st.name] = parsed;
        } else {
          studentLastPageMap[st.name] = st.currentHifzPage;
        }
      } else {
        studentLastPageMap[st.name] = st.currentHifzPage;
      }
    });

    // Generate 1 Week Schedule table covering the new month (e.g. Days 1 - 20)
    const dayCheckpoints = [1, 5, 10, 15, workDays];
    const headers = ["Maqaa Barataa", "Gosti Sagantaa", ...dayCheckpoints.map(d => `Guyyaa ${d}`)];

    const rows = students.map((st, idx) => {
      const currentStart = studentLastPageMap[st.name] || st.currentHifzPage;
      let rate = 1;
      if (st.dailyRate.includes('2')) rate = 2;
      else if (st.dailyRate.includes('0.5')) rate = 0.5;

      // Hifzii/Tilaawaa moves backward towards page 1
      const dayValues = dayCheckpoints.map((dayNum, dIdx) => {
        const pagesDone = dayNum * rate;
        const targetPg = Math.max(1, Math.round((currentStart - pagesDone) * 10) / 10);
        if (dIdx === dayCheckpoints.length - 1) {
          return `${targetPg} (Gaha)`;
        }
        return `${targetPg}`;
      });

      return {
        id: `${monthKey}_row_${idx + 1}`,
        studentName: st.name,
        type: st.programType === 'Tilaawaa' ? ('Tilaawaa' as const) : ('Hifzii' as const),
        values: dayValues,
      };
    });

    const newWeek: ScheduleWeek = {
      id: `${monthKey}_w1`,
      title: `${customTitle.toUpperCase()}: GUYYAA HOJII 1 – ${workDays}`,
      monthKey: monthKey,
      headers: headers,
      rows: rows,
      note: `🎯 Karoora Baatii Haaraa ${customTitle} - Guyyoota Hojii ${workDays}.`,
    };

    onAddMonth(newMonthItem, [newWeek]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1B365D] to-[#00A896] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-base">Karoora Baatii Haaraa Uumi</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleCreate} className="p-6 space-y-5">
          {/* Quick Select Preset Future Months */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
              1. Baatii Haafan Filadhu (Quick Presets):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {PRESET_FUTURE_MONTHS.map((pm) => {
                const isSelected = selectedPreset === pm.name;
                return (
                  <button
                    key={pm.name}
                    type="button"
                    onClick={() => handleSelectPreset(pm.name, pm.number)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#1B365D] text-white border-[#1B365D] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{pm.number}. {pm.name}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Month Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              2. Maqaa Karoora Baatii (Month Title):
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="e.g. Ji'a 4ffaa (Sadaasa)"
              className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
              required
            />
          </div>

          {/* Work Days Count */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              3. Baatiitti Guyyoota Hojii (Work Days Count):
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={5}
                max={31}
                value={workDays}
                onChange={(e) => setWorkDays(parseInt(e.target.value) || 20)}
                className="w-28 border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A896]"
              />
              <span className="text-xs text-slate-500 font-medium">
                (Standard: Guyyaa Hojii 20 - Torbanitti guyyaa 5)
              </span>
            </div>
          </div>

          {/* Auto Calculation Preview Callout */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Herrega Otomaatiki (Auto-Schedule):</span>
              <p className="text-amber-800 mt-0.5">
                Barattoota 19 hamman gahan irraa ka'ee imala fuula barnoota isaanii fi safara guyyaa (Fuula 1, 2, 0.5) gahaa baatii haaraa ni herrega.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Dhiisi (Cancel)
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#1B365D] to-[#00A896] hover:from-[#142845] hover:to-[#008f80] rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Karoora Baatii Uumi</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
