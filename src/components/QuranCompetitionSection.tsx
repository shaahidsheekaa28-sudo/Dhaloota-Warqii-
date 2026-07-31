import React, { useState } from 'react';
import { Student } from '../types';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RefreshCw, 
  Users, 
  Zap, 
  BookOpen, 
  Flame, 
  Star, 
  Clock, 
  Volume2, 
  ChevronRight,
  ShieldAlert,
  Medal,
  RotateCcw
} from 'lucide-react';

interface QuestionBankItem {
  id: string;
  category: 'continue_ayah' | 'mutashabihat' | 'surah_name' | 'tajweed' | 'page_number';
  categoryTitle: string;
  juz: string;
  pageNumber?: number;
  question: string;
  arabicPrompt?: string;
  options: string[];
  correctAnswer: number; // index of options
  explanation: string;
}

const COMPETITION_QUESTIONS: QuestionBankItem[] = [
  {
    id: 'page_1_q',
    category: 'page_number',
    categoryTitle: 'Gaaffii Fuula Safhaa 1ffaa (Page 1)',
    juz: 'Juz 1 (Al-Faatihaa)',
    pageNumber: 1,
    question: 'Fuula 1ffaa (Page 1) Mushafa Madinaa irratti Surah fi Aayatoota kamtu argamu?',
    arabicPrompt: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ (1) الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ (2)...',
    options: [
      'Surat Al-Faatihaa (Aayaa 1 - 7 Guutuu)',
      'Surat Al-Baqarah (Aayaa 1 - 5)',
      'Surat An-Naas (Aayaa 1 - 6)',
      'Surat Al-Ikhlaas (Aayaa 1 - 4)'
    ],
    correctAnswer: 0,
    explanation: 'Fuula 1ffaa (Page 1) Mushafa Madinaa irratti Surat Al-Faatihaa qofaatu argama (Aayaa 1-7).'
  },
  {
    id: 'page_2_q',
    category: 'page_number',
    categoryTitle: 'Gaaffii Fuula Safhaa 2ffaa (Page 2)',
    juz: 'Juz 1 (Al-Baqarah)',
    pageNumber: 2,
    question: 'Fuula 2ffaa (Page 2) Mushafa Madinaa irratti Surah fi Aayatoota kamtu eegala?',
    arabicPrompt: 'الم (1) ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ (2)...',
    options: [
      'Surat Al-Baqarah (Aayaa 1 - 5)',
      'Surat Al-Baqarah (Aayaa 6 - 16)',
      'Surat Aal-Imraan (Aayaa 1 - 9)',
      'Surat Al-Faatihaa (Aayaa 1 - 7)'
    ],
    correctAnswer: 0,
    explanation: 'Fuula 2ffaa (Page 2) irratti Jalqaba Surat Al-Baqarah (الم... Aayaa 1-5) argama.'
  },
  {
    id: 'page_604_q',
    category: 'page_number',
    categoryTitle: 'Gaaffii Fuula Safhaa 604ffaa (Page 604)',
    juz: 'Juz 30 (Al-Ikhlaas, Al-Falaq, An-Naas)',
    pageNumber: 604,
    question: 'Fuula 604ffaa (Page 604 - Fuula Xumuraa Qur\'aanaa) irratti Suuraawwan kamtu argamu?',
    arabicPrompt: 'قُلْ هُوَ اللَّهُ أَحَدٌ... / قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ... / قُلْ أَعُوذُ بِرَبِّ النَّاسِ...',
    options: [
      'Surat Al-Ikhlaas, Surat Al-Falaq fi Surat An-Naas',
      'Surat Al-Kaafiroon fi Surat An-Nasr',
      'Surat Al-Mulk, Al-Qalam fi Al-Haaqqah',
      'Surat An-Naba qofa'
    ],
    correctAnswer: 0,
    explanation: 'Fuula 604ffaa (Page 604) irratti Suuraaleen sadan xumuraa (Al-Ikhlaas, Al-Falaq, An-Naas) argamu.'
  },
  {
    id: 'page_582_q',
    category: 'page_number',
    categoryTitle: 'Gaaffii Fuula Safhaa 582ffaa (Page 582)',
    juz: 'Juz 30 (An-Naba)',
    pageNumber: 582,
    question: 'Fuula 582ffaa (Page 582) Juzii 30ffaa irratti Suuraa kamtu eegala?',
    arabicPrompt: 'عَمَّ يَتَسَاءَلُونَ (1) عَنِ النَّبَإِ الْعَظِيمِ (2)...',
    options: [
      'Surat An-Naba (Aayaa 1 - 30)',
      'Surat An-Naazi\'aat',
      'Surat Abasa',
      'Surat At-Takweer'
    ],
    correctAnswer: 0,
    explanation: 'Fuula 582ffaa (Page 582) irratti Jalqaba Juzii 30ffaa kan ta\'e Surat An-Naba eegala.'
  },
  {
    id: 'page_42_q',
    category: 'page_number',
    categoryTitle: 'Gaaffii Fuula Safhaa 42ffaa (Page 42)',
    juz: 'Juz 3 (Al-Baqarah 255)',
    pageNumber: 42,
    question: 'Aayatal Kursiyyi (آيَةُ الْكُرْسِيِّ - Al-Baqarah 255) Fuula Safhaa Qur\'aanaa kam irratti argamti?',
    arabicPrompt: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...',
    options: [
      'Fuula 42 (Page 42, Al-Baqarah 255)',
      'Fuula 10 (Page 10)',
      'Fuula 100 (Page 100)',
      'Fuula 250 (Page 250)'
    ],
    correctAnswer: 0,
    explanation: 'Aayatal Kursiyyin Surat Al-Baqarah Aayaa 255ffaa Fuula 42 Mushafa Madinaa irratti argamti.'
  },
  {
    id: 'c1',
    category: 'continue_ayah',
    categoryTitle: 'Aayaa Itti Fufi (Continue Verse)',
    juz: 'Juz 30 (An-Naba)',
    question: 'Aayaa "عَمَّ يَتَسَاءَلُونَ (1) عَنِ النَّبَإِ الْعَظِيمِ (2)" booda aayaa kamtu dhufta?',
    arabicPrompt: 'عَمَّ يَتَسَاءَلُونَ (1) عَنِ النَّبَإِ الْعَظِيمِ (2)...',
    options: [
      'الَّذِي هُمْ فِيهِ مُخْتَلِفُونَ',
      'كَلَّا سَيَعْلَمُونَ',
      'أَلَمْ نَجْعَلِ الْأَرْضَ مِهَادًا',
      'وَخَلَقْنَاكُمْ أَزْوَاجًا'
    ],
    correctAnswer: 0,
    explanation: 'Aayanni 3ffaan Surat An-Naba: "الَّذِي هُمْ فِيهِ مُخْتَلِفُونَ" dha.'
  },
  {
    id: 'c2',
    category: 'mutashabihat',
    categoryTitle: 'Mutashaabihaat (Aayatoota Wal-fakkaatan)',
    juz: 'Juz 1 (Al-Baqarah)',
    question: 'Surat Al-Baqarah keessatti "فَكُلُوا مِنْهَا حَيْثُ شِئْتُمْ رَغَدًا..." aayaa 58 keessatti dhufa. Surat Al-A\'raaf (161) keessatti jechi kamtu jijjiirama?',
    arabicPrompt: 'Al-Baqarah 58 vs Al-A\'raaf 161',
    options: [
      'Al-A\'raaf keessatti "رَغَدًا" kan jedhu hin jiru, "وَكُلُوا مِنْهَا حَيْثُ شِئْتُمْ" jedha',
      'Al-A\'raaf keessatti "فَكُلُوا" kan jedhu bakka "وَكُلُوا" dhufta',
      'Jechi lamaanuu wal fakkaata',
      'Al-A\'raaf keessatti "وَادْخُلُوا الْبَابَ" booda dhufa'
    ],
    correctAnswer: 0,
    explanation: 'Surat Al-A\'raaf aayah 161 keessatti jechi "رَغَدًا" jedhu hin dhuftu; "وَكُلُوا مِنْهَا حَيْثُ شِئْتُمْ" jedha.'
  },
  {
    id: 'c3',
    category: 'surah_name',
    categoryTitle: 'Surah Kam Keessatti Argama?',
    juz: 'Juz 29 (Al-Mulk)',
    question: 'Aayanni "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ" Surah kam keessatti argama?',
    arabicPrompt: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ...',
    options: [
      'Surat Al-Mulk',
      'Surat Al-Qalam',
      'Surat Al-Haaqqah',
      'Surat Al-Ma\'arij'
    ],
    correctAnswer: 0,
    explanation: 'Surat Al-Mulk aayah 1ffaa irraa eegala.'
  },
  {
    id: 'c4',
    category: 'tajweed',
    categoryTitle: 'Seera Tajweeda fi Tilaawaa',
    juz: 'Tajweed Rules',
    question: 'Nun Saakina ykn Tanween booda Harfiin "ب" (Ba) yoo dhufe seerri Tajweed kamtu raawwatama?',
    arabicPrompt: 'مِن بَعْدِ / كِرَامٍ بَرَرَةٍ',
    options: [
      'Iqlaab (Iqlaab - Nun gara Meem jijjiiruu)',
      'Idghaam Bighunna',
      'Izhaar Halqii',
      'Ikhfaa Shafawii'
    ],
    correctAnswer: 0,
    explanation: 'Nun Saakina ykn Tanween booda "ب" yoo dhufe seera Iqlaab ta\'a; Nun gara Meem (م) sammuun jijjiirama.'
  },
  {
    id: 'c5',
    category: 'continue_ayah',
    categoryTitle: 'Aayaa Itti Fufi (Continue Verse)',
    juz: 'Juz 30 (Al-Fajr)',
    question: 'Aayaa "وَالْفَجْرِ (1) وَلَيَالٍ عَشْرٍ (2) وَالشَّفْعِ وَالْوَتْرِ (3)" booda aayaa 4ffaan maali?',
    arabicPrompt: 'وَالْفَجْرِ (1) وَلَيَالٍ عَشْرٍ (2) وَالشَّفْعِ وَالْوَتْرِ (3)...',
    options: [
      'وَاللَّيْلِ إِذَا يَسْرِ',
      'هَلْ فِي ذَٰلِكَ قَسَمٌ لِّذِي حِجْرٍ',
      'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِعَادٍ',
      'إِرَمَ ذَاتِ الْعِمَادِ'
    ],
    correctAnswer: 0,
    explanation: 'Aayanni 4ffaan Surat Al-Fajr: "وَاللَّيْلِ إِذَا يَسْرِ" dha.'
  },
  {
    id: 'c6',
    category: 'mutashabihat',
    categoryTitle: 'Mutashaabihaat (Aayatoota Wal-fakkaatan)',
    juz: 'Juz 30 (An-Naas / Al-Falaq)',
    question: 'Surat Al-Falaq fi Surat An-Naas keessatti jechi "قُلْ أَعُوذُ بِرَبِّ..." jedhu garagarummaan isaa maali?',
    arabicPrompt: 'Al-Falaq vs An-Naas',
    options: [
      'Al-Falaq: بِرَبِّ الْفَلَقِ | An-Naas: بِرَبِّ النَّاسِ',
      'Lamaanuu wal fakkaata',
      'Al-Falaq keessatti "مَلِكِ" dhufa',
      'An-Naas keessatti "مِن شَرِّ مَا خَلَقَ" dhufa'
    ],
    correctAnswer: 0,
    explanation: 'Al-Falaq keessatti "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", An-Naas keessatti immoo "قُلْ أَعُوذُ بِرَبِّ النَّاسِ" dha.'
  }
];

interface QuranCompetitionSectionProps {
  students: Student[];
}

export const QuranCompetitionSection: React.FC<QuranCompetitionSectionProps> = ({ students }) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'judge_scorecard' | 'questions_bank' | 'page_lookup'>('quiz');

  // Page Range Selector State (e.g. Fuula 1 hanga Fuula 20)
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(20);
  const [selectedPageNum, setSelectedPageNum] = useState<number>(1);
  const [rangeCategory, setRangeCategory] = useState<'all' | 'hifz' | 'mutashabihat' | 'tajweed'>('all');
  const [generatedRangeQuestions, setGeneratedRangeQuestions] = useState<Array<{
    num: number;
    title: string;
    question: string;
    details: string;
    type: string;
  }>>([]);

  // Generate dynamic questions when range changes
  const handleGenerateRangeQuestions = (sPage: number, ePage: number) => {
    const s = Math.max(1, Math.min(604, sPage));
    const e = Math.max(s, Math.min(604, ePage));
    setStartPage(s);
    setEndPage(e);

    const questions = [
      {
        num: 1,
        title: `Gaaffii 1: Qormaata Hifzii Fuula ${s} Hanga ${e}`,
        question: `Fuula ${s}ffaa irraa eegalee hanga Fuula ${e}ffatti: Surah fi Juzii daangaa kantaa keessa jiru dubbisi. Aayaa jalqaba Fuula ${s} fi aayaa xumura Fuula ${e} dubbisi?`,
        details: `Madaallii: Pajiin ${s} hanga ${e} waliigala fuula ${e - s + 1} qaba. Barataan saffisa fi Hifz qulqulluun dubbisuu qaba.`,
        type: 'Hifz Accuracy'
      },
      {
        num: 2,
        title: `Gaaffii 2: Aayaa Itti Fufi (Fuula ${s} - ${e})`,
        question: `Ustaz ykn Barsiisaan Fuula ${Math.floor((s + e) / 2)}ffaa irraa aayaa tokko eegala. Barataan aayaa dhuftu itti fufii hafziidhaan dubbisuu qaba.`,
        details: `Fakkeenyaaf: Fuula ${Math.floor((s + e) / 2)}ffaa irratti aayanni eegalu qorama.`,
        type: 'Continue Ayah'
      },
      {
        num: 3,
        title: `Gaaffii 3: Mutashaabihaat fi Qajeelfama Tilaawaa (Fuula ${s} - ${e})`,
        question: `Daangaa Fuula ${s} hanga ${e} keessatti aayatoota wal-fakkaatan (Mutashaabihaat) fi garaaggarummaa isaanii adda baasi.`,
        details: `Fakkeenyaaf: Fuula ${s} fi ${e} gidduutti jechoota ykn aayatoota walfakkaatan 2 caqasi.`,
        type: 'Mutashabihat'
      },
      {
        num: 4,
        title: `Gaaffii 4: Ahkaama Tajweeda Fuula ${s} Hanga ${e}`,
        question: `Daangaa Fuula ${s} hanga ${e} keessatti Seera Tajweed (Idghaam, Iqlaab, Izhaar, Ikhfaa) aayaa tokko irratti hojiirra oolchi.`,
        details: `Barataan harfoota Maddaa fi ahkaama Nun Saakina sirriitti dubbisuu madaalama.`,
        type: 'Tajweed Rules'
      }
    ];

    setGeneratedRangeQuestions(questions);
  };

  // Run initial generation on component mount
  React.useEffect(() => {
    handleGenerateRangeQuestions(startPage, endPage);
  }, []);

  // Interactive Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(30);

  // Judge Scorecard State (Teacher live grading)
  const [studentAId, setStudentAId] = useState<string>(students[0]?.id || '');
  const [studentBId, setStudentBId] = useState<string>(students[1]?.id || students[0]?.id || '');
  const [scoreA, setScoreA] = useState<{ hifz: number; tajweed: number; tilaawaa: number }>({ hifz: 85, tajweed: 90, tilaawaa: 92 });
  const [scoreB, setScoreB] = useState<{ hifz: number; tajweed: number; tilaawaa: number }>({ hifz: 88, tajweed: 85, tilaawaa: 90 });
  const [judgeNote, setJudgeNote] = useState<string>('Dorgommii cimsannaa Hifzii fi Tilaawaa bareeda.');

  const currentQ = COMPETITION_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctAnswer) {
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < COMPETITION_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setStreak(0);
    setQuizCompleted(false);
  };

  const totalPossibleScore = COMPETITION_QUESTIONS.length * 10;
  const studentA = students.find((s) => s.id === studentAId) || students[0];
  const studentB = students.find((s) => s.id === studentBId) || students[1];

  const totalScoreA = scoreA.hifz + scoreA.tajweed + scoreA.tilaawaa;
  const totalScoreB = scoreB.hifz + scoreB.tajweed + scoreB.tilaawaa;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200/80 my-8">
      {/* Main Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-md">
            <Trophy className="w-6 h-6 text-amber-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-[#1B365D]">
                DORGOMMII HIFZII FI TILAAWAA (Quran Hifz & Tilaawaa Competition)
              </h2>
              <span className="bg-amber-100 text-amber-800 text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">
                Live Challenge
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Barattoota gidduutti dorgommii Hifzii, Mutashaabihaat, Tajweeda fi Tilaawaa gaggeessuuf.
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1 shrink-0">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-white text-[#1B365D] shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Quiz Interactive</span>
          </button>

          <button
            onClick={() => setActiveTab('judge_scorecard')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'judge_scorecard'
                ? 'bg-white text-[#1B365D] shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#00A896]" />
            <span>Madaallii Ustaza (Scorecard)</span>
          </button>

          <button
            onClick={() => setActiveTab('questions_bank')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'questions_bank'
                ? 'bg-white text-[#1B365D] shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#1B365D]" />
            <span>Bankii Gaaffii ({COMPETITION_QUESTIONS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('page_lookup')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'page_lookup'
                ? 'bg-white text-emerald-800 shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Gaaffii Fuula (Page 1-604)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE QUIZ MODE */}
      {activeTab === 'quiz' && (
        <div className="pt-6 space-y-6">
          {!quizCompleted ? (
            <div className="max-w-3xl mx-auto bg-slate-50 rounded-2xl p-6 border border-slate-200/80 shadow-xs relative">
              
              {/* Quiz Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <div className="flex items-center gap-2">
                  <span className="bg-[#1B365D] text-white text-[11px] font-extrabold px-2.5 py-1 rounded-lg">
                    Gaaffii {currentQuestionIndex + 1} / {COMPETITION_QUESTIONS.length}
                  </span>
                  <span className="bg-[#00A896]/10 text-[#00A896] text-[11px] font-extrabold px-2.5 py-1 rounded-lg">
                    {currentQ.categoryTitle}
                  </span>
                  <span className="text-xs text-slate-500 font-bold hidden sm:inline">
                    [{currentQ.juz}]
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-1 rounded-lg text-xs font-black">
                    <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
                    <span>Streak: {streak}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-lg text-xs font-black">
                    <Star className="w-4 h-4 text-emerald-600 fill-emerald-500" />
                    <span>Qabxii: {score}</span>
                  </div>
                </div>
              </div>

              {/* Question Box */}
              <div className="mb-6 space-y-3">
                <h3 className="text-base sm:text-lg font-extrabold text-[#1B365D] leading-snug">
                  {currentQ.question}
                </h3>
                {currentQ.arabicPrompt && (
                  <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200/70 text-right">
                    <p className="font-serif text-xl sm:text-2xl text-slate-800 leading-loose" dir="rtl">
                      {currentQ.arabicPrompt}
                    </p>
                  </div>
                )}
              </div>

              {/* Multiple Choice Options */}
              <div className="grid grid-cols-1 gap-3 mb-6">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle = "bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-100/50";
                  
                  if (selectedOption === idx) {
                    btnStyle = "bg-[#1B365D]/10 border-[#1B365D] text-[#1B365D] font-extrabold ring-2 ring-[#1B365D]/20";
                  }

                  if (isAnswerSubmitted) {
                    if (idx === currentQ.correctAnswer) {
                      btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-extrabold ring-2 ring-emerald-300";
                    } else if (selectedOption === idx) {
                      btnStyle = "bg-rose-50 border-rose-500 text-rose-900 font-extrabold ring-2 ring-rose-200";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`p-4 rounded-xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-200/70 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold leading-relaxed">
                          {opt}
                        </span>
                      </div>

                      {isAnswerSubmitted && idx === currentQ.correctAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {isAnswerSubmitted && selectedOption === idx && idx !== currentQ.correctAnswer && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Reveal after submitting */}
              {isAnswerSubmitted && (
                <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 mb-6 space-y-1 animate-fade-in">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Ibsa Deebii (Explanation):</span>
                  </div>
                  <p className="text-xs text-slate-800 font-medium">
                    {currentQ.explanation}
                  </p>
                </div>
              )}

              {/* Submit / Next Actions */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-400 font-semibold">
                  {isAnswerSubmitted ? "Deebiin mirkanaa'eera" : "Deebii sirrii filadhuu ergi"}
                </span>

                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className={`px-6 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all shadow-md ${
                      selectedOption !== null
                        ? 'bg-[#00A896] hover:bg-[#008f80] text-white cursor-pointer hover:scale-[1.02]'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>DEEBII ERGI</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 bg-[#1B365D] hover:bg-[#132847] text-white font-extrabold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md cursor-pointer hover:scale-[1.02]"
                  >
                    <span>{currentQuestionIndex + 1 < COMPETITION_QUESTIONS.length ? 'GAAFFII AANAAS' : 'BU\'AA XUMURAA'}</span>
                    <ChevronRight className="w-4 h-4 text-amber-300" />
                  </button>
                )}
              </div>

            </div>
          ) : (
            /* Quiz Results Card */
            <div className="max-w-xl mx-auto text-center bg-gradient-to-br from-[#1B365D] to-[#0e223f] text-white rounded-2xl p-8 shadow-xl space-y-6">
              <div className="w-20 h-20 rounded-full bg-amber-400/20 text-amber-300 border-2 border-amber-300/40 flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-10 h-10 animate-bounce" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-amber-300 mb-1">
                  BAREEDAA! DORGOMMIIN XUMURAMEERA
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  Bu'aa fi Qabxii Dorgommii Hifzii fi Tilaawaa Keessani
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-white/10 p-4 rounded-xl border border-white/10">
                <div>
                  <span className="block text-[10px] text-slate-300 uppercase font-bold">Qabxii Argadtan</span>
                  <span className="text-2xl font-black text-amber-300">{score} / {totalPossibleScore}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-300 uppercase font-bold">Dhibbeentaa (Accuracy)</span>
                  <span className="text-2xl font-black text-emerald-300">
                    {Math.round((score / totalPossibleScore) * 100)}%
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={handleRestartQuiz}
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>DEEBI’II IRRAA EEGALI</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: TEACHER LIVE JUDGE SCORECARD */}
      {activeTab === 'judge_scorecard' && (
        <div className="pt-6 space-y-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="text-xs font-black text-[#1B365D] uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#00A896]" />
              <span>Moodeela Madaallii Ustaza (Live Judge Scoreboard)</span>
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Ustaz ykn Barsiisaan dorgommii fuulaa-fuulatti barattoota lamaan gidduutti gaggeessuun qabxii Hifzii, Tajweeda fi Tilaawaa galmeessa.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Contestant A Card */}
              <div className="bg-white p-5 rounded-xl border-2 border-emerald-500/30 shadow-xs space-y-4 relative">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">A</span>
                    <label className="text-xs font-extrabold text-[#1B365D]">Barataa A (Contestant A)</label>
                  </div>
                  <select
                    value={studentAId}
                    onChange={(e) => setStudentAId(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800"
                  >
                    {students.map((st) => (
                      <option key={st.id} value={st.id}>{st.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Sirriitti Qabachuu (Hifz Accuracy):</span>
                      <span className="text-emerald-600 font-black">{scoreA.hifz} / 100</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={scoreA.hifz}
                      onChange={(e) => setScoreA({ ...scoreA, hifz: Number(e.target.value) })}
                      className="w-full accent-emerald-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Ahkaama Tajweeda (Tajweed):</span>
                      <span className="text-emerald-600 font-black">{scoreA.tajweed} / 100</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={scoreA.tajweed}
                      onChange={(e) => setScoreA({ ...scoreA, tajweed: Number(e.target.value) })}
                      className="w-full accent-emerald-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Saffisa & Bareeduu Tilaawaa:</span>
                      <span className="text-emerald-600 font-black">{scoreA.tilaawaa} / 100</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={scoreA.tilaawaa}
                      onChange={(e) => setScoreA({ ...scoreA, tilaawaa: Number(e.target.value) })}
                      className="w-full accent-emerald-600"
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-[#1B365D]">
                    <span>Ida'ama Qabxii Barataa A:</span>
                    <span className="text-base font-black text-emerald-600">{totalScoreA} / 300</span>
                  </div>
                </div>
              </div>

              {/* Contestant B Card */}
              <div className="bg-white p-5 rounded-xl border-2 border-cyan-500/30 shadow-xs space-y-4 relative">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-600 text-white font-black text-xs flex items-center justify-center">B</span>
                    <label className="text-xs font-extrabold text-[#1B365D]">Barataa B (Contestant B)</label>
                  </div>
                  <select
                    value={studentBId}
                    onChange={(e) => setStudentBId(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800"
                  >
                    {students.map((st) => (
                      <option key={st.id} value={st.id}>{st.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Sirriitti Qabachuu (Hifz Accuracy):</span>
                      <span className="text-cyan-600 font-black">{scoreB.hifz} / 100</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={scoreB.hifz}
                      onChange={(e) => setScoreB({ ...scoreB, hifz: Number(e.target.value) })}
                      className="w-full accent-cyan-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Ahkaama Tajweeda (Tajweed):</span>
                      <span className="text-cyan-600 font-black">{scoreB.tajweed} / 100</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={scoreB.tajweed}
                      onChange={(e) => setScoreB({ ...scoreB, tajweed: Number(e.target.value) })}
                      className="w-full accent-cyan-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>Saffisa & Bareeduu Tilaawaa:</span>
                      <span className="text-cyan-600 font-black">{scoreB.tilaawaa} / 100</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={scoreB.tilaawaa}
                      onChange={(e) => setScoreB({ ...scoreB, tilaawaa: Number(e.target.value) })}
                      className="w-full accent-cyan-600"
                    />
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-[#1B365D]">
                    <span>Ida'ama Qabxii Barataa B:</span>
                    <span className="text-base font-black text-cyan-600">{totalScoreB} / 300</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Winner Announcement Card */}
            <div className="mt-6 bg-gradient-to-r from-[#1B365D] to-[#00A896] text-white p-4 rounded-xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <Medal className="w-8 h-8 text-amber-300 animate-pulse" />
                <div>
                  <span className="text-[10px] text-amber-300 font-extrabold uppercase tracking-widest block">Mo\'ataa Dorgommii (Winner)</span>
                  <h4 className="text-sm font-black text-white">
                    {totalScoreA > totalScoreB
                      ? `🏆 MO'ATAA: ${studentA?.name || 'Barataa A'} (${totalScoreA} pts)`
                      : totalScoreB > totalScoreA
                      ? `🏆 MO'ATAA: ${studentB?.name || 'Barataa B'} (${totalScoreB} pts)`
                      : `🤝 QABXII WAL-QIXA: ${totalScoreA} pts`}
                  </h4>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: QUESTIONS BANK VIEW */}
      {activeTab === 'questions_bank' && (
        <div className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-[#1B365D] uppercase tracking-wide">
              Tarree Gaaffiilee Dorgommii Qophaa'anii ({COMPETITION_QUESTIONS.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPETITION_QUESTIONS.map((q, i) => (
              <div key={q.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-[#1B365D] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Q{i + 1} • {q.categoryTitle}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">{q.juz}</span>
                </div>
                <h4 className="text-xs font-extrabold text-slate-800">{q.question}</h4>
                {q.arabicPrompt && (
                  <p className="font-serif text-base text-[#1B365D] bg-white p-2 rounded border border-slate-200 text-right" dir="rtl">
                    {q.arabicPrompt}
                  </p>
                )}
                <div className="pt-1 text-[11px] text-emerald-700 font-bold">
                  ✓ Deebii Sirrii: {q.options[q.correctAnswer]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: QURAN PAGE EXPLORER & PAGE RANGE QUESTIONS (FUULA 1 - 604 GUUTUU) */}
      {activeTab === 'page_lookup' && (
        <div className="pt-6 space-y-6">
          
          {/* Page Range Selection Header Box */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 p-6 rounded-2xl border border-emerald-200/80 shadow-xs space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-emerald-200/60 pb-4">
              <div>
                <h3 className="text-sm font-black text-[#1B365D] uppercase tracking-wide flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <span>QOPHEESSAA GAAFFII DAANGAA FUULAA (Page Range & 604 Page Questions)</span>
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-1">
                  "Fuula Hangan - Haga Asiitti" ykn Fuula tokko tokkoon (Fuula 1 hanga 604) filachuun gaaffiilee dorgommii fi qormaataa qopheessi.
                </p>
              </div>

              {/* Start & End Page Controls */}
              <div className="flex flex-wrap items-center gap-3 bg-white p-2.5 rounded-xl border border-emerald-200 shadow-2xs">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-extrabold text-[#1B365D]">Fuula Jalqabaa:</label>
                  <input
                    type="number"
                    min={1}
                    max={604}
                    value={startPage}
                    onChange={(e) => {
                      const val = Math.max(1, Math.min(604, Number(e.target.value) || 1));
                      handleGenerateRangeQuestions(val, endPage);
                    }}
                    className="w-16 bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-black text-[#1B365D] text-center"
                  />
                </div>

                <span className="text-xs font-black text-emerald-600">HANGA</span>

                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-extrabold text-[#1B365D]">Fuula Xumuraa:</label>
                  <input
                    type="number"
                    min={1}
                    max={604}
                    value={endPage}
                    onChange={(e) => {
                      const val = Math.max(1, Math.min(604, Number(e.target.value) || 1));
                      handleGenerateRangeQuestions(startPage, val);
                    }}
                    className="w-16 bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 text-xs font-black text-[#1B365D] text-center"
                  />
                </div>

                <button
                  onClick={() => handleGenerateRangeQuestions(startPage, endPage)}
                  className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-lg transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>QOPHEESSI</span>
                </button>
              </div>
            </div>

            {/* Quick Range Presets */}
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-slate-700 block">
                Daangaa Fuulaa Filatamaa (Quick Range Presets):
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Fuula 1 - 10 (Al-Faatihaa & Al-Baqarah)", s: 1, e: 10 },
                  { label: "Fuula 1 - 20 (Juz 1ffaa Guutuu)", s: 1, e: 20 },
                  { label: "Fuula 21 - 40 (Juz 2ffaa)", s: 21, e: 40 },
                  { label: "Fuula 582 - 604 (Juz 30ffaa Guutuu)", s: 582, e: 604 },
                  { label: "Fuula 1 - 604 (Qur'aana Guutuu)", s: 1, e: 604 }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleGenerateRangeQuestions(preset.s, preset.e)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      startPage === preset.s && endPage === preset.e
                        ? 'bg-[#1B365D] text-amber-300 border-[#1B365D] font-black shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generated Range Questions List */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white font-black text-xs flex items-center justify-center shadow-xs">
                  {endPage - startPage + 1} pgs
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#1B365D]">
                    Gaaffiilee Qophaa'an: Fuula {startPage} Hanga Fuula {endPage}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Daangaa pajiilee {endPage - startPage + 1} keessatti barattoota dorgomsiisuuf ykn qoruuf.
                  </p>
                </div>
              </div>

              <span className="bg-emerald-100 text-emerald-900 text-xs px-3 py-1 rounded-full font-black">
                {generatedRangeQuestions.length} Gaaffiilee Qormaat
              </span>
            </div>

            {/* Questions Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedRangeQuestions.map((gq) => (
                <div key={gq.num} className="bg-slate-50/80 p-5 rounded-xl border border-slate-200/80 space-y-3 relative hover:border-emerald-300 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="bg-[#1B365D] text-white text-[10px] font-black px-2.5 py-0.5 rounded-md">
                      {gq.type}
                    </span>
                    <span className="text-xs font-bold text-emerald-700">
                      Fuula {startPage} - {endPage}
                    </span>
                  </div>

                  <h5 className="text-xs font-extrabold text-[#1B365D] leading-snug">
                    {gq.title}
                  </h5>

                  <p className="text-xs text-slate-800 font-bold bg-white p-3 rounded-lg border border-slate-200">
                    "{gq.question}"
                  </p>

                  <div className="bg-emerald-50/70 p-3 rounded-lg text-[11px] text-slate-700 font-medium border border-emerald-200/50">
                    <strong className="text-emerald-800">Qajeelfama Barsiisaa:</strong> {gq.details}
                  </div>
                </div>
              ))}
            </div>

            {/* Single Page Interactive Detail & Direct Page Switcher (Fuula 1 - 604) */}
            <div className="pt-6 border-t border-slate-200 space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h5 className="text-xs font-black text-[#1B365D] uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>Ilaalcha Fuula Tokkoo Guutuu (Full Single Page Explorer: Fuula {selectedPageNum} / 604)</span>
                  </h5>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Juzii ykn Lakkoofsa Fuulaa (1-604) filachuun gaaffiilee fuula sanaa ilaali.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setSelectedPageNum(Math.max(1, selectedPageNum - 1))}
                    disabled={selectedPageNum <= 1}
                    className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-black disabled:opacity-40"
                  >
                    ◄ Duraa
                  </button>

                  <div className="flex items-center gap-1">
                    <span className="text-xs font-extrabold text-[#1B365D]">Fuula:</span>
                    <input
                      type="number"
                      min={1}
                      max={604}
                      value={selectedPageNum}
                      onChange={(e) => setSelectedPageNum(Math.max(1, Math.min(604, Number(e.target.value) || 1)))}
                      className="w-16 bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-black text-center text-[#1B365D]"
                    />
                  </div>

                  <button
                    onClick={() => setSelectedPageNum(Math.min(604, selectedPageNum + 1))}
                    disabled={selectedPageNum >= 604}
                    className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-black disabled:opacity-40"
                  >
                    Kaan ►
                  </button>
                </div>
              </div>

              {/* Juz Quick Jump Grid (Juz 1 to Juz 30) */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                <span className="text-[11px] font-extrabold text-slate-700 uppercase block">
                  Cehumsa Dafee Juzii (Quick Juz Jump 1-30):
                </span>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((juzNum) => {
                    const startP = (juzNum - 1) * 20 + (juzNum === 1 ? 1 : 2);
                    const isSelectedJuz = Math.ceil(selectedPageNum / 20.2) === juzNum;
                    return (
                      <button
                        key={juzNum}
                        onClick={() => setSelectedPageNum(startP)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold whitespace-nowrap transition-all cursor-pointer border ${
                          isSelectedJuz
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50'
                        }`}
                      >
                        Juz {juzNum}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Page Card Display */}
              <div className="bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/50 p-5 rounded-2xl border border-amber-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#1B365D] text-amber-300 font-black text-base flex items-center justify-center shadow-md">
                      {selectedPageNum}
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-[#1B365D]">
                        Fuula Safhaa {selectedPageNum}ffaa (Page {selectedPageNum} of 604)
                      </h4>
                      <p className="text-xs text-slate-600 font-bold">
                        Juzii {Math.min(30, Math.ceil(selectedPageNum / 20))}ffaa • Mushafa Madinaa Standard
                      </p>
                    </div>
                  </div>

                  <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs px-3 py-1 rounded-full font-black">
                    Page {selectedPageNum} / 604
                  </span>
                </div>

                {/* Specific Questions for selectedPageNum */}
                <div className="space-y-3 pt-1">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                    <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Gaaffii 1: Aayaa Jalqaba & Hifz Accuracy
                    </span>
                    <h5 className="text-xs font-extrabold text-[#1B365D]">
                      1. Fuula {selectedPageNum}ffaa irraa aayaa jalqabaa hafziidhaan eegali dubbisi?
                    </h5>
                    <p className="text-xs text-slate-600">
                      Barsiisaan/Ustaz barataan fuula {selectedPageNum}ffaa osoo Mushafa hin ilaalin sirriitti qara'uu madaala.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                    <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      Gaaffii 2: Surah & Juz Identification
                    </span>
                    <h5 className="text-xs font-extrabold text-[#1B365D]">
                      2. Fuula {selectedPageNum}ffaa irratti Surah fi Juzii kamtu argama?
                    </h5>
                    <p className="text-xs text-slate-600">
                      {selectedPageNum === 1
                        ? 'Surat Al-Faatihaa (Aayaa 1 - 7 guutuu)'
                        : selectedPageNum === 2
                        ? 'Surat Al-Baqarah (Aayaa 1 - 5)'
                        : selectedPageNum === 42
                        ? 'Surat Al-Baqarah (Aayatal Kursiyyi 255)'
                        : selectedPageNum === 582
                        ? 'Surat An-Naba (Aayaa 1 - 30)'
                        : selectedPageNum === 604
                        ? 'Surat Al-Ikhlaas, Al-Falaq, An-Naas'
                        : `Fuula ${selectedPageNum}ffaa Juzii ${Math.min(30, Math.ceil(selectedPageNum / 20))}ffaa keessatti argama.`}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                    <span className="text-[10px] font-black uppercase text-[#1B365D] bg-slate-100 px-2 py-0.5 rounded">
                      Gaaffii 3: Ahkaama Tajweed & Tilaawaa
                    </span>
                    <h5 className="text-xs font-extrabold text-[#1B365D]">
                      3. Seera Tajweeda Fuula {selectedPageNum}ffaa keessatti argamu tokko caqasi.
                    </h5>
                    <p className="text-xs text-slate-600">
                      Ahkaama Nun Saakina (Izhaar, Iqlaab, Idghaam, Ikhfaa) ykn Madda harfootaa madaali.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs font-extrabold text-emerald-800 border-t border-amber-200/50">
                  <span>✓ Karoora Barattootaa Shaahid Sheikh Mohammed</span>
                  <button
                    onClick={() => {
                      setStartPage(selectedPageNum);
                      setEndPage(Math.min(604, selectedPageNum + 10));
                      handleGenerateRangeQuestions(selectedPageNum, Math.min(604, selectedPageNum + 10));
                    }}
                    className="text-[#00A896] hover:underline cursor-pointer"
                  >
                    Fuula {selectedPageNum} Hanga {Math.min(604, selectedPageNum + 10)} Daangaa Qopheessi →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
