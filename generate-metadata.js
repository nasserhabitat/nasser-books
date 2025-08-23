const fs = require('fs');
const path = require('path');

// بيانات جميع الكتب
const booksData = [
  {
    id: "conscious-contemplation",
    titles: { ar: "نحو تدبر واعٍ", en: "Towards Conscious Contemplation" },
    descriptions: { ar: "كتاب يشرح منهجية التدبر العميق للقرآن الكريم وتطبيقاته العصرية", en: "A practical guide to deep understanding of the Holy Quran" },
    pages: 180,
    chapters: 8
  },
  {
    id: "anwar-al-bayan", 
    titles: { ar: "أنوار البيان في رسم المصحف العثماني", en: "ANWAR AL-BAYAN: Unveiling the Secrets" },
    descriptions: { ar: "دراسة علمية للرسم العثماني وأسراره اللغوية", en: "Scientific study of the Uthmanic script and its linguistic secrets" },
    pages: 161,
    chapters: 12
  },
  {
    id: "changing-the-concepts",
    titles: { ar: "تغيير المفاهيم للمصطلحات القرآنية", en: "Changing the Concepts of Quranic Terminology" },
    descriptions: { ar: "دراسة تطبيقية لفقه اللسان القرآني", en: "Applied study of Quranic terminology jurisprudence" },
    pages: 220,
    chapters: 10
  },
  {
    id: "editing-the-quranic-terminology-tome1",
    titles: { ar: "تحرير المصطلح القرآني المجلد 1", en: "CLARIFYING THE QUR'ANIC TERMINOLOGY Tome 1" },
    descriptions: { ar: "دراسة تطبيقية في فقه اللسان القرآني", en: "AN APPLIED STUDY IN THE JURISPRUDENCE OF THE QUR'ANIC LANGUAGE" },
    pages: 250,
    chapters: 14
  },
  {
    id: "editing-the-quranic-terminology-tome2",
    titles: { ar: "تحرير المصطلح القرآني المجلد 2", en: "CLARIFYING THE QUR'ANIC TERMINOLOGY Tome 2" },
    descriptions: { ar: "دراسة تطبيقية في فقه اللسان القرآني", en: "AN APPLIED STUDY IN THE JURISPRUDENCE OF THE QUR'ANIC LANGUAGE" },
    pages: 280,
    chapters: 16
  },
  {
    id: "editing-the-quranic-terminology-tome3",
    titles: { ar: "تحرير المصطلح القرآني المجلد 3", en: "CLARIFYING THE QUR'ANIC TERMINOLOGY Tome 3" },
    descriptions: { ar: "دراسة تطبيقية في فقه اللسان القرآني", en: "AN APPLIED STUDY IN THE JURISPRUDENCE OF THE QUR'ANIC LANGUAGE" },
    pages: 300,
    chapters: 18
  },
  {
    id: "contemplation-in-the-mirror",
    titles: { ar: "التدبر في مرآة الرسوم", en: "Contemplation in the Mirror of Scripts" },
    descriptions: { ar: "تطبيقات عملية للمخطوطات الرقمية في تدبر القرآن", en: "Practical applications of digital manuscripts in Quranic contemplation" },
    pages: 200,
    chapters: 9
  },
  {
    id: "the-jurisprudence",
    titles: { ar: "فقه اللسان القرآني", en: "The Jurisprudence of the Qur'anic Tongue" },
    descriptions: { ar: "منهجٌ جديد لفهم النص والمخطوط", en: "A NEW APPROACH TO UNDERSTANDING THE TEXT AND MANUSCRIPT" },
    pages: 240,
    chapters: 11
  },
  {
    id: "digitizing",
    titles: { ar: "مشروع رقمنة المخطوطات الأصلية", en: "Digitizing the Original Manuscripts" },
    descriptions: { ar: "دراسة منهجية لحفظ النص القرآني رقمياً", en: "Methodological study of digital preservation of Quranic text" },
    pages: 190,
    chapters: 8
  },
  {
    id: "modesty",
    titles: { ar: "الحَيَاءُ - سياج الروح وبوصلة الفهم", en: "MODESTY: The Fence of the Soul" },
    descriptions: { ar: "دراسة في مفهوم الحياء في الإسلام وتطبيقاته", en: "Study of the concept of modesty in Islam and its applications" },
    pages: 150,
    chapters: 7
  },
  {
    id: "malakoot",
    titles: { ar: "وَلِيَكُونَ مِنَ الْمُوقِنِينَ", en: "AND SO THAT HE MAY BE OF THE CERTAIN ONES" },
    descriptions: { ar: "دراسة فلسفية وعلمية للإيمان بالغيب", en: "A DEMONSTRATIVE JOURNEY IN THE KINGDOM OF THE HEAVENS AND THE EARTH AND WHAT IS BETWEEN THEM" },
    pages: 210,
    chapters: 10
  },
  {
    id: "names-in-the-holy",
    titles: { ar: "الأسماء الحسنى الوظيفية", en: "The Functional Beautiful Names" },
    descriptions: { ar: "دراسة توقيفية تحليلية لدلالات التدبير الإلهي", en: "AN ANALYTICAL ENDOWMENT STUDY OF THE IMPLICATIONS OF DIVINE MANAGEMENT" },
    pages: 230,
    chapters: 12
  }
];

// دالة لإنشاء ملف metadata لكل كتاب
function generateMetadataFiles() {
  const metadataDir = path.join(__dirname, 'api', 'ai-access', 'metadata');
  
  // إنشاء المجلد إذا لم يكن موجوداً
  if (!fs.existsSync(metadataDir)) {
    fs.mkdirSync(metadataDir, { recursive: true });
    console.log("تم إنشاء مجلد metadata: " + metadataDir);
  }
  
  booksData.forEach(book => {
    const metadata = {
      book: {
        id: book.id,
        titles: book.titles,
        descriptions: book.descriptions,
        author: {
          name: "ناصر ابن داوود",
          bio: "باحث إسلامي ومهندس متخصص في الدراسات القرآنية واللغوية"
        },
        technical_info: {
          word_count_ar: Math.floor(book.pages * 200),
          word_count_en: Math.floor(book.pages * 180),
          page_count: book.pages,
          chapter_count: book.chapters,
          language: "arabic",
          character_encoding: "UTF-8"
        },
        files: {
          html_ar: { path: `books/${book.id}/ar/content.html`, size: `${Math.floor(book.pages * 0.015)}MB` },
          text_ar: { path: `books/${book.id}/ar/content.txt`, size: `${Math.floor(book.pages * 0.003)}MB` },
          pdf_ar: { path: `books/${book.id}/ar/content.pdf`, size: `${Math.floor(book.pages * 0.015)}MB` },
          html_en: { path: `books/${book.id}/en/content.html`, size: `${Math.floor(book.pages * 0.014)}MB` },
          text_en: { path: `books/${book.id}/en/content.txt`, size: `${Math.floor(book.pages * 0.0028)}MB` },
          pdf_en: { path: `books/${book.id}/en/content.pdf`, size: `${Math.floor(book.pages * 0.014)}MB` }
        }
      }
    };
    
    const filePath = path.join(metadataDir, `${book.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(metadata, null, 2));
    console.log(`تم إنشاء ملف: ${filePath}`);
  });
  
  console.log("تم إنشاء جميع ملفات الميتاداتا بنجاح!");
}

generateMetadataFiles();
