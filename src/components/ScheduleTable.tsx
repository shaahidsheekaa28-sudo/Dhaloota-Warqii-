import React, { useState } from 'react';
import { ScheduleWeek, WeekRowData } from '../types';
import { Check, Star, Clock, Edit2, CheckCircle2 } from 'lucide-react';

interface ScheduleTableProps {
  week: ScheduleWeek;
  selectedStudent: string;
  onToggleCellStatus: (weekId: string, rowId: string, colIdx: number) => void;
  onUpdateCellValue?: (weekId: string, rowId: string, colIdx: number, newValue: string) => void;
}

export const ScheduleTable: React.FC<ScheduleTableProps> = ({
  week,
  selectedStudent,
  onToggleCellStatus,
  onUpdateCellValue,
}) => {
  const [editingCell, setEditingCell] = useState<{ rowId: string; colIdx: number; value: string } | null>(null);

  const filteredRows = selectedStudent === 'all'
    ? week.rows
    : week.rows.filter((r) => r.studentName.toLowerCase() === selectedStudent.toLowerCase());

  if (filteredRows.length === 0) {
    return null;
  }

  const handleSaveEdit = () => {
    if (editingCell && onUpdateCellValue) {
      onUpdateCellValue(week.id, editingCell.rowId, editingCell.colIdx, editingCell.value);
    }
    setEditingCell(null);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs mb-8 overflow-hidden">
      {/* Table Section Title */}
      <div className="bg-[#1B365D] text-white px-4 py-3 border-b-2 border-[#00A896] flex items-center justify-between">
        <h3 className="text-sm font-bold tracking-wide uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00A896]" />
          {week.title}
        </h3>
        <span className="text-[11px] font-semibold bg-white/10 px-2.5 py-1 rounded-md text-emerald-300">
          {filteredRows.length / 2} {filteredRows.length / 2 === 1 ? 'Barataa' : 'Barattoota'}
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1B365D] text-white text-[11px] uppercase tracking-wider font-semibold border-b border-slate-700">
              {week.headers.map((h, i) => (
                <th
                  key={i}
                  className={`py-2.5 px-3 border-r border-slate-700/50 last:border-r-0 ${
                    i >= 2 ? 'text-center' : 'text-left'
                  }`}
                  style={{ minWidth: i === 0 ? '120px' : i === 1 ? '110px' : '90px' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {filteredRows.map((row, rowIdx) => {
              // Group rows in pairs per student for alternating shaded background
              const isAltPair = Math.floor(rowIdx / 2) % 2 === 1;
              const rowBgClass = isAltPair ? 'bg-[#F4F6F8]' : 'bg-white';

              return (
                <tr
                  key={row.id}
                  className={`${rowBgClass} hover:bg-slate-100/80 transition-colors group`}
                >
                  {/* Student Name */}
                  <td className="py-2.5 px-3 font-bold text-[#1B365D] border-r border-slate-200/80">
                    {row.studentName}
                  </td>

                  {/* Type (Hifzii Haaraa / Muraja'aa) */}
                  <td className="py-2.5 px-3 font-semibold text-[#00A896] border-r border-slate-200/80 whitespace-nowrap">
                    {row.type}
                  </td>

                  {/* Day Columns */}
                  {row.values.map((val, colIdx) => {
                    const status = row.statuses?.[colIdx] || 'pending';
                    const isEditing = editingCell?.rowId === row.id && editingCell?.colIdx === colIdx;

                    let statusStyle = 'bg-transparent text-slate-800 hover:bg-slate-200/50';
                    let statusBadge = null;

                    if (status === 'completed') {
                      statusStyle = 'bg-emerald-100/80 text-emerald-900 border border-emerald-300 font-semibold';
                      statusBadge = <Check className="w-3 h-3 text-emerald-600 inline ml-1" />;
                    } else if (status === 'verified') {
                      statusStyle = 'bg-sky-100 text-sky-900 border border-sky-300 font-semibold';
                      statusBadge = <Star className="w-3 h-3 text-sky-600 fill-sky-600 inline ml-1" />;
                    }

                    return (
                      <td
                        key={colIdx}
                        className={`py-2 px-2 text-center border-r border-slate-200/80 last:border-r-0 relative ${
                          val.includes('Xumure') ? 'font-bold text-emerald-700 bg-emerald-50' : ''
                        }`}
                      >
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              value={editingCell.value}
                              onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
                              onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                              className="w-full text-center text-xs bg-white border border-[#00A896] rounded px-1 py-0.5 focus:outline-none"
                              autoFocus
                            />
                            <button
                              onClick={handleSaveEdit}
                              className="bg-[#00A896] text-white text-[10px] px-1.5 py-0.5 rounded"
                            >
                              OK
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1 group/cell">
                            <button
                              onClick={() => onToggleCellStatus(week.id, row.id, colIdx)}
                              className={`w-full py-1.5 px-2 rounded-md text-xs transition-all cursor-pointer flex items-center justify-center gap-1 ${statusStyle}`}
                              title="Click to cycle status: Default -> Xumurame -> Verified -> Default"
                            >
                              <span className="truncate">{val}</span>
                              {statusBadge}
                            </button>

                            {onUpdateCellValue && (
                              <button
                                onClick={() => setEditingCell({ rowId: row.id, colIdx, value: val })}
                                className="opacity-0 group-hover/cell:opacity-100 text-slate-400 hover:text-slate-700 p-0.5"
                                title="Edit page range"
                              >
                                <Edit2 className="w-2.5 h-2.5" />
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-50 px-4 py-2 text-[11px] text-slate-500 border-t border-slate-200 flex items-center justify-between">
        <span className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-300" /> Pending
          </span>
          <span className="inline-flex items-center gap-1 text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Xumurame (Completed)
          </span>
          <span className="inline-flex items-center gap-1 text-sky-700">
            <span className="w-2 h-2 rounded-full bg-sky-500" /> Qorannoo (Verified)
          </span>
        </span>
        <span>Click cell to toggle completion status</span>
      </div>
    </div>
  );
};
