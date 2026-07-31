import React from 'react';
import { ScheduleWeek } from '../types';
import { APP_DOC_TITLE, AUTHOR_NAME, INTRO_TEXT, RULES_CALLOUT, INITIAL_STUDENTS, ADVICE_AND_NASIHA, MOTIVATIONAL_MESSAGES } from '../data/hifzData';

interface PrintViewProps {
  weeks: ScheduleWeek[];
  selectedStudent: string;
}

export const PrintView: React.FC<PrintViewProps> = ({ weeks, selectedStudent }) => {
  // Group weeks dynamically by monthKey
  const monthKeys = Array.from(new Set(weeks.map((w) => w.monthKey)));

  const filteredStudents = INITIAL_STUDENTS.filter(
    (s) => selectedStudent === 'all' || s.name.toLowerCase() === selectedStudent.toLowerCase()
  );

  return (
    <div
      id="print-document-container"
      className="print-only hidden print:block p-6 text-black bg-white"
      style={{ backgroundColor: '#ffffff', color: '#111827', fontFamily: 'sans-serif' }}
    >
      <div className="mb-4">
        <h1 className="text-xl font-bold mb-0.5" style={{ color: '#1B365D' }}>
          {APP_DOC_TITLE}
        </h1>
        <p className="text-xs font-bold mb-2" style={{ color: '#00A896' }}>
          Qopheessaa: {AUTHOR_NAME}
        </p>
        <p className="text-xs italic mb-3" style={{ color: '#374151' }}>
          {INTRO_TEXT}
        </p>

        {/* Rules */}
        <div
          className="p-3 mb-4 rounded-r-md"
          style={{
            borderLeft: '4px solid #00A896',
            backgroundColor: '#F4F6F8',
          }}
        >
          <h2 className="font-bold text-xs mb-1" style={{ color: '#1B365D' }}>
            {RULES_CALLOUT.title}
          </h2>
          <ul className="text-[10px] space-y-0.5" style={{ color: '#1f2937' }}>
            {RULES_CALLOUT.rules.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3-Month Student Overview Table */}
      <div className="mb-6 break-inside-avoid">
        <h2
          className="text-sm font-bold pb-1 mb-2"
          style={{ color: '#1B365D', borderBottom: '2px solid #00A896' }}
        >
          GABATEE DEEMSAA FI GA'EE BAATII 3 (HAGAYYAA 2 KAASEE)
        </h2>
        <table className="w-full text-[10px] border-collapse" style={{ border: '1px solid #cbd5e1' }}>
          <thead>
            <tr style={{ backgroundColor: '#1B365D', color: '#ffffff', fontWeight: 'bold' }}>
              <th style={{ border: '1px solid #475569', padding: '4px', width: '30px', textAlign: 'center' }}>Lakk</th>
              <th style={{ border: '1px solid #475569', padding: '4px', textAlign: 'left' }}>Maqaa Barataa</th>
              <th style={{ border: '1px solid #475569', padding: '4px', textAlign: 'center' }}>Gosti Sagantaa</th>
              <th style={{ border: '1px solid #475569', padding: '4px', textAlign: 'center' }}>Safara Guyyaatti</th>
              <th style={{ border: '1px solid #475569', padding: '4px', textAlign: 'center' }}>Fuula Eegalloo (Hag 2)</th>
              <th style={{ border: '1px solid #475569', padding: '4px', textAlign: 'center' }}>Fuula Baatii 3 Booda Gahan</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((st, i) => (
              <tr key={st.id} style={{ backgroundColor: i % 2 === 1 ? '#f8fafc' : '#ffffff' }}>
                <td style={{ border: '1px solid #cbd5e1', padding: '4px', textAlign: 'center', fontWeight: 'bold' }}>
                  {i + 1}
                </td>
                <td style={{ border: '1px solid #cbd5e1', padding: '4px', fontWeight: 'bold', color: '#1B365D' }}>
                  {st.name}
                </td>
                <td style={{ border: '1px solid #cbd5e1', padding: '4px', textAlign: 'center', color: '#00A896', fontWeight: 'bold' }}>
                  {st.programType}
                </td>
                <td style={{ border: '1px solid #cbd5e1', padding: '4px', textAlign: 'center' }}>
                  {st.dailyRate}
                </td>
                <td style={{ border: '1px solid #cbd5e1', padding: '4px', textAlign: 'center' }}>
                  Fuula {st.startHifzPage}
                </td>
                <td style={{ border: '1px solid #cbd5e1', padding: '4px', textAlign: 'center', fontWeight: 'bold', color: '#1B365D' }}>
                  Fuula {st.currentHifzPage}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dynamic Month Schedule Sections */}
      {monthKeys.map((mKey, idx) => {
        const monthWeeks = weeks.filter((w) => w.monthKey === mKey);
        const sectionTitle = monthWeeks[0]?.title.split(':')[0] || `JI'A ${idx + 1}FFAA KAROORA BAATII`;
        return (
          <React.Fragment key={mKey}>
            {renderWeekSection(sectionTitle, monthWeeks, selectedStudent)}
          </React.Fragment>
        );
      })}

      {/* Advice & Nasiha Section for Print/PDF */}
      <div className="mt-8 pt-6 border-t-2 border-slate-300 break-inside-avoid">
        <div className="p-4 mb-4 text-center rounded-md text-white" style={{ backgroundColor: '#1B365D', borderBottom: '4px solid #00A896' }}>
          <h2 className="text-base font-bold mb-1">{ADVICE_AND_NASIHA.headerTitle}</h2>
          {ADVICE_AND_NASIHA.headerSubtitle && (
            <p className="text-xs italic" style={{ color: '#E0F2F1' }}>{ADVICE_AND_NASIHA.headerSubtitle}</p>
          )}
        </div>

        <div className="p-3 mb-4 rounded-r-md italic text-xs" style={{ backgroundColor: '#E8F5E9', borderLeft: '4px solid #00A896', color: '#1B365D' }}>
          "{ADVICE_AND_NASIHA.quote}"
        </div>

        <div className="space-y-3">
          {ADVICE_AND_NASIHA.sections.map((sec) => (
            <div key={sec.id} className="p-3 border border-slate-200 rounded-md bg-white break-inside-avoid">
              <h3 className="text-xs font-bold mb-0.5" style={{ color: '#1B365D' }}>{sec.number}. {sec.title.replace(/^📌\s*\d+\.\s*/, '')}</h3>
              <p className="text-[11px] font-bold mb-1" style={{ color: '#00A896' }}>{sec.cardTitle}</p>
              <p className="text-[10px] text-slate-700 leading-snug">{sec.cardBody}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-md text-center text-white break-inside-avoid" style={{ backgroundColor: '#1B365D' }}>
          <h3 className="text-xs font-bold mb-1" style={{ color: '#00A896' }}>{ADVICE_AND_NASIHA.duaa.title}</h3>
          <p className="text-[11px] italic leading-relaxed">{ADVICE_AND_NASIHA.duaa.body}</p>
        </div>

        <div className="mt-3 text-center text-[10px] italic font-semibold text-slate-600 mb-6">
          {ADVICE_AND_NASIHA.footerNote}
        </div>

        {/* Motivational Messages (Print View) */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="p-3 rounded-md text-white break-inside-avoid" style={{ backgroundColor: '#1B365D' }}>
            <h3 className="text-xs font-bold mb-1 text-amber-300">🌟 {MOTIVATIONAL_MESSAGES.quranStudent.title}</h3>
            <p className="text-[10px] italic mb-2" style={{ color: '#FEF3C7' }}>"{MOTIVATIONAL_MESSAGES.quranStudent.quote}"</p>
            <p className="text-[10px] mb-2 leading-relaxed">{MOTIVATIONAL_MESSAGES.quranStudent.intro}</p>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              {MOTIVATIONAL_MESSAGES.quranStudent.points.map((p, i) => (
                <div key={i} className="p-1.5 border border-slate-700 rounded bg-slate-800/50">
                  <span className="font-bold text-amber-300">💡 {p.title}: </span>
                  <span className="text-slate-200">{p.body}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] font-semibold mt-2 text-emerald-300">{MOTIVATIONAL_MESSAGES.quranStudent.closing}</p>
          </div>

          <div className="p-3 rounded-md text-white break-inside-avoid" style={{ backgroundColor: '#00A896' }}>
            <h3 className="text-xs font-bold mb-1 text-white">🎯 {MOTIVATIONAL_MESSAGES.goalReaching.title}</h3>
            <p className="text-[10px] italic mb-2" style={{ color: '#E0F2F1' }}>"{MOTIVATIONAL_MESSAGES.goalReaching.quote}"</p>
            <p className="text-[10px] mb-2 leading-relaxed">{MOTIVATIONAL_MESSAGES.goalReaching.intro}</p>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              {MOTIVATIONAL_MESSAGES.goalReaching.points.map((p, i) => (
                <div key={i} className="p-1.5 border border-teal-700 rounded bg-teal-900/50">
                  <span className="font-bold text-emerald-200">💡 {p.title}: </span>
                  <span className="text-teal-50">{p.body}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] font-semibold mt-2 text-amber-200">{MOTIVATIONAL_MESSAGES.goalReaching.closing}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function renderWeekSection(sectionTitle: string, weeks: ScheduleWeek[], selectedStudent: string) {
  if (weeks.length === 0) return null;

  return (
    <div className="mb-6">
      <h2
        className="text-sm font-bold pb-1 mb-3"
        style={{ color: '#1B365D', borderBottom: '2px solid #00A896' }}
      >
        {sectionTitle}
      </h2>
      {weeks.map((week) => (
        <div key={week.id} className="mb-4 break-inside-avoid">
          <h3 className="text-xs font-bold mb-1.5" style={{ color: '#1B365D' }}>
            {week.title}
          </h3>
          <table
            className="w-full text-[10px] border-collapse"
            style={{ border: '1px solid #cbd5e1' }}
          >
            <thead>
              <tr style={{ backgroundColor: '#1B365D', color: '#ffffff', fontWeight: 'bold' }}>
                {week.headers.map((h, i) => (
                  <th
                    key={i}
                    className="p-1 text-center"
                    style={{ border: '1px solid #475569', padding: '4px' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {week.rows
                .filter(
                  (r) =>
                    selectedStudent === 'all' ||
                    r.studentName.toLowerCase() === selectedStudent.toLowerCase()
                )
                .map((row, rIdx) => {
                  const isAlt = rIdx % 2 === 1;
                  return (
                    <tr
                      key={row.id}
                      style={{ backgroundColor: isAlt ? '#f8fafc' : '#ffffff' }}
                    >
                      <td
                        className="p-1 font-bold"
                        style={{ border: '1px solid #cbd5e1', color: '#1B365D', padding: '4px' }}
                      >
                        {row.studentName}
                      </td>
                      <td
                        className="p-1 font-semibold"
                        style={{ border: '1px solid #cbd5e1', color: '#00A896', padding: '4px' }}
                      >
                        {row.type}
                      </td>
                      {row.values.map((v, cIdx) => (
                        <td
                          key={cIdx}
                          className="p-1 text-center"
                          style={{ border: '1px solid #cbd5e1', color: '#1e293b', padding: '4px' }}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
