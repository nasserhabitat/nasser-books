// بيانات الكتب لهيكل الذكاء الاصطناعي
const libraryBooks = [
    {
        id: "conscious-contemplation",
        title_ar: "نحو تدبر واعٍ",
        title_en: "Towards Conscious Contemplation",
        path_ar: "books/conscious-contemplation/ar",
        path_en: "books/conscious-contemplation/en",
        category: "quranic",
        ai_access: {
            structured_data: true,
            api_accessible: true,
            content_analysis: true,
            formats: ["html", "pdf", "txt"]
        }
    },
    // ... بقية الكتب
];

// دالة لتحميل وعرض الكتب
function loadBooks() {
    const bookGrid = document.getElementById('book-grid');
    const newBookGrid = document.getElementById('new-book-grid');
    bookGrid.innerHTML = '';
    newBookGrid.innerHTML = '';
    
    // إضافة الكتب الجديدة أولاً
    const newBooks = libraryBooks.slice(0, 6);
    newBooks.forEach(book => {
        const bookCard = createBookCard(book, true);
        newBookGrid.appendChild(bookCard);
    });
    
    // إضافة جميع الكتب
    libraryBooks.forEach(book => {
        const bookCard = createBookCard(book, false);
        bookGrid.appendChild(bookCard);
    });
    
    // تحديث عدد الكتب
    document.getElementById('total-books-count').textContent = libraryBooks.length * 2;
    document.getElementById('new-books-count').textContent = newBooks.length * 2;
}

// دالة لإنشاء بطاقة كتاب
function createBookCard(book, isNew) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.setAttribute('data-lang', 'ar');
    bookCard.setAttribute('data-category', book.category);
    bookCard.setAttribute('data-ai-access', JSON.stringify(book.ai_access));
    bookCard.id = `book-${book.id}-ar`;
    
    const newBadge = isNew ? '<span class="new-badge-card">جديد</span>' : '';
    const aiBadge = '<span class="ai-badge">🤖 متوافق مع الذكاء الاصطناعي</span>';
    
    bookCard.innerHTML = `
        <div class="book-cover">
            ${newBadge}
            ${aiBadge}
            <img src="${book.path_ar}/cover-ar.png" 
                 alt="غلاف ${book.title_ar}"
                 loading="lazy"
                 width="250"
                 height="200">
        </div>
        <div class="book-info">
            <h2>${book.title_ar}</h2>
            <p class="book-meta">تأليف: ناصر ابن داوود</p>
            <p class="book-desc">${getBookDescription(book.id)}</p>
            <div class="book-formats">
                <span>📖 HTML</span>
                <span>📄 PDF</span>
                <span>📝 TXT</span>
            </div>
            <div class="book-actions">
                <a href="${book.path_ar}/" class="btn">النسخة العربية</a>
                <a href="${book.path_en}/" class="btn btn-outline">English Version</a>
            </div>
            <div class="ai-access-links">
                <a href="${book.path_ar}/content.txt" download>تحميل النص الخام</a>
                <a href="api/ai-access/metadata/${book.id}.json">بيانات الذكاء الاصطناعي</a>
            </div>
        </div>
    `;
    
    return bookCard;
}

// دالة للحصول على وصف الكتاب
function getBookDescription(bookId) {
    const descriptions = {
        "conscious-contemplation": "كتاب يشرح منهجية التدبر العميق للقرآن الكريم وتطبيقاته العصرية",
        "anwar-al-bayan": "دراسة علمية للرسم العثماني وأسراره اللغوية",
        // ... بقية الأوصاف
    };
    
    return descriptions[bookId] || "مؤلف قيم في علوم القرآن واللغة";
}

// تحديث وقت التحديث الأخير
function updateLastUpdateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('last-update').textContent = now.toLocaleDateString('ar-SA', options);
}

// إعداد الفلاتر المتقدمة
function setupAdvancedFilters() {
    const contentType = document.getElementById('content-type');
    const aiCompatibility = document.getElementById('ai-compatibility');
    
    const applyFilters = () => {
        const contentValue = contentType.value;
        const aiValue = aiCompatibility.value;
        
        document.querySelectorAll('.book-card').forEach(card => {
            const category = card.getAttribute('data-category');
            const aiAccess = JSON.parse(card.getAttribute('data-ai-access'));
            
            let contentMatch = contentValue === 'all' || category === contentValue;
            let aiMatch = aiValue === 'all' || 
                         (aiValue === 'structured' && aiAccess.structured_data) ||
                         (aiValue === 'api' && aiAccess.api_accessible) ||
                         (aiValue === 'analysis' && aiAccess.content_analysis);
            
            card.style.display = contentMatch && aiMatch ? 'block' : 'none';
        });
    };
    
    contentType.addEventListener('change', applyFilters);
    aiCompatibility.addEventListener('change', applyFilters);
}

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    updateLastUpdateTime();
    loadBooks();
    setupFilterButtons();
    setupNewBooksFilter();
    setupAdvancedFilters();
    
    // تحديث العد تلقائياً كل ساعة
    setInterval(() => {
        updateLastUpdateTime();
    }, 3600000);
});
