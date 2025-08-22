// فلترة الكتب حسب اللغة
function setupFilterButtons() {
    document.querySelectorAll('.filter-buttons button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.filter-buttons .active').classList.remove('active');
            button.classList.add('active');
            const filter = button.dataset.filter;
            document.querySelectorAll('#book-grid .book-card').forEach(card => {
                card.style.display = filter === 'all' || card.dataset.lang === filter ? 'block' : 'none';
            });
        });
    });
}

// فلترة الكتب الجديدة
function setupNewBooksFilter() {
    document.querySelectorAll('.new-filter-buttons button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.new-filter-buttons .active').classList.remove('active');
            button.classList.add('active');
            const filter = button.dataset.filter;
            document.querySelectorAll('#new-book-grid .book-card').forEach(card => {
                card.style.display = filter === 'all' || card.dataset.lang === filter ? 'block' : 'none';
            });
        });
    });
}

// تصحيح مسارات الكتب
function fixBookPaths() {
    document.querySelectorAll('a[href^="books/"]').forEach(link => {
        const correctedPath = link.getAttribute('href')
            .replace(/ /g, '-')
            .toLowerCase();
        if (link.getAttribute('href') !== correctedPath) {
            link.setAttribute('href', correctedPath);
        }
    });
}
