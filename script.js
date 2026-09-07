const starterProjects = [
  { title: 'Project Atlas', category: 'Systems / Exploration', year: '2025', description: 'A first deep dive into designing systems that are useful, understandable, and built to grow.', image: '' },
  { title: 'The Build Log', category: 'Writing / Process', year: '2024', description: 'Notes, sketches, and lessons from learning how to turn a rough question into a working prototype.', image: '' },
  { title: 'Signal & Noise', category: 'Research / Curiosity', year: '2024', description: 'An ongoing experiment in paying closer attention to the details hiding in plain sight.', image: '' }
];
const starterAchievements = [
  { title: 'Started at Lehigh University', category: 'Milestone', year: '2025', description: 'Joined the Rossin College of Engineering as a full-time student.' },
  { title: 'Class of 2030', category: 'On the horizon', year: '2030', description: 'Working toward a degree and a toolkit for building what comes next.' }
];

const load = (key, fallback) => JSON.parse(localStorage.getItem(key) || 'null') || fallback;
let projects = load('daniel-projects', starterProjects);
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

const panel = document.querySelector('.editor-panel');
const overlay = document.querySelector('.editor-overlay');
function toggleEditor(open) {
  panel.classList.toggle('open', open);
  panel.setAttribute('aria-hidden', String(!open));
  overlay.hidden = !open;
  document.body.style.overflow = open ? 'hidden' : '';
}
document.querySelectorAll('.edit-trigger').forEach((button) => button.addEventListener('click', () => toggleEditor(true)));
document.querySelector('.close-editor').addEventListener('click', () => toggleEditor(false));
overlay.addEventListener('click', () => toggleEditor(false));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') toggleEditor(false); });

document.querySelectorAll('.tab').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach((item) => item.classList.remove('active'));
  tab.classList.add('active');
  document.querySelector('#project-form').hidden = tab.dataset.tab !== 'project';
  document.querySelector('#achievement-form').hidden = tab.dataset.tab !== 'achievement';
}));

document.querySelector('#project-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const file = data.get('image');
  const save = (image) => {
    projects.push({ title: data.get('title'), description: data.get('description'), category: data.get('category'), year: data.get('year'), image });
    localStorage.setItem('daniel-projects', JSON.stringify(projects));
    renderProjects();
    form.reset();
    toggleEditor(false);
    document.querySelector('#work').scrollIntoView({ behavior: 'smooth' });
  };
  if (file && file.size) {
    const reader = new FileReader();
    reader.addEventListener('load', () => save(reader.result));
    reader.readAsDataURL(file);
  } else save('');
});

document.querySelector('#achievement-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  achievements.push({ title: data.get('title'), description: data.get('description'), category: data.get('category'), year: data.get('year') });
  localStorage.setItem('daniel-achievements', JSON.stringify(achievements));
  renderAchievements();
  event.currentTarget.reset();
  toggleEditor(false);
  document.querySelector('#achievements').scrollIntoView({ behavior: 'smooth' });
});

renderProjects();
renderAchievements();
