import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { MonthKey, ScheduleWeek, Student, MonthItem } from './types';
import { INITIAL_STUDENTS, INITIAL_WEEKS, INITIAL_MONTHS } from './data/hifzData';
import { initAuth, googleSignIn, logoutUser } from './lib/firebase';
import { downloadSchedulePDF } from './lib/pdfGenerator';
import { Header } from './components/Header';
import { RulesCard } from './components/RulesCard';
import { AdviceCard } from './components/AdviceCard';
import { StudentQASection } from './components/StudentQASection';
import { QuranCompetitionSection } from './components/QuranCompetitionSection';
import { ThreeMonthPlanTable } from './components/ThreeMonthPlanTable';
import { StudentProgressCard } from './components/StudentProgressCard';
import { ScheduleTable } from './components/ScheduleTable';
import { GoogleDocsExportModal } from './components/GoogleDocsExportModal';
import { ExportSuggestionToast } from './components/ExportSuggestionToast';
import { CustomizerModal } from './components/CustomizerModal';
import { AddMonthModal } from './components/AddMonthModal';
import { PlanGeneratorModal } from './components/PlanGeneratorModal';
import { PrintView } from './components/PrintView';
import { Calendar, Search, Sparkles, Filter, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [months, setMonths] = useState<MonthItem[]>(() => {
    try {
      const saved = localStorage.getItem('dhaloota_warqii_months');
      return saved ? JSON.parse(saved) : INITIAL_MONTHS;
    } catch {
      return INITIAL_MONTHS;
    }
  });

  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('dhaloota_warqii_students');
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  const [weeks, setWeeks] = useState<ScheduleWeek[]>(() => {
    try {
      const saved = localStorage.getItem('dhaloota_warqii_weeks');
      return saved ? JSON.parse(saved) : INITIAL_WEEKS;
    } catch {
      return INITIAL_WEEKS;
    }
  });

  const [activeMonth, setActiveMonth] = useState<MonthKey | 'all'>('hagayya');
  const [selectedStudent, setSelectedStudent] = useState<string>('all');

  // Sync to localStorage for complete offline capability
  useEffect(() => {
    try {
      localStorage.setItem('dhaloota_warqii_months', JSON.stringify(months));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [months]);

  useEffect(() => {
    try {
      localStorage.setItem('dhaloota_warqii_students', JSON.stringify(students));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem('dhaloota_warqii_weeks', JSON.stringify(weeks));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [weeks]);

  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);

  // Modals & Export Suggestion Toast State
  const [isDocsExportOpen, setIsDocsExportOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isAddMonthOpen, setIsAddMonthOpen] = useState(false);
  const [isPlanGeneratorOpen, setIsPlanGeneratorOpen] = useState(false);
  const [isGeneratingDocx, setIsGeneratingDocx] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  
  // Quality-of-life: Schedule change tracking for Google Docs export tooltip/toast
  const [changeCount, setChangeCount] = useState<number>(0);
  const [showExportToast, setShowExportToast] = useState<boolean>(false);

  const registerScheduleChange = () => {
    setChangeCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount >= 3) {
        setShowExportToast(true);
      }
      return nextCount;
    });
  };

  // Initialize Firebase Auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (u, token) => {
        setUser(u);
        setAccessToken(token);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        setNeedsAuth(false);
      }
    } catch (err: any) {
      console.warn('Login attempt:', err);
      alert(err?.message || 'Google login failed. Please ensure popups are allowed or open the app in a new tab.');
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    setAccessToken(null);
    setNeedsAuth(true);
  };

  // Cell status toggling (Pending -> Completed -> Verified -> Pending)
  const handleToggleCellStatus = (weekId: string, rowId: string, colIdx: number) => {
    registerScheduleChange();
    setWeeks((prevWeeks) =>
      prevWeeks.map((w) => {
        if (w.id !== weekId) return w;
        return {
          ...w,
          rows: w.rows.map((r) => {
            if (r.id !== rowId) return r;
            const currentStatuses = r.statuses || Array(r.values.length).fill('pending');
            const current = currentStatuses[colIdx] || 'pending';
            let next: 'pending' | 'completed' | 'verified' = 'completed';
            if (current === 'completed') next = 'verified';
            else if (current === 'verified') next = 'pending';

            const newStatuses = [...currentStatuses];
            newStatuses[colIdx] = next;
            return { ...r, statuses: newStatuses };
          }),
        };
      })
    );
  };

  // Update cell value
  const handleUpdateCellValue = (weekId: string, rowId: string, colIdx: number, newValue: string) => {
    registerScheduleChange();
    setWeeks((prevWeeks) =>
      prevWeeks.map((w) => {
        if (w.id !== weekId) return w;
        return {
          ...w,
          rows: w.rows.map((r) => {
            if (r.id !== rowId) return r;
            const newVals = [...r.values];
            newVals[colIdx] = newValue;
            return { ...r, values: newVals };
          }),
        };
      })
    );
  };

  // Add new student
  const handleAddStudent = (name: string, startPage: number) => {
    registerScheduleChange();
    const newSt: Student = {
      id: String(Date.now()),
      name,
      programType: 'Hifzii',
      dailyRate: 'Fuula 1',
      startHifzPage: startPage,
      currentHifzPage: Math.max(1, startPage - 90),
      targetHifzPage: 1,
      color: '#00A896',
    };
    setStudents((prev) => [...prev, newSt]);
  };

  // Delete student
  const handleDeleteStudent = (id: string) => {
    registerScheduleChange();
    const stToDelete = students.find((s) => s.id === id);
    if (!stToDelete) return;

    setStudents((prev) => prev.filter((s) => s.id !== id));
    setWeeks((prevWeeks) =>
      prevWeeks.map((w) => ({
        ...w,
        rows: w.rows.filter((r) => r.studentName.toLowerCase() !== stToDelete.name.toLowerCase()),
      }))
    );
  };

  // Handle adding a new future month
  const handleAddMonth = (newMonth: MonthItem, newWeeks: ScheduleWeek[]) => {
    registerScheduleChange();
    setMonths((prev) => [...prev, newMonth]);
    setWeeks((prev) => [...prev, ...newWeeks]);
    setActiveMonth(newMonth.key);
  };

  // Handle plan generator
  const handleGeneratePlan = (
    newMonths: MonthItem[],
    newWeeks: ScheduleWeek[],
    updatedStudents?: Student[]
  ) => {
    registerScheduleChange();
    setMonths(newMonths);
    setWeeks(newWeeks);
    if (updatedStudents && updatedStudents.length > 0) {
      setStudents(updatedStudents);
    }
    if (newMonths.length > 0) {
      setActiveMonth(newMonths[0].key);
    }
  };

  // Export to Google Docs API handler
  const handleExportToGoogleDocs = async (exportOptions: {
    title: string;
    includeRules: boolean;
    includeMonth1: boolean;
    includeMonth2: boolean;
    includeMonth3: boolean;
    studentFilter: string;
  }) => {
    if (!accessToken) {
      throw new Error('Missing OAuth Access Token. Please sign in with Google.');
    }

    // Filter weeks based on user choices
    const filteredWeeks = weeks.filter((w) => {
      if (w.monthKey === 'hagayya' && !exportOptions.includeMonth1) return false;
      if (w.monthKey === 'qaammee_meskerem' && !exportOptions.includeMonth2) return false;
      if (w.monthKey === 'tikimt' && !exportOptions.includeMonth3) return false;
      return true;
    });

    const response = await fetch('/api/export-docs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken,
        title: exportOptions.title,
        weeks: filteredWeeks,
        options: {
          title: exportOptions.title,
          includeRules: exportOptions.includeRules,
          studentFilter: exportOptions.studentFilter === 'all' ? undefined : exportOptions.studentFilter,
        },
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to create Google Doc.');
    }

    return data;
  };

  // Direct .docx file download
  const handleDownloadDocx = async () => {
    setIsGeneratingDocx(true);
    try {
      const response = await fetch('/api/generate-docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weeks,
          options: {
            studentFilter: selectedStudent === 'all' ? undefined : selectedStudent,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate .docx');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Sagantaa_Hifzii_Guutuu.docx';
      a.target = '_blank';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      
      setTimeout(() => {
        a.remove();
        window.URL.revokeObjectURL(url);
      }, 2000);
    } catch (err: any) {
      console.error('Download error:', err);
      alert('Error generating .docx file: ' + (err?.message || 'Download failed'));
    } finally {
      setIsGeneratingDocx(false);
    }
  };

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      await downloadSchedulePDF('print-document-container', 'Sagantaa_Hifzii_Guutuu.pdf');
    } catch (err: any) {
      console.error('PDF download error:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter weeks to render
  const visibleWeeks = weeks.filter((w) => {
    if (activeMonth === 'all') return true;
    return w.monthKey === activeMonth;
  });

  const studentList = students.map((s) => s.name);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      
      {/* Header Bar */}
      <Header
        user={user}
        needsAuth={needsAuth}
        onLogin={handleLogin}
        onLogout={handleLogout}
        months={months}
        activeMonth={activeMonth}
        setActiveMonth={setActiveMonth}
        onOpenAddMonth={() => setIsAddMonthOpen(true)}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
        studentList={studentList}
        onOpenDocsExport={() => setIsDocsExportOpen(true)}
        onDownloadDocx={handleDownloadDocx}
        onDownloadPdf={handleDownloadPdf}
        onPrint={handlePrint}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        onOpenPlanGenerator={() => setIsPlanGeneratorOpen(true)}
        isGeneratingDocx={isGeneratingDocx}
        isGeneratingPdf={isGeneratingPdf}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Rules Callout Banner */}
        <RulesCard />

        {/* 3-Month Summary Overview Table (19 Students) */}
        <ThreeMonthPlanTable
          students={students}
          selectedStudent={selectedStudent}
          onSelectStudent={(st) => setSelectedStudent(st)}
        />

        {/* Student Progress Metrics Summary */}
        <StudentProgressCard
          students={students}
          weeks={weeks}
          selectedStudent={selectedStudent}
          onSelectStudent={(st) => setSelectedStudent(st)}
        />

        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#1B365D]" />
            <h2 className="text-base font-extrabold text-[#1B365D]">
              {activeMonth === 'all'
                ? `SAGANTAA WALIIGALAA (${months.length} BAATII GUUTUU)`
                : months.find((m) => m.key === activeMonth)?.title || 'KAROORA BAATII'}
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Agarsiisa {visibleWeeks.length} Gabateewwan Torbanii
          </span>
        </div>

        {/* Schedule Tables */}
        {visibleWeeks.map((week) => (
          <ScheduleTable
            key={week.id}
            week={week}
            selectedStudent={selectedStudent}
            onToggleCellStatus={handleToggleCellStatus}
            onUpdateCellValue={handleUpdateCellValue}
          />
        ))}

        {/* Advice & Guidance for Quran Students (Gorsaa, Nasiihaa fi Dhaamsa Kaka'umsaa) - Moved below tables */}
        <AdviceCard />

        {/* Interactive Student Q&A & Support Section */}
        <StudentQASection />

        {/* Quran Hifz & Tilaawaa Competition & Quiz Hub */}
        <QuranCompetitionSection students={students} />

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-medium">
            Dhaloota Warqii: Sagantaa Hifzii fi Muraja'aa Qur'aana Barattootaa
          </p>
          <div className="flex items-center gap-4 text-slate-500 font-semibold">
            <span>{students.length} Barattoota</span>
            <span>•</span>
            <span>{months.length} Baatii ({months.length * 20} Days)</span>
          </div>
        </div>
      </footer>

      {/* Printable Output View */}
      <PrintView weeks={weeks} selectedStudent={selectedStudent} />

      {/* Modals */}
      <GoogleDocsExportModal
        isOpen={isDocsExportOpen}
        onClose={() => setIsDocsExportOpen(false)}
        user={user}
        accessToken={accessToken}
        onLogin={handleLogin}
        onExport={handleExportToGoogleDocs}
        studentList={studentList}
      />

      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        students={students}
        onAddStudent={handleAddStudent}
        onDeleteStudent={handleDeleteStudent}
      />

      <AddMonthModal
        isOpen={isAddMonthOpen}
        onClose={() => setIsAddMonthOpen(false)}
        existingMonths={months}
        months={months}
        students={students}
        weeks={weeks}
        onAddMonth={handleAddMonth}
      />

      <PlanGeneratorModal
        isOpen={isPlanGeneratorOpen}
        onClose={() => setIsPlanGeneratorOpen(false)}
        students={students}
        onGeneratePlan={handleGeneratePlan}
      />

      {/* Floating Export Suggestion Toast */}
      <ExportSuggestionToast
        changeCount={changeCount}
        isOpen={showExportToast}
        onOpenDocsExport={() => {
          setIsDocsExportOpen(true);
          setShowExportToast(false);
        }}
        onDownloadDocx={handleDownloadDocx}
        onDismiss={() => {
          setShowExportToast(false);
          setChangeCount(0);
        }}
      />

    </div>
  );
}
