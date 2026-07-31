import React, { useState } from 'react';
import { MonthItem, ScheduleWeek, Student } from '../types';
import { Sparkles, Calendar, Zap, CheckCircle2, RefreshCw, X, Play, BookOpen, Layers, Award } from 'lucide-react';

interface PlanGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onGeneratePlan: (
    newMonths: MonthItem[],
    newWeeks: ScheduleWeek[],
    updatedStudents?: Student[]
  ) => void;
}

export const PlanGeneratorModal: React.FC<PlanGeneratorModalProps> = ({
  isOpen,
  onClose,
  students,
  onGeneratePlan,
}) => {
  if (!isOpen) return null;

  // Form State
  const [generatorMode, setGeneratorMode] = useState<'all_students' | 'single_student'>('all_students');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '1');
  const [customStudentName, setCustomStudentName] = useState<string>('Barataa Haaraa');
  const [startHifzPage, setStartHifzPage] = useState<number>(604);
  const [dailyHifzRate, setDailyHifzRate] = useState<number>(1); // 1 page per day
  const [dailyMurajaaPages, setDailyMurajaaPages] = useState<number>(10); // 10 pages per day (0.5 Juz)
  const [durationMonths, setDurationMonths] = useState<number>(3); // 3 months
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5); // 5 working days/week
  const [direction, setDirection] = useState<'desc' | 'asc'>('desc'); // 604 -> 1 or 1 -> 604

  // Preset month names
  const MONTH_NAMES = [
    { key: 'hagayya', name: 'Hagayya', short: 'Hagayya' },
    { key: 'qaammee_meskerem', name: 'Qaammee & Meskerem', short: 'Qaammee' },
    { key: 'tikimt', name: 'Tikimt', short: 'Tikimt' },
    { key: 'sadaasa', name: 'Sadaasa', short: 'Sadaasa' },
    { key: 'muddee', name: 'Muddee', short: 'Muddee' },
    { key: 'amajjii', name: 'Amajjii', short: 'Amajjii' },
  ];

  // Calculated estimates
  const totalWorkDays = durationMonths * 20; // 20 days per month
  const totalHifzPages = Math.round(totalWorkDays * dailyHifzRate);
  const totalHifzJuz = (totalHifzPages / 20).toFixed(1);
  const targetEndPage = direction === 'desc'
    ? Math.max(1, startHifzPage - totalHifzPages)
    : Math.min(604, startHifzPage + totalHifzPages);

  const handleGenerate = () => {
    // Generate months array
    const generatedMonths: MonthItem[] = [];
    for (let m = 0; m < durationMonths; m++) {
      const preset = MONTH_NAMES[m] || { key: `baatii_${m + 1}`, name: `Baatii ${m + 1}ffaa`, short: `Baatii ${m + 1}` };
      generatedMonths.push({
        key: preset.key as any,
        title: `KAROORA BAATII ${m + 1}FFAA (${preset.name.toUpperCase()})`,
        shortName: preset.short,
        days: 20,
      });
    }

    // Determine target students for generation
    let targetStudents: Student[] = [];
    if (generatorMode === 'all_students') {
      targetStudents = students;
    } else {
      const existing = students.find((s) => s.id === selectedStudentId);
      if (existing) {
        targetStudents = [{ ...existing, startHifzPage: startHifzPage }];
      } else {
        targetStudents = [
          {
            id: String(Date.now()),
            name: customStudentName,
            programType: 'Hifzii',
            dailyRate: `Fuula ${dailyHifzRate}`,
            startHifzPage: startHifzPage,
            currentHifzPage: startHifzPage,
            targetHifzPage: targetEndPage,
            color: '#00A896',
          },
        ];
      }
    }

    // Generate Weeks
    const generatedWeeks: ScheduleWeek[] = [];
    let currentCumulativeDays = 0;

    for (let m = 0; m < durationMonths; m++) {
      const monthObj = generatedMonths[m];
      const weeksInMonth = 4; // 4 weeks per month = 20 days (5 days/week)

      for (let w = 1; w <= weeksInMonth; w++) {
        const weekNum = m * 4 + w;
        const weekCheckpoints = [1, 2, 3, 4, 5].map((d) => (w - 1) * 5 + d);
        const dateRangeStr = `Torban ${w}ffaa (Guyyaa ${weekCheckpoints[0]} - ${weekCheckpoints[4]})`;

        const weekHeaders = [
          'Maqaa Barataa',
          'Gosti Sagantaa',
          ...weekCheckpoints.map((d) => `Guyyaa ${d}`),
        ];

        const rows: ScheduleWeek['rows'] = [];

        targetStudents.forEach((st, sIdx) => {
          const stStartPage = st.startHifzPage || startHifzPage;

          // Row 1: Hifzii / Tilaawaa
          const hifzValues = weekCheckpoints.map((dayNum) => {
            const pagesCalculated = Math.round(dayNum * dailyHifzRate);
            const currentPage = direction === 'desc'
              ? Math.max(1, stStartPage - pagesCalculated)
              : Math.min(604, stStartPage + pagesCalculated);
            return `P ${currentPage}`;
          });

          rows.push({
            id: `gen_hifz_${weekNum}_${sIdx}`,
            studentName: st.name,
            type: 'Hifzii',
            values: hifzValues,
            statuses: Array(5).fill('completed'),
          });

          // Row 2: Muraja'aa
          const murajaaValues = weekCheckpoints.map((dayNum) => {
            const startRevPage = Math.max(1, stStartPage - (dayNum * dailyHifzRate));
            const endRevPage = Math.min(604, startRevPage + dailyMurajaaPages);
            return `P ${startRevPage}-${endRevPage}`;
          });

          rows.push({
            id: `gen_murajaa_${weekNum}_${sIdx}`,
            studentName: st.name,
            type: "Muraja'aa",
            values: murajaaValues,
            statuses: Array(5).fill('completed'),
          });
        });

        generatedWeeks.push({
          id: `gen_week_${weekNum}`,
          title: `TORBAN ${weekNum}FFAA (${dateRangeStr})`,
          monthKey: monthObj.key,
          headers: weekHeaders,
          rows: rows,
        });
      }
    }

    onGeneratePlan(generatedMonths, generatedWeeks, targetStudents);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1B365D] to-[#00A896] text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#1B365D]">
                Jeneratara Karoora Hifzii fi Muraja'aa (Plan Generator)
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Saffisaa fi Akkaataa Qophaa'ina Sagantaa Barattootaa Murteessi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-6">
          
          {/* Step 1: Mode Selection */}
          <div>
            <label className="block text-xs font-bold text-[#1B365D] mb-2 uppercase tracking-wide">
              1. Eenyuuf Karoorfa? (Target Audience)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGeneratorMode('all_students')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  generatorMode === 'all_students'
                    ? 'border-[#00A896] bg-[#00A896]/10 text-[#1B365D] ring-2 ring-[#00A896]/30 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-extrabold">Barattoota Hunda ({students.length})</span>
                  {generatorMode === 'all_students' && <CheckCircle2 className="w-4 h-4 text-[#00A896]" />}
                </div>
                <p className="text-[11px] text-slate-500 font-normal">
                  Barattoota tarree keessa jiran hundaaf sagantaa bal'aa qopheessi.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setGeneratorMode('single_student')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  generatorMode === 'single_student'
                    ? 'border-[#00A896] bg-[#00A896]/10 text-[#1B365D] ring-2 ring-[#00A896]/30 font-bold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-extrabold">Barataa Murtaa'e / Haaraa</span>
                  {generatorMode === 'single_student' && <CheckCircle2 className="w-4 h-4 text-[#00A896]" />}
                </div>
                <p className="text-[11px] text-slate-500 font-normal">
                  Barataa tokko qofaaf karoora qofaatti tilmaamame generaati godhi.
                </p>
              </button>
            </div>
          </div>

          {/* Single Student Selection Options */}
          {generatorMode === 'single_student' && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Select Existing Student
                  </label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => {
                      setSelectedStudentId(e.target.value);
                      const st = students.find((s) => s.id === e.target.value);
                      if (st) setStartHifzPage(st.startHifzPage || 604);
                    }}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-[#00A896]"
                  >
                    {students.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name} (Fuula {st.startHifzPage})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Akaakuu Niyyaa / Fuula Eegalloo
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={604}
                    value={startHifzPage}
                    onChange={(e) => setStartHifzPage(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium focus:ring-2 focus:ring-[#00A896]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Rate & Settings */}
          <div>
            <label className="block text-xs font-bold text-[#1B365D] mb-2 uppercase tracking-wide">
              2. Saffisa Hifzii fi Muraja'aa (Target Speed & Duration)
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Daily Hifz Rate */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <label className="block text-[11px] font-bold text-[#1B365D] mb-1">
                  Gargaarsa Hifzii / Guyyaa
                </label>
                <select
                  value={dailyHifzRate}
                  onChange={(e) => setDailyHifzRate(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
                >
                  <option value={0.5}>Fuula 0.5 (Fuula Walakkaa)</option>
                  <option value={1}>Fuula 1 (Standard)</option>
                  <option value={1.5}>Fuula 1.5</option>
                  <option value={2}>Fuula 2 (Saffisaa)</option>
                  <option value={3}>Fuula 3 (Jabaa)</option>
                </select>
              </div>

              {/* Daily Murajaa */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <label className="block text-[11px] font-bold text-[#1B365D] mb-1">
                  Muraja'aa / Guyyaa
                </label>
                <select
                  value={dailyMurajaaPages}
                  onChange={(e) => setDailyMurajaaPages(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
                >
                  <option value={5}>Fuula 5 (Juzii 0.25)</option>
                  <option value={10}>Fuula 10 (Juzii 0.5 - Recommended)</option>
                  <option value={20}>Fuula 20 (Juzii 1 Guutuu)</option>
                  <option value={40}>Fuula 40 (Juzii 2 Guutuu)</option>
                </select>
              </div>

              {/* Duration */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <label className="block text-[11px] font-bold text-[#1B365D] mb-1">
                  Dheerina Karooraa (Duration)
                </label>
                <select
                  value={durationMonths}
                  onChange={(e) => setDurationMonths(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
                >
                  <option value={1}>Baatii 1 (Guyyaa Hojii 20)</option>
                  <option value={2}>Baatii 2 (Guyyaa Hojii 40)</option>
                  <option value={3}>Baatii 3 (Guyyaa Hojii 60 - Standard)</option>
                  <option value={6}>Baatii 6 (Guyyaa Hojii 120)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Direction */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <label className="block text-[11px] font-bold text-[#1B365D] mb-1">
                Kallattii Hifzii (Direction)
              </label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value as 'desc' | 'asc')}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
              >
                <option value="desc">Gadi Deebi'aa (Fuula 604 ➔ 1) [An-Naas ➔ Al-Baqarah]</option>
                <option value="asc">Oli Deemaa (Fuula 1 ➔ 604) [Al-Baqarah ➔ An-Naas]</option>
              </select>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <label className="block text-[11px] font-bold text-[#1B365D] mb-1">
                Guyyoota Hojii Torbaniitti
              </label>
              <select
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800"
              >
                <option value={5}>Guyyaa 5 (Wiixata-Abl, Dilb • Kam-Jim Boqonnaa)</option>
                <option value={6}>Guyyaa 6 (Boqonnaa Guyyaa 1)</option>
                <option value={7}>Guyyaa 7 (Torban Guutuu)</option>
              </select>
            </div>
          </div>

          {/* Live Calculated Metric Summary Card */}
          <div className="bg-gradient-to-br from-[#1B365D] to-[#0e223f] text-white p-4 rounded-xl shadow-md border-l-4 border-amber-400">
            <div className="flex items-center gap-2 mb-2 text-amber-300 text-xs font-extrabold uppercase tracking-wide">
              <Award className="w-4 h-4" />
              <span>Tilmaama Bu'aa Karoora Generaati Ta'uu (Generated Milestone Summary)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2">
              <div className="bg-white/10 p-2.5 rounded-lg">
                <span className="block text-[10px] text-slate-300 uppercase font-bold">Guyyoota Hojii</span>
                <span className="text-base font-black text-amber-300">{totalWorkDays} Days</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-lg">
                <span className="block text-[10px] text-slate-300 uppercase font-bold">Ida'ama Fuula Hifzii</span>
                <span className="text-base font-black text-emerald-300">{totalHifzPages} Pages</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-lg">
                <span className="block text-[10px] text-slate-300 uppercase font-bold">Tilmaama Juzii</span>
                <span className="text-base font-black text-cyan-300">~{totalHifzJuz} Juz</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-lg">
                <span className="block text-[10px] text-slate-300 uppercase font-bold">Target Fuula Xumuraa</span>
                <span className="text-base font-black text-white">Fuula {targetEndPage}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Dhiisi (Cancel)
          </button>

          <button
            onClick={handleGenerate}
            className="px-6 py-2.5 bg-[#00A896] hover:bg-[#008f80] text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>KAROORA HAARAWA GENERAATI GODHI</span>
          </button>
        </div>

      </div>
    </div>
  );
};
