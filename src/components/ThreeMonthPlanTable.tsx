import React, { useState } from 'react';
import { Student } from '../types';
import { BookOpen, Search, Layers, Calendar, CheckCircle2, Award } from 'lucide-react';

interface ThreeMonthPlanTableProps {
  students: Student[];
  selectedStudent: string;
  onSelectStudent: (name: string) => void;
}

export const ThreeMonthPlanTable: React.FC<ThreeMonthPlanTableProps> = ({
  students,
  selectedStudent,
  onSelectStudent,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'Tilaawaa' | 'Hifzii'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter((st) => {
    const matchesFilter = filterType === 'all' || st.programType === filterType;
    const matchesSearch = st.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const countTilaawaa = students.filter((s) => s.programType === 'Tilaawaa').length;
  const countHifzii = students.filter((s) => s.programType === 'Hifzii').length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs mb-8 overflow-hidden">
      {/* Header Banner */}
      <div className="bg-[#1B365D] text-white p-4 border-b-2 border-[#00A896]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#00A896] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
                Akka Lakkoofsa Ethiopiatti
              </span>
              <span className="text-slate-300 text-xs">• Hagayya 2 irraa kaasee</span>
            </div>
            <h2 className="text-base font-bold tracking-wide text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-[#00A896]" />
              GABATEE DEEMSAA FI GA'EE BAATII 3 (HAGAYYAA 2 KAASEE)
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Waliigala Guyyoota Hojii: <strong>60 Days</strong> (Baatiitti guyyoota hojii 20, torbanitti guyyaa 5; Kamisa fi Jimaata boqonnaa)
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 text-center">
              <div className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Barattoota</div>
              <div className="text-sm font-bold text-white">{students.length}</div>
            </div>
            <div className="bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30 text-center">
              <div className="text-[10px] text-emerald-300 uppercase tracking-wider font-semibold">Tilaawaa</div>
              <div className="text-sm font-bold text-emerald-300">{countTilaawaa}</div>
            </div>
            <div className="bg-sky-950/40 px-3 py-1.5 rounded-lg border border-sky-500/30 text-center">
              <div className="text-[10px] text-sky-300 uppercase tracking-wider font-semibold">Hifzii</div>
              <div className="text-sm font-bold text-sky-300">{countHifzii}</div>
            </div>
          </div>
        </div>

        {/* 3 Months breakdown pill */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-xs text-slate-200">
          <div className="bg-white/5 p-2 rounded-md flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#00A896]" />
            <span><strong>Ji'a 1ffaa (Hagayya):</strong> Hagayya 2 – Dhuma Hagayyaa (20 Days)</span>
          </div>
          <div className="bg-white/5 p-2 rounded-md flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#00A896]" />
            <span><strong>Ji'a 2ffaa (Qaammee & Meskerem):</strong> Pagumen & Meskerem (20 Days)</span>
          </div>
          <div className="bg-white/5 p-2 rounded-md flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#00A896]" />
            <span><strong>Ji'a 3ffaa (Tikimt):</strong> Tikimt Guutuu (20 Days)</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#1B365D] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Hunda ({students.length})
          </button>
          <button
            onClick={() => setFilterType('Tilaawaa')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterType === 'Tilaawaa'
                ? 'bg-[#00A896] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Tilaawaa ({countTilaawaa})
          </button>
          <button
            onClick={() => setFilterType('Hifzii')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterType === 'Hifzii'
                ? 'bg-sky-700 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Hifzii ({countHifzii})
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Maqaa Barataa barbaadi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg w-full sm:w-56 focus:outline-none focus:border-[#00A896]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-[#1B365D] text-[11px] uppercase tracking-wider font-bold border-b border-slate-200">
              <th className="py-2.5 px-3 w-12 text-center border-r border-slate-200">Lakk</th>
              <th className="py-2.5 px-3 border-r border-slate-200">Maqaa Barataa</th>
              <th className="py-2.5 px-3 border-r border-slate-200 text-center">Gosti Sagantaa</th>
              <th className="py-2.5 px-3 border-r border-slate-200 text-center">Safara Guyyaatti</th>
              <th className="py-2.5 px-3 border-r border-slate-200 text-center">Fuula Eegalloo (Hag 2)</th>
              <th className="py-2.5 px-3 border-r border-slate-200 text-center">Fuula Baatii 3 Booda Gahan</th>
              <th className="py-2.5 px-3 text-center">Fuula Deeman (60 Days)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {filteredStudents.map((st, idx) => {
              const isSelected = selectedStudent.toLowerCase() === st.name.toLowerCase();
              const pagesCovered = Math.abs(st.startHifzPage - st.currentHifzPage);

              return (
                <tr
                  key={st.id}
                  onClick={() => onSelectStudent(isSelected ? 'all' : st.name)}
                  className={`transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/80 font-semibold'
                      : idx % 2 === 1
                      ? 'bg-slate-50/60 hover:bg-slate-100'
                      : 'bg-white hover:bg-slate-100'
                  }`}
                >
                  <td className="py-2.5 px-3 text-center font-bold text-slate-500 border-r border-slate-200">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-[#1B365D] border-r border-slate-200 flex items-center justify-between">
                    <span>{st.name}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#00A896]" />}
                  </td>
                  <td className="py-2.5 px-3 text-center border-r border-slate-200">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        st.programType === 'Tilaawaa'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-sky-100 text-sky-800 border border-sky-300'
                      }`}
                    >
                      {st.programType}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-semibold text-slate-700 border-r border-slate-200">
                    {st.dailyRate}
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-slate-800 border-r border-slate-200">
                    Fuula {st.startHifzPage}
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-[#00A896] border-r border-slate-200">
                    Fuula {st.currentHifzPage}
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-slate-900">
                    <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md border border-slate-200">
                      -{pagesCovered} Fuula
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-50 px-4 py-2 text-[11px] text-slate-500 border-t border-slate-200 flex items-center justify-between">
        <span>* Baatiitti guyyoota hojii 20 x baatii 3 = 60 days of progress towards Page 1.</span>
        <span>Click student row to filter detailed weekly schedule</span>
      </div>
    </div>
  );
};
