import React from 'react';
import { Student, ScheduleWeek } from '../types';
import { CheckCircle2, BookOpen, Award, Layers } from 'lucide-react';

interface StudentProgressCardProps {
  students: Student[];
  weeks: ScheduleWeek[];
  selectedStudent: string;
  onSelectStudent: (name: string) => void;
}

export const StudentProgressCard: React.FC<StudentProgressCardProps> = ({
  students,
  weeks,
  selectedStudent,
  onSelectStudent,
}) => {
  // Calculate total tasks completed across weeks
  let totalTasks = 0;
  let completedTasks = 0;

  weeks.forEach((w) => {
    w.rows.forEach((r) => {
      if (selectedStudent === 'all' || r.studentName.toLowerCase() === selectedStudent.toLowerCase()) {
        totalTasks += r.values.length;
        if (r.statuses) {
          completedTasks += r.statuses.filter((s) => s === 'completed' || s === 'verified').length;
        }
      }
    });
  });

  const overallProgressPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-bold text-[#1B365D] flex items-center gap-2">
            <Award className="w-4 h-4 text-[#00A896]" />
            <span>Sadarkaa Barattootaa (Student Progress Summary)</span>
          </h2>
          <p className="text-xs text-slate-500">
            Hifzii haaraa fi Muraja'aa raawwatame xinxaluu
          </p>
        </div>

        {/* Global Progress Gauge */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
          <div className="text-right">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
              Xumura Waliigalaa
            </span>
            <span className="text-sm font-bold text-[#1B365D]">
              {completedTasks} / {totalTasks} ({overallProgressPct}%)
            </span>
          </div>
          <div className="w-10 h-10 rounded-full border-4 border-slate-200 border-t-[#00A896] flex items-center justify-center font-bold text-xs text-[#00A896]">
            {overallProgressPct}%
          </div>
        </div>
      </div>

      {/* Student Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
        {students.map((st) => {
          const isSelected = selectedStudent.toLowerCase() === st.name.toLowerCase();

          // Calculate student specific stats
          let stTotal = 0;
          let stCompleted = 0;
          weeks.forEach((w) => {
            w.rows.forEach((r) => {
              if (r.studentName.toLowerCase() === st.name.toLowerCase()) {
                stTotal += r.values.length;
                if (r.statuses) {
                  stCompleted += r.statuses.filter((s) => s === 'completed' || s === 'verified').length;
                }
              }
            });
          });
          const stPct = stTotal > 0 ? Math.round((stCompleted / stTotal) * 100) : 0;

          return (
            <button
              key={st.id}
              onClick={() => onSelectStudent(isSelected ? 'all' : st.name)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#00A896] bg-[#00A896]/5 ring-2 ring-[#00A896]/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs text-[#1B365D] truncate">{st.name}</span>
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: st.color || '#1B365D' }}
                />
              </div>

              <div className="text-[11px] text-slate-500 mb-2">
                Hifzii: <span className="font-semibold text-slate-700">{st.startHifzPage} → {st.currentHifzPage}</span>
              </div>

              {/* Mini progress bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-1">
                <div
                  className="bg-[#00A896] h-full transition-all duration-300"
                  style={{ width: `${stPct}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium">
                <span>{stCompleted}/{stTotal} done</span>
                <span className="font-bold text-[#00A896]">{stPct}%</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
