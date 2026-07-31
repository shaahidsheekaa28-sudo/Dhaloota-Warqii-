import React, { useState } from 'react';
import { HelpCircle, Search, MessageSquare, Sparkles, CheckCircle2, ChevronDown, ChevronUp, Plus, Send, BookOpen, Clock, Brain, RefreshCw, AlertCircle } from 'lucide-react';

interface QuestionItem {
  id: string;
  category: 'hifz' | 'murajaa' | 'time' | 'focus' | 'mutashabihat' | 'general';
  categoryLabel: string;
  question: string;
  answer: string;
  steps?: string[];
  askedBy?: string;
  isUserSubmitted?: boolean;
  date?: string;
}

const DEFAULT_QUESTIONS: QuestionItem[] = [
  {
    id: 'q1',
    category: 'hifz',
    categoryLabel: 'Hifzii fi Dagachuu',
    question: 'Hifziin haaraa na jalaa dagatamaa jira, maalan godha?',
    answer: 'Hifziin dafee dagatamuu sababoonni gurguddoon: Hifzii haaraa cimsanii irra deebi\'uu dhiisuu, Muraja\'aa guyyaa idilee dhiisuu fi ariitiin dubbisuudha.',
    steps: [
      'Fuula haaraa qabatte sana xaqqiiqaan si\'a 20-30 sagalee ol kaastee dubbisi.',
      'Dhiilga (Badii) fi wantoota qalbii si jallisan irraa fagaadhu.',
      'Fuula haaraa sana salaata farzii fi sunnaa keessatti qara\'uu aadaa godhadhu.',
      'Guyyaa lammataa fuula haaraa bira osso hin darbin kan kaleessaa si\'a 5 keessa deebii godhi.'
    ]
  },
  {
    id: 'q2',
    category: 'murajaa',
    categoryLabel: 'Muraja\'aa fi Tiqsuu',
    question: 'Yeroon Muraja\'aa fi Hifzii Haaraa wal simsiisuu dadhabe, tokko yoon hojjedhu inni kaan na jalaa badaa?',
    answer: 'Seera "1/3 fi 2/3" fayyadamuu qabda. Yeroo kee keessaa dhibbeentaa 70% Muraja\'aafi, 30% immoo Hifzii haaraaf oolchii.',
    steps: [
      'Ganaama subii booda yeroo sammuun qulqulluu ta\'u Hifzii Haaraa qabadhu.',
      'Gafaraa/Galgala yeroo boqonnaa Muraja\'aa fuula 10 ykn Juzii 0.5 keessa deebii godhi.',
      'Hifzii haaraa dhaabdee guyyaa 2-3f Muraja\'aa qofa irratti xiyyeeffachuun dogoggora miti!'
    ]
  },
  {
    id: 'q3',
    category: 'focus',
    categoryLabel: 'Xiyyeeffannaa fi Qalbii',
    question: 'Yeroo dubbisu hirribni na qaba ykn xiyyeeffannaan na jalaa badaa?',
    answer: 'Qur\'aana barachuun qabsoo Nasiiti. Hirribni fi dadhabbiin tooftaa Shaitanaatiin barataa duubatti deebisuuf ta\'uu danda\'a.',
    steps: [
      'Wuduu haaromsadhu, bakka qillensa gaarii fi ibsaa jabaa qabu taa\'i.',
      'Siree ykn bakka ciisichaa irratti osoo hin taane minjaala fi teessoo irratti ol jedhi taa\'i.',
      'Sagalee kee ol kaastee qara\'i; dubbisuu bira darbitee sagalee kee dhageeffachuun xiyyeeffannaa fida.',
      'Yoo hirribni si qabe daqiikaa 5 fageenya deemi, bishaan fuula kee dhiqadhuu deebi\'i.'
    ]
  },
  {
    id: 'q4',
    category: 'mutashabihat',
    categoryLabel: 'Aayatoota Wal-fakkaatan',
    question: 'Aayatoota wal fakkaatan (Mutashaabihaat) maaliin gargar baasee qabaddha?',
    answer: 'Aayatoonni wal fakkaatan gufuu barattoota baay\'eeti. Furmaanni isaa yaada fi mala addaa fayyadamuu dha.',
    steps: [
      'Mushafa tokko (Chapaa tokko) qofa fayyadamuu: Iji kee bakka aayanni itti argamtu ni yaadata.',
      'Aayatoota wal fakkaatan lamaan waraqaa irratti gargar barreesseedhi comparative godhi.',
      'Geessituu ykn garaagarummaa harfee (Surah A keessa X jira, Surah B keessa Y jira) yaadannoo godhadhu.',
      'Ustaza keetti aayatoota kana irra deebitee qara\'ii akka si sirreessu godhi.'
    ]
  },
  {
    id: 'q5',
    category: 'time',
    categoryLabel: 'Yeroo fi Sagantaa',
    question: 'Guyyaatti sa\'aatii meeqa Qur\'aanaaf kennuun gaariidha?',
    answer: 'Sagantaa Dhaloota Warqii keessatti guyyaatti sa\'aatii 1.5 hanga sa\'aatii 2 kennuun ga\'aadha.',
    steps: [
      'Sa\'aatii 1 Hifzii haaraaf (Daqiikaa 30 dubbisuu, Daqiikaa 30 sammuutti qabachuu).',
      'Sa\'aatii 1 Muraja\'aaf (Fuula 10 ykn Juzii 0.5 keessa deebiuu).',
      'Torbanitti guyyaa 5 hojjechuun Kamisa fi Jimaata boqonnaa qabaachuun hafuura siif kenna.'
    ]
  },
  {
    id: 'q6',
    category: 'general',
    categoryLabel: 'Niyyaa fi Dhaamsa',
    question: 'Yeroo tokko tokko abdiin na cutamaa, "Naaf hin qabatamu" jedheen sodaadaa?',
    answer: 'Kun Yaada dogoggoraati! Qur\'aana barachuun dandeettii sammuu qofa osoo hin taane Barakaa fi Rahmata Rabbhiti.',
    steps: [
      'Obsa qabaadhu: Daqiikaa tokkoon yoo siif qabamuu dhiise ajriin kee dachaa ta\'a.',
      'Du\'aa\'ii cimsadhu: "Yaa Rabbi Qur\'aana qalbii koof ibsaa godhi" jedhii kadhadhu.',
      'Barattoota biroo waliin dorgommii gaarii (Tanaafus) godhi.'
    ]
  }
];

export const StudentQASection: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionItem[]>(DEFAULT_QUESTIONS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('q1');
  
  // Custom Question Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newCategory, setNewCategory] = useState<QuestionItem['category']>('hifz');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = [
    { id: 'all', label: 'Gaffii Hunda' },
    { id: 'hifz', label: 'Hifzii fi Dagachuu' },
    { id: 'murajaa', label: 'Muraja\'aa' },
    { id: 'focus', label: 'Xiyyeeffannaa' },
    { id: 'mutashabihat', label: 'Mutashaabihaat' },
    { id: 'time', label: 'Sagantaa' },
    { id: 'general', label: 'Dhaamsa & Du\'aa\'ii' },
  ];

  const filteredQuestions = questions.filter((q) => {
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.steps && q.steps.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    // Smart automatic answer generator tailored to student query
    let autoAnswer = "Gaaffiin keessan milkaa'inaan amanamuun galmeeffamee jira. Qopheessaa Shaahid Sheikh Mohammed fi Ustazonni deebii bal'aa siif barreesu.";
    let autoSteps = [
      "Niyyaa kee qulqulleessi fi Rabbiin kadhadhu.",
      "Sagantaa kee dhaabbataan hordofi, guyyaa tokkos hin dhiisin.",
      "Ustaza kee mariisisuun gorsa dhuunfaa fudhadhu."
    ];

    const queryLower = newQuestionText.toLowerCase();
    if (queryLower.includes('dagachuu') || queryLower.includes('badaa') || queryLower.includes('yaadachuu')) {
      autoAnswer = "Hifziin dagatamuu danda'a. Furmaanni Guddaan Muraja'aa guyyaa idilee cimsachuu fi fuula haaraa sana salaata keessatti qara'uudha.";
      autoSteps = [
        "Kan kaleessaa si'a 5 keessa deebii godhi.",
        "Dhiilga fi wantoota qalbii booreessan irraa fagaadhu.",
        "Mushafa tokko qofa fayyadamuu aadaa godhadhu."
      ];
    } else if (queryLower.includes('hirriba') || queryLower.includes('dhibee') || queryLower.includes('dadhabuu')) {
      autoAnswer = "Hirribni fi dadhabbiin yeroo dubbisu dhufu qabsoo nafsiiti. Wuduu haaromsi fi teessoo gubbaa ol jedhitii qara'i.";
      autoSteps = [
        "Sagalee kee ol kaastee qara'i.",
        "Daqaikaa 5 fageenya deemitii bishaan fuula dhiqadhu.",
        "Yeroo sammuun qulqulluu ta'u (Ganaama subii booda) fayyadamuu try godhi."
      ];
    }

    const newQItem: QuestionItem = {
      id: `user_q_${Date.now()}`,
      category: newCategory,
      categoryLabel: categories.find(c => c.id === newCategory)?.label || 'Gaaffii Barataa',
      question: newQuestionText,
      answer: autoAnswer,
      steps: autoSteps,
      askedBy: newStudentName.trim() || 'Barataa Qur\'aana',
      isUserSubmitted: true,
      date: 'Har\'a',
    };

    setQuestions([newQItem, ...questions]);
    setExpandedId(newQItem.id);
    setNewQuestionText('');
    setNewStudentName('');
    setSubmitSuccess(true);

    setTimeout(() => {
      setSubmitSuccess(false);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200/80 my-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1B365D] to-[#00A896] text-white flex items-center justify-center shadow-md">
            <HelpCircle className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-[#1B365D]">
                GAAFFII FI DEEBII BARATTOOTAA (Student Q&A & Help Center)
              </h2>
              <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                Deebii Rakkinaa
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Barattoonni rakkina Hifzii, Muraja'aa fi Sagantaa irratti isaan qunnamuuf deebii fi furmaata amansiisaa argatu.
            </p>
          </div>
        </div>

        {/* Ask Question Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#00A896] hover:bg-[#008f80] text-white px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-[1.02] shrink-0"
        >
          <MessageSquare className="w-4 h-4 text-amber-300" />
          <span>GAAFFII KEESSAN GAAFADHAA</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="pt-6 pb-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1B365D] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Barbaadi (Search Q&A)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#00A896]"
            />
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-600">Gaaffiin barbaaddan hin argamne.</p>
            <p className="text-[11px] text-slate-400 mt-1">
              "Gaaffii Keessan Gaafadhaa" kan jedhu tuquun gaaffii keessan barreessaa.
            </p>
          </div>
        ) : (
          filteredQuestions.map((qItem) => {
            const isExpanded = expandedId === qItem.id;
            return (
              <div
                key={qItem.id}
                className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-[#00A896] bg-slate-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                {/* Question Header Accordion Toggle */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : qItem.id)}
                  className="w-full text-left p-4 flex items-start justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#1B365D]/10 text-[#1B365D] flex items-center justify-center shrink-0 mt-0.5">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-[#00A896]/10 text-[#00A896] text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                          {qItem.categoryLabel}
                        </span>
                        {qItem.isUserSubmitted && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                            Barataa: {qItem.askedBy}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs md:text-sm font-extrabold text-[#1B365D] leading-snug">
                        {qItem.question}
                      </h3>
                    </div>
                  </div>

                  <div className="text-slate-400 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-[#00A896]" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Answer Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-100 text-xs text-slate-700 space-y-3">
                    {/* Main Answer text */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                      <div className="flex items-center gap-2 text-[#00A896] font-bold mb-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Deebii & Furmaata (Solution)</span>
                      </div>
                      <p className="text-slate-800 font-medium leading-relaxed">
                        {qItem.answer}
                      </p>
                    </div>

                    {/* Step by step practical action items */}
                    {qItem.steps && qItem.steps.length > 0 && (
                      <div className="pl-2 space-y-2">
                        <span className="text-[11px] font-extrabold text-[#1B365D] uppercase tracking-wide block">
                          Tarkaanfiilee Raawwatamuu Qaban (Action Steps):
                        </span>
                        <div className="grid grid-cols-1 gap-2">
                          {qItem.steps.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-2 bg-slate-100/80 p-2.5 rounded-lg border border-slate-200/60">
                              <span className="w-5 h-5 rounded-full bg-[#1B365D] text-white text-[10px] font-black flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <span className="text-xs font-semibold text-slate-700 pt-0.5">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Submit Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-extrabold text-[#1B365D]">
                  Gaaffii Keessan Gaafadhaa
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {submitSuccess ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#00A896] mx-auto animate-bounce" />
                <h4 className="text-sm font-extrabold text-[#1B365D]">Gaaffiin Keessan Galmeeffamee Jira!</h4>
                <p className="text-xs text-slate-500">
                  Deebiin fi furmaanni tarree gaaffiilee keessatti isiniif dhiyaateera.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddQuestion} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1B365D] mb-1">
                    Maqaa Keessan (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="E.g., Shaahid Sheikh ykn Barataa"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#00A896]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B365D] mb-1">
                    Gosa Rakkinaa / Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-[#00A896]"
                  >
                    <option value="hifz">Hifzii fi Dagachuu</option>
                    <option value="murajaa">Muraja'aa</option>
                    <option value="focus">Xiyyeeffannaa fi Hirriba</option>
                    <option value="mutashabihat">Aayatoota Wal-fakkaatan (Mutashaabihaat)</option>
                    <option value="time">Yeroo fi Sagantaa</option>
                    <option value="general">Gorsa & Dhaamsa General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B365D] mb-1">
                    Gaaffii Keessan Tarreessaa (Describe Your Problem) *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="E.g., Fuula 10 yeroon muraja'aa godhu dogoggorri na jalaatti baay'ata, maalan godha? ykn Hirribni na qaba..."
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium text-slate-800 focus:ring-2 focus:ring-[#00A896]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Dhiisi
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#00A896] hover:bg-[#008f80] text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>GAAFFII ERGI</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
