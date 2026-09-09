const starterProjects = [
  { title: 'FYRE-Assignments', category: 'Software / GitHub', year: '2026', description: 'A collection of assignments and experiments built while developing practical software skills.', image: '', url: 'https://github.com/dau230/FYRE-Assignments' }
];
const starterAchievements = [
  { title: 'Started at Lehigh University', category: 'Milestone', year: '2025', description: 'Joined the Rossin College of Engineering as a full-time student.' },
  { title: 'Class of 2030', category: 'On the horizon', year: '2030', description: 'Working toward a degree and a toolkit for building what comes next.' }
];

const load = (key, fallback) => JSON.parse(localStorage.getItem(key) || 'null') || fallback;
let projects = starterProjects;
let achievements = load('daniel-achievements', starterAchievements);

function renderProjects() {
  const grid = document.querySelector('#project-grid');
  const template = document.querySelector('#project-template');
  grid.innerHTML = '';
  projects.forEach((project, index) => {
    const card = template.content.cloneNode(true);
    const imageWrap = card.querySelector('.project-image');
    const image = card.querySelector('img');
    card.querySelector('.project-index').textContent = String(index + 1).padStart(2, '0');
    card.querySelector('.project-category').textContent = project.category;
    card.querySelector('.project-year').textContent = project.year;
    card.querySelector('h3').textContent = project.title;
    card.querySelector('.project-description').textContent = project.description;
    const projectLink = card.querySelector('.project-link');
    projectLink.href = project.url || '#contact';
    if (project.url) {
      projectLink.target = '_blank';
      projectLink.rel = 'noreferrer';
    }
    if (project.image) {
      image.src = project.image;
      image.alt = `${project.title} preview`;
      imageWrap.classList.add('has-image');
    }
    grid.appendChild(card);
  });
}

function renderAchievements() {
  const list = document.querySelector('#achievement-list');
  list.innerHTML = achievements.map((achievement) => `
    <article class="achievement">
      <div class="achievement-title">${escapeHtml(achievement.title)}</div>
      <div class="achievement-description">${escapeHtml(achievement.description)}</div>
      <div class="achievement-type">${escapeHtml(achievement.category)}</div>
      <div class="achievement-year">${escapeHtml(achievement.year)}</div>
      <div class="achievement-mark">↗</div>
    </article>`).join('');
}

function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}

renderProjects();
renderAchievements();
