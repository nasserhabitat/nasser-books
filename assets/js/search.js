// في main.js أو search.js
const searchInput = document.querySelector('.search-input');
const resultsContainer = document.createElement('div');
resultsContainer.classList.add('search-results');
document.querySelector('.search-info').after(resultsContainer); // افتراض مكان الإدراج

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  resultsContainer.innerHTML = '';
  if (query) {
    const filteredBooks = libraryBooks.filter(book => 
      book.title_ar.toLowerCase().includes(query) || book.title_en.toLowerCase().includes(query)
    );
    filteredBooks.forEach(book => {
      const resultDiv = document.createElement('div');
      resultDiv.classList.add('book-search-result');
      resultDiv.innerHTML = `
        <div class="book-result-header">
          <img class="book-result-cover" src="${book.cover_ar || book.links.ar.cover}" alt="${book.title_ar}">
          <div class="book-result-info">
            <h3>${book.title_ar}</h3>
            <p class="book-meta">تأليف: ${book.author}</p>
          </div>
        </div>
      `;
      resultsContainer.appendChild(resultDiv);
    });
  }
});
