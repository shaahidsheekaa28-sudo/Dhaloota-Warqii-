import React, { useState } from 'react';
import { Student } from '../types';
import { X, Plus, UserPlus, Trash2, Settings } from 'lucide-react';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onAddStudent: (name: string, startPage: number) => void;
  onDeleteStudent: (id: string) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  students,
  onAddStudent,
  onDeleteStudent,
}) => {
  const [newStudentName, setNewStudentName] = useState('');
  const [newStartPage, setNewStartPage] = useState<number>(604);

  if (!isOpen) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    onAddStudent(newStudentName.trim(), newStartPage);
    setNewStudentName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1B365D]/10 text-[#1B365D] flex items-center justify-center">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1B365D]">
                Gulaala Barattootaa (Manage Students)
              </h3>
              <p className="text-xs text-slate-500">Add or manage barattoota in the schedule</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add Student Form */}
        <form onSubmit={handleAdd} className="py-4 border-b border-slate-100 space-y-3">
          <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <UserPlus className="w-4 h-4 text-[#00A896]" /> Barataa Haaraa Dabali
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Maqaa Barataa
              </label>
              <input
                type="text"
                required
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                placeholder="e.g. Usmaan"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A896]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Fuula Eegalloo Hifzii
              </label>
              <input
                type="number"
                min={1}
                max={604}
                required
                value={newStartPage}
                onChange={(e) => setNewStartPage(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00A896]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1B365D] hover:bg-[#142847] text-white font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Barataa Dabali</span>
          </button>
        </form>

        {/* Existing Students List */}
        <div className="pt-4">
          <h4 className="text-xs font-bold text-slate-700 mb-2">
            Tarree Barattootaa ({students.length})
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {students.map((st) => (
              <div
                key={st.id}
                className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: st.color || '#1B365D' }}
                  />
                  <span className="font-bold text-[#1B365D]">{st.name}</span>
                  <span className="text-slate-500 font-medium">
                    (Fuula {st.startHifzPage})
                  </span>
                </div>
                {students.length > 1 && (
                  <button
                    onClick={() => onDeleteStudent(st.id)}
                    className="text-slate-400 hover:text-red-500 p-1"
                    title="Delete Student"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Cufi (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
