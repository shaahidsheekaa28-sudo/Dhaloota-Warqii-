export type MonthKey = string;

export interface MonthItem {
  key: MonthKey;
  title: string;
  shortName: string;
  days: number;
}

export type ProgramType = 'Tilaawaa' | 'Hifzii';

export interface Student {
  id: string;
  name: string;
  programType: ProgramType;
  dailyRate: string; // e.g., 'Fuula 1', 'Fuula 2', 'Fuula 0.5'
  startHifzPage: number; // Fuula Eegalloo (Hagayya 2)
  currentHifzPage: number; // Fuula Baatii 3 Booda Gahan
  targetHifzPage: number; // e.g. 1
  color?: string;
}

export interface WeekRowData {
  id: string;
  studentName: string;
  type: 'Hifzii Haaraa' | "Muraja'aa" | 'Tilaawaa' | 'Hifzii';
  values: string[];
  statuses?: ('pending' | 'completed' | 'verified')[];
}

export interface ScheduleWeek {
  id: string;
  title: string;
  monthKey: MonthKey;
  headers: string[];
  rows: WeekRowData[];
  note?: string;
}

export interface ExportToDocsOptions {
  title: string;
  includeMonth1: boolean;
  includeMonth2: boolean;
  includeMonth3: boolean;
  includeRules: boolean;
  selectedStudent?: string;
}

export interface UserAuth {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  accessToken: string | null;
}

