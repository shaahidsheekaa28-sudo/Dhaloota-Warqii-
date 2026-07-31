import { ScheduleWeek, Student, MonthItem } from '../types';

export const AUTHOR_NAME = "Shaahid Sheikh Mohammed";
export const APP_DOC_TITLE = "DHALOOTA WARQII: SAGANTAA HIFZII FI MURAJA'AA QUR'AANA BARATTOOTAA";

export const INTRO_TEXT = "Sagantaa Baatii 3ffaa Hagayya 2 irraa kaasee. Waliigala guyyoota hojii 60 (Baatiitti guyyoota hojii 20, torbanitti guyyaa 5; Kamisa fi Jimaata boqonnaa).";

export const RULES_CALLOUT = {
  title: "🔥 QAJELFAMA FI HERREGA DEEMSAA (5 Days/Week):",
  rules: [
    "1. Guyyaa Hojii: Torbanitti guyyaa 5 (Wiixata, Kibxata, Roobii, Sanbata, Dilbata).",
    "2. Boqonnaa: Kamiisa fi Jimaata guyyoota boqonnaati.",
    "3. Baatiitti Guyyaa Hojii 20: Ji'a 1ffaa (Hagayya - 20 Days), Ji'a 2ffaa (Qaammee & Meskerem - 20 Days), Ji'a 3ffaa (Tikimt - 20 Days).",
    "4. Safara Guyyaatti: Fuula 1 (Fuula 60 deemu), Fuula 2 (Fuula 120 deemu), Fuula 0.5 (Fuula 30 deemu)."
  ]
};

export const ADVICE_AND_NASIHA = {
  headerTitle: "GORSAA FI NASIIHAA BARATAA QUR’AANAATIIF",
  headerSubtitle: "",
  quote: "Yaa obboleessa koo!\nyaa obboleettii too! Qur'aana barachuun, Hifzii godhuun fi Tilaawaa itti fufuun ni'maa (qabeenya) guutuu Rabbiin sammuu fi qalbii keetiif kenneedha. Nasiihan kun imala kee bareechisuuf fi jabaattee akka itti fuftuuf kan siif qophaa'edha.",
  sections: [
    {
      id: "1",
      number: "📌 1",
      title: "Niyyaa Kee Qulqulleessi (Ikhlaasa)",
      cardTitle: "Rabbii kee Qofaaf Jecha Baradhu",
      cardBody: "Waa hunda dura Niyyaa kee qulqulleessi. Qur'aana kan barattuuf akkasumaas hifzii kan gootuuf faayidaa addunyaatiif, namni akka si faarsuuf yookaan 'Haafiza' akka siin jedhaniif osoo hin taane, Rabbi kee biratti sadarkaa ol'aanaa argachuuf fi Rahmata Isaa barbaduuf qofa haa ta'u. Niyyaan qulqulluun barakaa guddaa siif fida."
    },
    {
      id: "2",
      number: "📌 2",
      title: "Yeroo Kee Murasaa fi Dhaabbataas Godhi",
      cardTitle: "Sagantaa Dhaabbataa Qabaadhu",
      cardBody: "Hojiin Rabbi biratti Akkaan jaalatamaa ta’e kan dhaabbataan raawwatamudha. Guyyaatti fuula tokkos ta'ee walakkaa, sa'aatii murtaa'e irratti dhaabbataan dubbisuu fi hifzii godhuu aadaa godhadhu. \"Boruun hojjedha\" jettee har'a hin dhiisin."
    },
    {
      id: "3",
      number: "📌 3",
      title: "Muraja'aa (Review) Irratti Cimi",
      cardTitle: "Wanta Haaraa Caalaa Kan Qabatte Tiqsi",
      cardBody: "Qur’aana hifzii gochuu caalaa kan hardha qabatte sana qabachuun (Muraja'aan) haalaan ulfaata. Akka Ergamaan Rabbii (S.A.W) jedhanitti, Qur'aanni gaala hidhaa irraa baatu caalaa dafee badada. Kanaaf, guyyaa hundaa fulaa haaraa barnootaa dura, kan kaatte sana keessa deebii godhi."
    },
    {
      id: "4",
      number: "📌 4",
      title: "Dunaabaa fi Dhiilga Irraa Fagaadhu",
      cardTitle: "Qalbii Kee Nuuriin Guudhi",
      cardBody: "Qur'aanni Nuuri (Ibsaa) Rabbii irraa ta'eedha. Nuuriin Rabbii immoo qalbii badii fi dunaabaan (cubbuun) xuraa'e keessa hin qubatu. Ija kee, arraba kee fi qalbii kee wanta haraam irraa eeggadhu; kunis hifziin kee akka dafee qabatamu fi qalbii keetti hafa ta'u si gargaara."
    },
    {
      id: "5",
      number: "📌 5",
      title: "Obsa fi Kutannoo Qabaadhu",
      cardTitle: "Gufuuttan Abdii Hin Kutatin",
      cardBody: "Yeroo tokko tokko fuulli tokko dafee siif qabamuu dhiisuu danda'a. Yeroo kana abdii kutachuu hin qabdu. Arraba kee itti deddeebisuun kee qofti ajrii guddaa siif barreessa. Obsi fi jabaadhu, Rabbiin warra obsa qabu waliin jira."
    },
    {
      id: "6",
      number: "📌 6",
      title: "Du'aa'ii Cimsadhu",
      cardTitle: "Kalamni Rabbii Kadhaadhaan Siif Salphaata",
      cardBody: "Dandeettiin kan Rabbhiti. Kadhannaa (Du'aa'ii) kee cimsadhu: \"Yaa Rabbi Qur'aana qalbii tiyyaaf nuuri fi boqonnaa naaf godhi, hifzii isaas naaf salphisi\" jedhii garaan gubataa Rabbi kee kadhadhu."
    }
  ],
  duaa: {
    title: "🤲 Du'aa'ii Barataa Qur'aanaatifi",
    body: "\"Yaa Rabbi! Kalamni Kee Qur'aana Kabajamaa kun Qalbii teenyaaf Ibsee, Jireenya teenyaaf Faaya, Borus Guyyaa Qiyamaa Shafa'aa kan nuuf ta'u nuuf godhi. Barattoota keennaafis Hifzii fi Fahmii salphaa godhiif!\""
  },
  footerNote: "🚀 Kalamni Rabbii boqonnaa qalbii ti; har'uma cimsadhuu itti fufi!"
};

export const MOTIVATIONAL_MESSAGES = {
  quranStudent: {
    title: "Dhaamsa Kaka'umsaa: Yaa Barataa Qur'aana, Garaa Jabaadhu!",
    quote: "Kalamni Rabbii boqonnaa qalbii fi faaya jireenyaati; funyaan fuuldura keetiif fuula tokko dubbisuunis tarkaanfii gara Jannataatti si geessudha!",
    intro: "Yaa obboleessa ko fi yaa obboleetti ko kan Qura'aana barattu! Wanti ati harka keetti qabatte kun waa barruu biraa miti; Kalaama Rabbii gubbaa dachii irratti bu'eedha. Rabbiin kee zaalima hunda keessaa si filatee, arraba kee irratti ayata Isaa akka dubbistu si godhe. Kun qofaniyyuu ni'maa (qabeenya) guddaadha!",
    points: [
      {
        title: "Hifziin Barakaadha",
        body: "Fuula tokko hifzii gochuuf yeroo gubdu san, umrii kee irratti barakaa ida'aa jirta. Qura'aana waliin yeroo dabarsite hundatti yeroon kee badhaadha."
      },
      {
        title: "Dadhabbiin Har'aa Faaya Boruuti",
        body: "Muraja'aan si dadhabsiisaa? Hifziin siif ulfaataa? Sabrii godhi! Guyyaa Qiyamaa yeroo aayyoo fi aabbaan kee gonfoo fooyya'aa (crown of light) uffatanii gammadan, dadhabbiin kun hundi siirraa irraanfatama."
      },
      {
        title: "Itti Fufi, Hin Dhiisin",
        body: "\"Har'a naaf qabamuun dide\" jettee fuula Qura'aana hin cufin. Arraba kee kan deddeebisee dubbisu sanaafuu ajriin (sawaabni) dachaa dachaadhan barreeffamaa jira."
      },
      {
        title: "Sadarkaan Kee Ol Ka'aa Jira",
        body: "Jannata keessatti \"Iqra' warqa...\" (Dubbisi, ol kuffi) jedhama. Fuula dubbiste fi hifzi goote hundaan sadarkaan kee samii fi dachii jidduu ol ka'a!"
      }
    ],
    closing: "🚀 Yaa barataa Qura'aana! Obsa fi kutannoo qabadhu; har'a fuula tokko, boru fuula biraa jechaa galma kee 'Hafiiza' ta'uutti dhihaachaa jirta. Kalamni Rabbii qalbii kee keessatti ibsaa ta'ee haa hafu!"
  },
  goalReaching: {
    title: "Kaayyo Kee Bira Gahuuf Ka'i!",
    quote: "Mul'ata kee bira gahuuf garaa jabeadhu; gufuun karaa irratti si qunnamtus akkuma dhiiteetti dabrati!",
    intro: "Jireenya keessatti wanti guddaan nama milkeessu dandeettii qofa miti; kutannoo fi amantaa keessa kee jiruudha. Milkaa'inni wanta galgala itti raftan qofa miti, wanta ganama ka'aniitii garaan gubataa itti imalluudha.",
    points: [
      {
        title: "Tarkaanfii Xiqqaa, Bu'aa Guddaa",
        body: "Guyyaa hundaa tarkaanfiin xiqqaan ati kaayyo keetiif fudhattu, dhuma irratti gara galma guddaatti si geessiti. Har'uma wanta dandeessu jalqabi; eeggannoon yeroo gubatti."
      },
      {
        title: "Gufuun Barumsa",
        body: "Imala kee keessatti gufuun yoo si qunname, sirriitti garagallee ilaaluu dha malee gadduun hin jiru. Kufuun kufaatii miti; ka'uu dhiisuudha kufaatiin. Kuftee ka'uu kee keessatti jabina addaatu uumama."
      },
      {
        title: "Egeree kee Akkam Ta'uu Feeta?",
        body: "Wanta har'a hojjattu hundummaa isaatiin eger/abdii keetiif bu'uura kaa'aa jirta. Yeroo kee wanta gatii siif qabu irratti oolchi."
      },
      {
        title: "Sammuu Kee Amansiisi",
        body: "Wanti namni biraa sirraa eegu dhimma kee miti; dandeettii kee keessoo kan beeku sumuma. \"Ani ni danda'a!\" jedhitii sammuu kee amansiisi."
      }
    ],
    closing: "🚀 Kudhan kuftee kurnaffaa irratti ka'uun gootummaadha. Har'uma sa'aatii fi daqiiqaa kanaan tarkaanfii kee jalqabi; egeren kee harka kee keessa jiraa!"
  }
};

export const INITIAL_MONTHS: MonthItem[] = [
  { key: 'hagayya', title: "Ji'a 1ffaa (Hagayya)", shortName: "Ji'a 1: Hagayya", days: 20 },
  { key: 'qaammee_meskerem', title: "Ji'a 2ffaa (Qaammee & Meskerem)", shortName: "Ji'a 2: Qaammee & Meskerem", days: 20 },
  { key: 'tikimt', title: "Ji'a 3ffaa (Tikimt)", shortName: "Ji'a 3: Tikimt", days: 20 },
];

export const INITIAL_STUDENTS: Student[] = [
  { id: '1', name: "Mu'aaz Waziir", programType: 'Tilaawaa', dailyRate: 'Fuula 1', startHifzPage: 302, currentHifzPage: 242, targetHifzPage: 1, color: '#1B365D' },
  { id: '2', name: 'Ibrahim Muhammad', programType: 'Tilaawaa', dailyRate: 'Fuula 1', startHifzPage: 502, currentHifzPage: 442, targetHifzPage: 1, color: '#00A896' },
  { id: '3', name: 'Kaalid Abdurahmaan', programType: 'Tilaawaa', dailyRate: 'Fuula 1', startHifzPage: 402, currentHifzPage: 342, targetHifzPage: 1, color: '#2B6CB0' },
  { id: '4', name: 'Maahir Jamaal', programType: 'Tilaawaa', dailyRate: 'Fuula 2', startHifzPage: 302, currentHifzPage: 182, targetHifzPage: 1, color: '#C53030' },
  { id: '5', name: 'Abdulhakiim', programType: 'Tilaawaa', dailyRate: 'Fuula 0.5', startHifzPage: 553, currentHifzPage: 523, targetHifzPage: 1, color: '#DD6B20' },
  { id: '6', name: 'Waliid', programType: 'Hifzii', dailyRate: 'Fuula 1', startHifzPage: 402, currentHifzPage: 342, targetHifzPage: 1, color: '#319795' },
  { id: '7', name: 'Abdurashiid', programType: 'Hifzii', dailyRate: 'Fuula 1', startHifzPage: 272, currentHifzPage: 212, targetHifzPage: 1, color: '#805AD5' },
  { id: '8', name: 'Maahii Roobaa', programType: 'Hifzii', dailyRate: 'Fuula 0.5', startHifzPage: 572, currentHifzPage: 542, targetHifzPage: 1, color: '#D69E2E' },
  { id: '9', name: 'Bilaal Xaahaa', programType: 'Hifzii', dailyRate: 'Fuula 0.5', startHifzPage: 572, currentHifzPage: 542, targetHifzPage: 1, color: '#3182CE' },
  { id: '10', name: 'Faaruq Keeyraddiin', programType: 'Hifzii', dailyRate: 'Fuula 1', startHifzPage: 572, currentHifzPage: 512, targetHifzPage: 1, color: '#E53E3E' },
  { id: '11', name: 'Nadhii Haassan', programType: 'Hifzii', dailyRate: 'Fuula 0.5', startHifzPage: 574, currentHifzPage: 544, targetHifzPage: 1, color: '#D69E2E' },
  { id: '12', name: 'Nasraddiin Juneeydii', programType: 'Hifzii', dailyRate: 'Fuula 0.5', startHifzPage: 582, currentHifzPage: 552, targetHifzPage: 1, color: '#38A169' },
  { id: '13', name: 'Ahmed Jundii', programType: 'Hifzii', dailyRate: 'Fuula 0.5', startHifzPage: 582, currentHifzPage: 552, targetHifzPage: 1, color: '#4FD1C5' },
  { id: '14', name: 'Birraa', programType: 'Hifzii', dailyRate: 'Fuula 1', startHifzPage: 502, currentHifzPage: 442, targetHifzPage: 1, color: '#4A5568' },
  { id: '15', name: 'Kaalid', programType: 'Hifzii', dailyRate: 'Fuula 1', startHifzPage: 522, currentHifzPage: 462, targetHifzPage: 1, color: '#63B3ED' },
  { id: '16', name: 'Ramadan', programType: 'Hifzii', dailyRate: 'Fuula 1', startHifzPage: 522, currentHifzPage: 462, targetHifzPage: 1, color: '#B7791F' },
  { id: '17', name: 'Musab', programType: 'Hifzii', dailyRate: 'Fuula 1', startHifzPage: 531, currentHifzPage: 471, targetHifzPage: 1, color: '#9F7AEA' },
  { id: '18', name: 'Abdallaa', programType: 'Hifzii', dailyRate: 'Fuula 1', startHifzPage: 531, currentHifzPage: 471, targetHifzPage: 1, color: '#ED64A6' },
  { id: '19', name: 'Hamdii', programType: 'Hifzii', dailyRate: 'Fuula 1', startHifzPage: 531, currentHifzPage: 471, targetHifzPage: 1, color: '#667EEA' },
];

export const INITIAL_WEEKS: ScheduleWeek[] = [
  // --- MONTH 1: JI'A 1FFAA (HAGAYYA) ---
  {
    id: 'm1_t1',
    title: "1. JI'A 1FFAA (HAGAYYA): TORBAN 1FFAA (GUYYAA HOJII 1 – 5)",
    monthKey: 'hagayya',
    headers: ["Maqaa Barataa", "Gosti Sagantaa", "Wiixata (G1)", "Kibxata (G2)", "Roobii (G3)", "Sanbata (G4)", "Dilbata (G5)"],
    rows: [
      { id: 'm1t1_1', studentName: "Mu'aaz Waziir", type: 'Tilaawaa', values: ["301", "300", "299", "298", "297"] },
      { id: 'm1t1_2', studentName: "Ibrahim Muhammad", type: 'Tilaawaa', values: ["501", "500", "499", "498", "497"] },
      { id: 'm1t1_3', studentName: "Kaalid Abdurahmaan", type: 'Tilaawaa', values: ["401", "400", "399", "398", "397"] },
      { id: 'm1t1_4', studentName: "Maahir Jamaal", type: 'Tilaawaa', values: ["300–301", "298–299", "296–297", "294–295", "292–293"] },
      { id: 'm1t1_5', studentName: "Abdulhakiim", type: 'Tilaawaa', values: ["553", "552.5", "552", "551.5", "551"] },
      { id: 'm1t1_6', studentName: "Waliid", type: 'Hifzii', values: ["401", "400", "399", "398", "397"] },
      { id: 'm1t1_7', studentName: "Abdurashiid", type: 'Hifzii', values: ["271", "270", "269", "268", "267"] },
      { id: 'm1t1_8', studentName: "Maahii Roobaa", type: 'Hifzii', values: ["572", "571.5", "571", "570.5", "570"] },
      { id: 'm1t1_9', studentName: "Bilaal Xaahaa", type: 'Hifzii', values: ["572", "571.5", "571", "570.5", "570"] },
      { id: 'm1t1_10', studentName: "Faaruq Keeyraddiin", type: 'Hifzii', values: ["571", "570", "569", "568", "567"] },
      { id: 'm1t1_11', studentName: "Nadhii Haassan", type: 'Hifzii', values: ["574", "573.5", "573", "572.5", "572"] },
      { id: 'm1t1_12', studentName: "Nasraddiin Juneeydii", type: 'Hifzii', values: ["582", "581.5", "581", "580.5", "580"] },
      { id: 'm1t1_13', studentName: "Ahmed Jundii", type: 'Hifzii', values: ["582", "581.5", "581", "580.5", "580"] },
      { id: 'm1t1_14', studentName: "Birraa", type: 'Hifzii', values: ["501", "500", "499", "498", "497"] },
      { id: 'm1t1_15', studentName: "Kaalid", type: 'Hifzii', values: ["521", "520", "519", "518", "517"] },
      { id: 'm1t1_16', studentName: "Ramadan", type: 'Hifzii', values: ["521", "520", "519", "518", "517"] },
      { id: 'm1t1_17', studentName: "Musab", type: 'Hifzii', values: ["530", "529", "528", "527", "526"] },
      { id: 'm1t1_18', studentName: "Abdallaa", type: 'Hifzii', values: ["530", "529", "528", "527", "526"] },
      { id: 'm1t1_19', studentName: "Hamdii", type: 'Hifzii', values: ["530", "529", "528", "527", "526"] },
    ]
  },
  {
    id: 'm1_t2',
    title: "2. JI'A 1FFAA (HAGAYYA): TORBAN 2FFAA (GUYYAA HOJII 6 – 10)",
    monthKey: 'hagayya',
    headers: ["Maqaa Barataa", "Gosti Sagantaa", "Wiixata (G6)", "Kibxata (G7)", "Roobii (G8)", "Sanbata (G9)", "Dilbata (G10)"],
    rows: [
      { id: 'm1t2_1', studentName: "Mu'aaz Waziir", type: 'Tilaawaa', values: ["296", "295", "294", "293", "292"] },
      { id: 'm1t2_2', studentName: "Ibrahim Muhammad", type: 'Tilaawaa', values: ["496", "495", "494", "493", "492"] },
      { id: 'm1t2_3', studentName: "Kaalid Abdurahmaan", type: 'Tilaawaa', values: ["396", "395", "394", "393", "392"] },
      { id: 'm1t2_4', studentName: "Maahir Jamaal", type: 'Tilaawaa', values: ["290–291", "288–289", "286–287", "284–285", "282–283"] },
      { id: 'm1t2_5', studentName: "Abdulhakiim", type: 'Tilaawaa', values: ["550.5", "550", "549.5", "549", "548.5"] },
      { id: 'm1t2_6', studentName: "Waliid", type: 'Hifzii', values: ["396", "395", "394", "393", "392"] },
      { id: 'm1t2_7', studentName: "Abdurashiid", type: 'Hifzii', values: ["266", "265", "264", "263", "262"] },
      { id: 'm1t2_8', studentName: "Maahii Roobaa", type: 'Hifzii', values: ["569.5", "569", "568.5", "568", "567.5"] },
      { id: 'm1t2_9', studentName: "Bilaal Xaahaa", type: 'Hifzii', values: ["569.5", "569", "568.5", "568", "567.5"] },
      { id: 'm1t2_10', studentName: "Faaruq Keeyraddiin", type: 'Hifzii', values: ["566", "565", "564", "563", "562"] },
      { id: 'm1t2_11', studentName: "Nadhii Haassan", type: 'Hifzii', values: ["571.5", "571", "570.5", "570", "569.5"] },
      { id: 'm1t2_12', studentName: "Nasraddiin Juneeydii", type: 'Hifzii', values: ["579.5", "579", "578.5", "578", "577.5"] },
      { id: 'm1t2_13', studentName: "Ahmed Jundii", type: 'Hifzii', values: ["579.5", "579", "578.5", "578", "577.5"] },
      { id: 'm1t2_14', studentName: "Birraa", type: 'Hifzii', values: ["496", "495", "494", "493", "492"] },
      { id: 'm1t2_15', studentName: "Kaalid", type: 'Hifzii', values: ["516", "515", "514", "513", "512"] },
      { id: 'm1t2_16', studentName: "Ramadan", type: 'Hifzii', values: ["516", "515", "514", "513", "512"] },
      { id: 'm1t2_17', studentName: "Musab", type: 'Hifzii', values: ["525", "524", "523", "522", "521"] },
      { id: 'm1t2_18', studentName: "Abdallaa", type: 'Hifzii', values: ["525", "524", "523", "522", "521"] },
      { id: 'm1t2_19', studentName: "Hamdii", type: 'Hifzii', values: ["525", "524", "523", "522", "521"] },
    ]
  },
  {
    id: 'm1_t3',
    title: "3. JI'A 1FFAA (HAGAYYA): TORBAN 3FFAA & 4FFAA (GUYYAA HOJII 11 – 20 / DHUMA HAGAYYAA)",
    monthKey: 'hagayya',
    headers: ["Maqaa Barataa", "Gosti Sagantaa", "Guyyaa 11", "Guyyaa 13", "Guyyaa 15", "Guyyaa 18", "Guyyaa 20 (Dhuma Hagayyaa)"],
    rows: [
      { id: 'm1t3_1', studentName: "Mu'aaz Waziir", type: 'Tilaawaa', values: ["291", "289", "287", "284", "282 (Gaha)"] },
      { id: 'm1t3_2', studentName: "Ibrahim Muhammad", type: 'Tilaawaa', values: ["491", "489", "487", "484", "482 (Gaha)"] },
      { id: 'm1t3_3', studentName: "Kaalid Abdurahmaan", type: 'Tilaawaa', values: ["391", "389", "387", "384", "382 (Gaha)"] },
      { id: 'm1t3_4', studentName: "Maahir Jamaal", type: 'Tilaawaa', values: ["280–281", "276–277", "272–273", "266–267", "262 (Gaha)"] },
      { id: 'm1t3_5', studentName: "Abdulhakiim", type: 'Tilaawaa', values: ["548", "547", "546", "544.5", "543 (Gaha)"] },
      { id: 'm1t3_6', studentName: "Waliid", type: 'Hifzii', values: ["391", "389", "387", "384", "382 (Gaha)"] },
      { id: 'm1t3_7', studentName: "Abdurashiid", type: 'Hifzii', values: ["261", "259", "257", "254", "252 (Gaha)"] },
      { id: 'm1t3_8', studentName: "Maahii Roobaa", type: 'Hifzii', values: ["567", "566", "565", "563.5", "562 (Gaha)"] },
      { id: 'm1t3_9', studentName: "Bilaal Xaahaa", type: 'Hifzii', values: ["567", "566", "565", "563.5", "562 (Gaha)"] },
      { id: 'm1t3_10', studentName: "Faaruq Keeyraddiin", type: 'Hifzii', values: ["561", "559", "557", "554", "552 (Gaha)"] },
      { id: 'm1t3_11', studentName: "Nadhii Haassan", type: 'Hifzii', values: ["569", "568", "567", "565.5", "564 (Gaha)"] },
      { id: 'm1t3_12', studentName: "Nasraddiin Juneeydii", type: 'Hifzii', values: ["577", "576", "575", "573.5", "572 (Gaha)"] },
      { id: 'm1t3_13', studentName: "Ahmed Jundii", type: 'Hifzii', values: ["577", "576", "575", "573.5", "572 (Gaha)"] },
      { id: 'm1t3_14', studentName: "Birraa", type: 'Hifzii', values: ["491", "489", "487", "484", "482 (Gaha)"] },
      { id: 'm1t3_15', studentName: "Kaalid", type: 'Hifzii', values: ["511", "509", "507", "504", "502 (Gaha)"] },
      { id: 'm1t3_16', studentName: "Ramadan", type: 'Hifzii', values: ["511", "509", "507", "504", "502 (Gaha)"] },
      { id: 'm1t3_17', studentName: "Musab", type: 'Hifzii', values: ["520", "518", "516", "513", "511 (Gaha)"] },
      { id: 'm1t3_18', studentName: "Abdallaa", type: 'Hifzii', values: ["520", "518", "516", "513", "511 (Gaha)"] },
      { id: 'm1t3_19', studentName: "Hamdii", type: 'Hifzii', values: ["520", "518", "516", "513", "511 (Gaha)"] },
    ]
  },

  // --- MONTH 2: JI'A 2FFAA (QAAMMEE & MESKEREM) ---
  {
    id: 'm2_t1',
    title: "4. JI'A 2FFAA (QAAMMEE & MESKEREM): GUYYAA HOJII 21 – 40",
    monthKey: 'qaammee_meskerem',
    headers: ["Maqaa Barataa", "Gosti Sagantaa", "Guyyaa 21", "Guyyaa 25", "Guyyaa 30", "Guyyaa 35", "Guyyaa 40 (Dhuma Meskerem)"],
    rows: [
      { id: 'm2t1_1', studentName: "Mu'aaz Waziir", type: 'Tilaawaa', values: ["281", "277", "272", "267", "262 (Gaha)"] },
      { id: 'm2t1_2', studentName: "Ibrahim Muhammad", type: 'Tilaawaa', values: ["481", "477", "472", "467", "462 (Gaha)"] },
      { id: 'm2t1_3', studentName: "Kaalid Abdurahmaan", type: 'Tilaawaa', values: ["381", "377", "372", "367", "362 (Gaha)"] },
      { id: 'm2t1_4', studentName: "Maahir Jamaal", type: 'Tilaawaa', values: ["260–261", "252–253", "242–243", "232–233", "222 (Gaha)"] },
      { id: 'm2t1_5', studentName: "Abdulhakiim", type: 'Tilaawaa', values: ["542.5", "540.5", "538", "535.5", "533 (Gaha)"] },
      { id: 'm2t1_6', studentName: "Waliid", type: 'Hifzii', values: ["381", "377", "372", "367", "362 (Gaha)"] },
      { id: 'm2t1_7', studentName: "Abdurashiid", type: 'Hifzii', values: ["251", "247", "242", "237", "232 (Gaha)"] },
      { id: 'm2t1_8', studentName: "Maahii Roobaa", type: 'Hifzii', values: ["561.5", "559.5", "557", "554.5", "552 (Gaha)"] },
      { id: 'm2t1_9', studentName: "Bilaal Xaahaa", type: 'Hifzii', values: ["561.5", "559.5", "557", "554.5", "552 (Gaha)"] },
      { id: 'm2t1_10', studentName: "Faaruq Keeyraddiin", type: 'Hifzii', values: ["551", "547", "542", "537", "532 (Gaha)"] },
      { id: 'm2t1_11', studentName: "Nadhii Haassan", type: 'Hifzii', values: ["563.5", "561.5", "559", "556.5", "554 (Gaha)"] },
      { id: 'm2t1_12', studentName: "Nasraddiin Juneeydii", type: 'Hifzii', values: ["571.5", "569.5", "567", "564.5", "562 (Gaha)"] },
      { id: 'm2t1_13', studentName: "Ahmed Jundii", type: 'Hifzii', values: ["571.5", "569.5", "567", "564.5", "562 (Gaha)"] },
      { id: 'm2t1_14', studentName: "Birraa", type: 'Hifzii', values: ["481", "477", "472", "467", "462 (Gaha)"] },
      { id: 'm2t1_15', studentName: "Kaalid", type: 'Hifzii', values: ["501", "497", "492", "487", "482 (Gaha)"] },
      { id: 'm2t1_16', studentName: "Ramadan", type: 'Hifzii', values: ["501", "497", "492", "487", "482 (Gaha)"] },
      { id: 'm2t1_17', studentName: "Musab", type: 'Hifzii', values: ["510", "506", "501", "496", "491 (Gaha)"] },
      { id: 'm2t1_18', studentName: "Abdallaa", type: 'Hifzii', values: ["510", "506", "501", "496", "491 (Gaha)"] },
      { id: 'm2t1_19', studentName: "Hamdii", type: 'Hifzii', values: ["510", "506", "501", "496", "491 (Gaha)"] },
    ]
  },

  // --- MONTH 3: JI'A 3FFAA (TIKIMT) ---
  {
    id: 'm3_t1',
    title: "5. JI'A 3FFAA (TIKIMT): GUYYAA HOJII 41 – 60 (DHUMA BAATII 3)",
    monthKey: 'tikimt',
    headers: ["Maqaa Barataa", "Gosti Sagantaa", "Guyyaa 41", "Guyyaa 45", "Guyyaa 50", "Guyyaa 55", "Guyyaa 60 (XUMURA BAATII 3)"],
    rows: [
      { id: 'm3t1_1', studentName: "Mu'aaz Waziir", type: 'Tilaawaa', values: ["261", "257", "252", "247", "242 (GAHAN)"] },
      { id: 'm3t1_2', studentName: "Ibrahim Muhammad", type: 'Tilaawaa', values: ["461", "457", "452", "447", "442 (GAHAN)"] },
      { id: 'm3t1_3', studentName: "Kaalid Abdurahmaan", type: 'Tilaawaa', values: ["361", "357", "352", "347", "342 (GAHAN)"] },
      { id: 'm3t1_4', studentName: "Maahir Jamaal", type: 'Tilaawaa', values: ["220–221", "212–213", "202–203", "192–193", "182 (GAHAN)"] },
      { id: 'm3t1_5', studentName: "Abdulhakiim", type: 'Tilaawaa', values: ["532.5", "530.5", "528", "525.5", "523 (GAHAN)"] },
      { id: 'm3t1_6', studentName: "Waliid", type: 'Hifzii', values: ["361", "357", "352", "347", "342 (GAHAN)"] },
      { id: 'm3t1_7', studentName: "Abdurashiid", type: 'Hifzii', values: ["231", "227", "222", "217", "212 (GAHAN)"] },
      { id: 'm3t1_8', studentName: "Maahii Roobaa", type: 'Hifzii', values: ["551.5", "549.5", "547", "544.5", "542 (GAHAN)"] },
      { id: 'm3t1_9', studentName: "Bilaal Xaahaa", type: 'Hifzii', values: ["551.5", "549.5", "547", "544.5", "542 (GAHAN)"] },
      { id: 'm3t1_10', studentName: "Faaruq Keeyraddiin", type: 'Hifzii', values: ["531", "527", "522", "517", "512 (GAHAN)"] },
      { id: 'm3t1_11', studentName: "Nadhii Haassan", type: 'Hifzii', values: ["553.5", "551.5", "549", "546.5", "544 (GAHAN)"] },
      { id: 'm3t1_12', studentName: "Nasraddiin Juneeydii", type: 'Hifzii', values: ["561.5", "559.5", "557", "554.5", "552 (GAHAN)"] },
      { id: 'm3t1_13', studentName: "Ahmed Jundii", type: 'Hifzii', values: ["561.5", "559.5", "557", "554.5", "552 (GAHAN)"] },
      { id: 'm3t1_14', studentName: "Birraa", type: 'Hifzii', values: ["461", "457", "452", "447", "442 (GAHAN)"] },
      { id: 'm3t1_15', studentName: "Kaalid", type: 'Hifzii', values: ["481", "477", "472", "467", "462 (GAHAN)"] },
      { id: 'm3t1_16', studentName: "Ramadan", type: 'Hifzii', values: ["481", "477", "472", "467", "462 (GAHAN)"] },
      { id: 'm3t1_17', studentName: "Musab", type: 'Hifzii', values: ["490", "486", "481", "476", "471 (GAHAN)"] },
      { id: 'm3t1_18', studentName: "Abdallaa", type: 'Hifzii', values: ["490", "486", "481", "476", "471 (GAHAN)"] },
      { id: 'm3t1_19', studentName: "Hamdii", type: 'Hifzii', values: ["490", "486", "481", "476", "471 (GAHAN)"] },
    ]
  }
];
