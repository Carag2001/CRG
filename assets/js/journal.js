const posts = [
  'posts/journal/2026-01-21.md',
  'posts/journal/2026-01-20.md'
];

const container = document.getElementById('journalContainer');

function markdownToHtml(md) {
  return md
    .replace(/^# (.*$)/gim, '<h2>$1</h2>')
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

posts.forEach((file, index) => {
  fetch(file)
    .then(res => res.text())
    .then(md => {
      const article = document.createElement('article');
      article.className = `section ${index % 2 === 0 ? 'dark' : 'light'} entry`;
      article.innerHTML = `<p>${markdownToHtml(md)}</p>`;
      container.appendChild(article);
    });
});
