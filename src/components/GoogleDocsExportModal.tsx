import React, { useState } from 'react';
import { User } from 'firebase/auth';
import {
  FileText,
  X,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader2,
  Lock,
  Sparkles
} from 'lucide-react';
import { APP_DOC_TITLE } from '../data/hifzData';

interface GoogleDocsExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  accessToken: string | null;
  onLogin: () => void;
  onExport: (exportOptions: {
    title: string;
    includeRules: boolean;
    includeMonth1: boolean;
    includeMonth2: boolean;
    includeMonth3: boolean;
    studentFilter: string;
  }) => Promise<{ documentId: string; title: string; webViewLink: string } | null>;
  studentList: string[];
}

export const GoogleDocsExportModal: React.FC<GoogleDocsExportModalProps> = ({
  isOpen,
  onClose,
  user,
  accessToken,
  onLogin,
  onExport,
  studentList,
}) => {
  const [docTitle, setDocTitle] = useState(APP_DOC_TITLE);
  const [includeRules, setIncludeRules] = useState(true);
  const [includeMonth1, setIncludeMonth1] = useState(true);
  const [includeMonth2, setIncludeMonth2] = useState(true);
  const [includeMonth3, setIncludeMonth3] = useState(true);
  const [studentFilter, setStudentFilter] = useState('all');

  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [exportedResult, setExportedResult] = useState<{
    documentId: string;
    title: string;
    webViewLink: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleConfirmExport = async () => {
    if (!accessToken) {
      setExportError('Please sign in with Google to continue.');
      return;
    }

    setIsExporting(true);
    setExportError(null);

    try {
      const res = await onExport({
        title: docTitle,
        includeRules,
        includeMonth1,
        includeMonth2,
        includeMonth3,
        studentFilter,
      });

      if (res) {
        setExportedResult(res);
      }
    } catch (err: any) {
      console.error(err);
      setExportError(err.message || 'Failed to create document in Google Drive.');
    } finally {
      setIsExporting(false);
    }
  };

  const resetModal = () => {
    setExportedResult(null);
    setExportError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00A896]/10 text-[#00A896] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1B365D]">
                Export to Google Docs
              </h3>
              <p className="text-xs text-slate-500">
                Save Quran schedule as an editable Google Document
              </p>
            </div>
          </div>
          <button
            onClick={resetModal}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {exportedResult ? (
          <div className="py-6 text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 mb-1">
              Google Doc Created!
            </h4>
            <p className="text-xs text-slate-600 mb-4">
              "{exportedResult.title}" has been saved directly to your Google Drive.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={exportedResult.webViewLink}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-[#00A896] hover:bg-[#008f80] text-white font-semibold text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <span>Open in Google Docs</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={resetModal}
                className="w-full sm:w-auto border border-slate-300 text-slate-700 text-xs px-4 py-2.5 rounded-xl font-medium hover:bg-slate-50 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            
            {/* User Login Warning if not signed in */}
            {!user || !accessToken ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Google Sign-in Required</p>
                  <p className="mb-2">
                    Please sign in with your Google Account to grant permission to create documents in your Google Drive.
                  </p>
                  <button
                    onClick={onLogin}
                    className="gsi-material-button bg-white text-slate-700 font-semibold px-3 py-1.5 rounded-lg border border-slate-300 flex items-center gap-2 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <span>Sign in with Google</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {user.photoURL && <img src={user.photoURL} alt="" className="w-5 h-5 rounded-full" />}
                  <span className="font-semibold text-slate-700">{user.displayName || user.email}</span>
                </div>
                <span className="text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Connected
                </span>
              </div>
            )}

            {/* Document Title Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Document Title in Google Drive
              </label>
              <input
                type="text"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#00A896] focus:outline-none"
                placeholder="Title..."
              />
            </div>

            {/* Content Options */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2.5 text-xs">
              <span className="font-bold text-slate-700 block mb-1">Document Contents</span>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeRules}
                  onChange={(e) => setIncludeRules(e.target.checked)}
                  className="rounded text-[#00A896] focus:ring-[#00A896]"
                />
                <span className="text-slate-700">Include Rules Callout Box (Jijjiirama Tariikha)</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeMonth1}
                  onChange={(e) => setIncludeMonth1(e.target.checked)}
                  className="rounded text-[#00A896] focus:ring-[#00A896]"
                />
                <span className="text-slate-700">Ji'a 1ffaa: Baatii Hagayyaa (Month 1 Schedule)</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeMonth2}
                  onChange={(e) => setIncludeMonth2(e.target.checked)}
                  className="rounded text-[#00A896] focus:ring-[#00A896]"
                />
                <span className="text-slate-700">Ji'a 2ffaa: Qaammee & Meskerem (Month 2 Schedule)</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeMonth3}
                  onChange={(e) => setIncludeMonth3(e.target.checked)}
                  className="rounded text-[#00A896] focus:ring-[#00A896]"
                />
                <span className="text-slate-700">Ji'a 3ffaa: Tikimt (Month 3 Schedule)</span>
              </label>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-slate-600 font-medium">Student Filter:</span>
                <select
                  value={studentFilter}
                  onChange={(e) => setStudentFilter(e.target.value)}
                  className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800"
                >
                  <option value="all">All Students (Waliigala)</option>
                  {studentList.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Explicit User Confirmation Statement (Workspace Skill Mandate) */}
            <div className="border-l-4 border-sky-500 bg-sky-50 p-3 rounded-r-xl text-xs text-sky-900">
              <p className="font-semibold mb-0.5">Confirmation Notice</p>
              <p>
                By clicking <strong>Confirm & Create Google Doc</strong>, a new document titled{' '}
                <span className="font-bold">"{docTitle}"</span> will be created in your Google Drive folder.
              </p>
            </div>

            {/* Error banner */}
            {exportError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{exportError}</span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={resetModal}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmExport}
                disabled={isExporting || !accessToken}
                className="bg-[#00A896] hover:bg-[#008f80] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Document...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Confirm & Create Google Doc</span>
                  </>
                )}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
