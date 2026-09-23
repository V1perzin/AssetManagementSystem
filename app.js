const sections = [...document.querySelectorAll('.page-section')];
const navLinks = [...document.querySelectorAll('[data-section]')];
const breadcrumbTitle = document.querySelector('#breadcrumbTitle');
const sidebar = document.querySelector('#sidebar');
const overlay = document.querySelector('#sidebarOverlay');
const toast = document.querySelector('#toast');

const titles = {
  dashboard: 'Dashboard',
  cadastro: 'Cadastrar patrimônio',
  lista: 'Patrimônios cadastrados',
  consulta: 'Consultar patrimônio',
  relatorios: 'Relatórios'
};

function showSection(id) {
  const target = document.getElementById(id) || document.getElementById('dashboard');
  const sectionId = target.id;
  sections.forEach(section => section.classList.toggle('active-section', section.id === sectionId));
  document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.section === sectionId));
  breadcrumbTitle.textContent = titles[sectionId] || 'Dashboard';
  history.replaceState(null, '', `#${sectionId}`);
  closeSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('visible');
}

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('visible');
}

document.querySelectorAll('[data-section]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    showSection(link.dataset.section);
  });
});

document.querySelector('#openSidebar').addEventListener('click', openSidebar);
document.querySelector('#closeSidebar').addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

const initialSection = window.location.hash.replace('#', '');
showSection(titles[initialSection] ? initialSection : 'dashboard');

document.querySelector('#assetForm').addEventListener('submit', event => {
  event.preventDefault();
  event.target.reset();
  notify('Patrimônio salvo com sucesso.');
});

document.querySelectorAll('.report-card .button').forEach(button => {
  button.addEventListener('click', () => notify('Relatório preparado para geração.'));
});

document.querySelectorAll('.delete').forEach(button => {
  button.addEventListener('click', () => {
    if (window.confirm('Deseja realmente excluir este patrimônio?')) {
      button.closest('tr').remove();
      notify('Patrimônio removido.');
    }
  });
});

document.querySelectorAll('.edit').forEach(button => button.addEventListener('click', () => notify('Modo de edição selecionado.')));

document.querySelector('#tableSearch').addEventListener('input', filterTable);
document.querySelector('#statusFilter').addEventListener('change', filterTable);

function filterTable() {
  const query = document.querySelector('#tableSearch').value.toLowerCase();
  const status = document.querySelector('#statusFilter').value.toLowerCase();
  document.querySelectorAll('#assetRows tr').forEach(row => {
    const text = row.textContent.toLowerCase();
    const matchesQuery = text.includes(query);
    const matchesStatus = !status || text.includes(status);
    row.hidden = !(matchesQuery && matchesStatus);
  });
}

document.querySelector('#consultSearch').addEventListener('keydown', event => {
  if (event.key === 'Enter') notify('Consulta realizada.');
});

document.querySelector('.large-search .button').addEventListener('click', () => notify('Consulta realizada.'));

let toastTimer;
function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}
