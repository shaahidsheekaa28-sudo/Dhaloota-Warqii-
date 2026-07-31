import React from 'react';
import { User } from 'firebase/auth';
import {
  FileText,
  Download,
  Printer,
  FileDown,
  PlusCircle,
  LogOut,
  BookOpen,
  CalendarPlus,
  Sparkles,
  WifiOff
} from 'lucide-react';
import { MonthKey, MonthItem } from '../types';

interface HeaderProps {
  user: User | null;
  needsAuth: boolean;
  onLogin: () => void;
  onLogout: () => void;
  months: MonthItem[];
  activeMonth: MonthKey | 'all';
  setActiveMonth: (month: MonthKey | 'all') => void;
  onOpenAddMonth: () => void;
  selectedStudent: string;
  setSelectedStudent: (student: string) => void;
  studentList: string[];
  onOpenDocsExport: () => void;
  onDownloadDocx: () => void;
  onDownloadPdf: () => void;
  onPrint: () => void;
  onOpenCustomizer: () => void;
  onOpenPlanGenerator: () => void;
  isGeneratingDocx: boolean;
  isGeneratingPdf: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  needsAuth,
  onLogin,
  onLogout,
  months,
  activeMonth,
  setActiveMonth,
  onOpenAddMonth,
  selectedStudent,
  setSelectedStudent,
  studentList,
  onOpenDocsExport,
  onDownloadDocx,
  onDownloadPdf,
  onPrint,
  onOpenCustomizer,
  onOpenPlanGenerator,
  isGeneratingDocx,
  isGeneratingPdf,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B365D] to-[#00A896] text-white flex items-center justify-center shadow-md font-bold text-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-amber-500 text-white text-xs px-2.5 py-0.5 rounded-md font-extrabold uppercase tracking-wide shadow-xs">
                  Dhaloota Warqii
                </span>
                <h1 className="text-lg md:text-xl font-extrabold text-[#1B365D] tracking-tight">
                  SAGANTAA HIFZII FI MURAJA'AA
                </h1>
              </div>
              <p className="text-xs text-[#00A896] font-bold flex items-center gap-1.5 mt-0.5 flex-wrap">
                <span>Qopheessaan: <strong className="text-[#1B365D]">Shaahid Sheikh Mohammed</strong></span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-medium">Karoora Barattootaa</span>
                <span className="text-slate-300">•</span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] px-2 py-0.5 rounded-full font-extrabold flex items-center gap-1 shadow-2xs">
                  <WifiOff className="w-3 h-3 text-emerald-600" />
                  <span>Offline Ready (Data Saved)</span>
                </span>
              </p>
            </div>
          </div>

          {/* User Auth & Main Export Actions */}
          <div className="flex items-center flex-wrap gap-2">
            
            {/* Google Auth Button */}
            {user ? (
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="w-5 h-5 rounded-full" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#1B365D] text-white flex items-center justify-center text-[10px] font-bold">
                    {user.displayName?.[0] || 'U'}
                  </div>
                )}
                <span className="font-medium max-w-[120px] truncate">{user.displayName || user.email}</span>
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="text-slate-400 hover:text-red-500 transition-colors ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="gsi-material-button text-xs py-1 px-2.5 h-9 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <div className="w-4 h-4">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-full h-full">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  </svg>
                </div>
                <span>Sign in with Google</span>
              </button>
            )}

            {/* Plan Generator Button */}
            <button
              onClick={onOpenPlanGenerator}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-3 py-2 rounded-lg text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer hover:scale-[1.02]"
              title="Jeneratara Karoora Hifzii fi Muraja'aa"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-100" />
              <span>Jeneratara Karooraa</span>
            </button>

            {/* Google Docs Export Button */}
            <button
              onClick={onOpenDocsExport}
              className="bg-[#00A896] hover:bg-[#008f80] text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export to Google Docs</span>
            </button>

            {/* Download DOCX */}
            <button
              onClick={onDownloadDocx}
              disabled={isGeneratingDocx}
              className="bg-[#1B365D] hover:bg-[#142847] text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGeneratingDocx ? 'Generating...' : 'Download .DOCX'}</span>
            </button>

            {/* Download PDF */}
            <button
              onClick={onDownloadPdf}
              disabled={isGeneratingPdf}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              title="Download schedule as PDF file"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>{isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>

            {/* Print */}
            <button
              onClick={onPrint}
              className="border border-slate-300 hover:bg-slate-100 text-slate-700 p-2 rounded-lg text-xs transition-colors cursor-pointer"
              title="Print view / Print dialog"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Settings / Customize */}
            <button
              onClick={onOpenCustomizer}
              className="border border-slate-300 hover:bg-slate-100 text-slate-700 p-2 rounded-lg text-xs transition-colors cursor-pointer flex items-center gap-1 font-semibold"
              title="Add Student / Customize Schedule"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Gulaanta</span>
            </button>

          </div>
        </div>

        {/* Navigation & Controls Bar */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Month Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-medium w-full sm:w-auto overflow-x-auto">
            {months.map((m) => (
              <button
                key={m.key}
                onClick={() => setActiveMonth(m.key)}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  activeMonth === m.key
                    ? 'bg-white text-[#1B365D] font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {m.shortName}
              </button>
            ))}
            <button
              onClick={() => setActiveMonth('all')}
              className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                activeMonth === 'all'
                  ? 'bg-white text-[#1B365D] font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Waliigala (All Months)
            </button>

            {/* Add New Future Month Button */}
            <button
              onClick={onOpenAddMonth}
              className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 shadow-xs ml-1"
              title="Karoora Baatii Haaraa Dabali (Add Future Month Plan)"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              <span>+ Ji'a Haaraa Dabali</span>
            </button>
          </div>

          {/* Student Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="text-xs font-semibold text-slate-600 whitespace-nowrap">
              Barataa:
            </label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 px-3 py-1.5 focus:ring-2 focus:ring-[#00A896] focus:outline-none w-full sm:w-48"
            >
              <option value="all">Barattoota Hunda (All {studentList.length})</option>
              {studentList.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>
    </header>
  );
};

