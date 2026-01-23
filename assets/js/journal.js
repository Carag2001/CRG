const posts = [
  'posts/journal/2026-01-22.md',
  'posts/journal/2026-01-21.md',
  'posts/journal/2026-01-20.md'
];

const container = document.getElementById('journalContainer');

function parseMarkdown(md) {
  return md
    .replace(/^# (.*$)/gim, '<h2>$1</h2>')
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\n{2,}/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

posts.forEach((file, index) => {
  fetch(file)
    .then(res => res.text())
    .then(md => {
      const article = document.createElement('article');
      article.className = `section ${index % 2 === 0 ? 'light' : 'dark'} entry`;
      article.innerHTML = `<p>${parseMarkdown(md)}</p>`;
      container.appendChild(article);
    });
});
