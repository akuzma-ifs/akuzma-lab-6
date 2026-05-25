import './style.css'
import dayjs from 'dayjs';

const SUPABASE_URL = 'https://ikukzxaeibxkwqbohgku.supabase.co/rest/v1/article';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrdWt6eGFlaWJ4a3dxYm9oZ2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MjQwNjIsImV4cCI6MjA5NTMwMDA2Mn0.4_8BN5kHLhCvn4icsyK1VIWT8hlNSY4ZsKGeO6pIKBE';

const articlesList = document.getElementById('articles-list');
const sortSelect = document.getElementById('sort-select');
const addForm = document.getElementById('add-article-form');

document.getElementById('input-date').value = dayjs().format('YYYY-MM-DDTHH:mm');

async function fetchArticles() {
  const sortBy = sortSelect.value;
  
  const response = await fetch(SUPABASE_URL + '?order=' + sortBy, {
    method: 'GET',
    headers: {
      'apiKey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY
    }
  });

  const articles = await response.json();
  
  articlesList.innerHTML = '';

  for (let i = 0; i < articles.length; i++) {
    const art = articles[i];
    
    const prostaData = dayjs(art.created_at).format('DD-MM-YYYY');

    let tagiTekst = '';
    if (art.tags) {
      tagiTekst = 'Tagi: ' + art.tags.join(', ');
    }

    articlesList.innerHTML += `
      <div class="border p-3">
        <h2 class="text-xl font-bold text-primary">${art.title}</h2>
        <h3>${art.subtitle}</h3>
        <p>${art.content}</p>
        <p class="text-sm text-gray-500">Autor: ${art.author} | Data: ${prostaData}</p>
        <p class="text-sm text-blue-600">${tagiTekst}</p>
      </div>
    `;
  }
}

addForm.addEventListener('submit', async function(e) {
  e.preventDefault();

  const nowyArtykul = {
    title: document.getElementById('input-title').value,
    subtitle: document.getElementById('input-subtitle').value,
    author: document.getElementById('input-author').value,
    content: document.getElementById('input-content').value,
    created_at: dayjs(document.getElementById('input-date').value).toISOString()
  };

  const response = await fetch(SUPABASE_URL, {
    method: 'POST',
    headers: {
      'apiKey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nowyArtykul)
  });

  if (response.ok) {
    addForm.reset();
    document.getElementById('input-date').value = dayjs().format('YYYY-MM-DDTHH:mm');
    fetchArticles(); 
  }
});

sortSelect.addEventListener('change', fetchArticles);

fetchArticles();