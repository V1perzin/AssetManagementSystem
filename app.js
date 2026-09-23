const sections = [...document.querySelectorAll('.page-section')];
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

/* Paginação da lista: começa com 100 itens e permite carregar mais sob demanda. */
const tablePanel = document.querySelector('.table-panel');
const assetRows = document.querySelector('#assetRows');
const allRows = [...assetRows.querySelectorAll('tr')];
const tableSearch = document.querySelector('#tableSearch');
const statusFilter = document.querySelector('#statusFilter');
let visibleLimit = 100;
let currentPage = 1;

const paginationStyles = document.createElement('style');
paginationStyles.textContent = `
  .pagination-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:15px 18px;border-top:1px solid var(--border);color:var(--muted);font-size:12px}
  .pagination-info{white-space:nowrap}.pagination-actions{display:flex;align-items:center;gap:8px}
  .page-size{position:relative}.page-size select{min-width:112px;padding:8px 28px 8px 10px;border:1px solid var(--border);border-radius:7px;background:#fff;color:var(--text);font:inherit;cursor:pointer}
  .page-button{min-width:34px;height:34px;padding:0 10px;border:1px solid var(--border);border-radius:7px;background:#fff;color:var(--text);cursor:pointer}.page-button:hover:not(:disabled){border-color:var(--primary);color:var(--primary)}.page-button:disabled{cursor:not-allowed;opacity:.45}
  .load-more{border:0;background:#eff6ff;color:var(--primary);font:inherit;font-weight:700;cursor:pointer}.load-more:hover{text-decoration:underline}
  @media(max-width:760px){.pagination-bar{align-items:flex-start;flex-direction:column}.pagination-actions{width:100%;justify-content:space-between}.page-size{order:2}}
`;
document.head.appendChild(paginationStyles);

tablePanel.insertAdjacentHTML('beforeend', `
  <div class="pagination-bar" aria-label="Paginação dos patrimônios">
    <span class="pagination-info" id="paginationInfo"></span>
    <div class="pagination-actions">
      <button class="page-button" id="previousPage" aria-label="Página anterior">‹</button>
      <span id="pageIndicator"></span>
      <button class="page-button" id="nextPage" aria-label="Próxima página">›</button>
      <div class="page-size"><select id="pageSize" aria-label="Itens por página"><option value="100" selected>100 / página</option><option value="200">200 / página</option><option value="500">500 / página</option></select></div>
      <button class="button load-more" id="loadMore" type="button">＋ Listar mais</button>
    </div>
  </div>
`);

const paginationInfo = document.querySelector('#paginationInfo');
const pageIndicator = document.querySelector('#pageIndicator');
const previousPage = document.querySelector('#previousPage');
const nextPage = document.querySelector('#nextPage');
const pageSize = document.querySelector('#pageSize');
const loadMore = document.querySelector('#loadMore');

function getFilteredRows() {
  const query = tableSearch.value.trim().toLowerCase();
  const status = statusFilter.value.toLowerCase();
  return allRows.filter(row => {
    const text = row.textContent.toLowerCase();
    return text.includes(query) && (!status || text.includes(status));
  });
}

function renderTable() {
  const filteredRows = getFilteredRows();
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / visibleLimit));
  currentPage = Math.min(currentPage, totalPages);
  const start = (currentPage - 1) * visibleLimit;
  const pageRows = filteredRows.slice(start, start + visibleLimit);

  allRows.forEach(row => { row.hidden = true; });
  pageRows.forEach(row => { row.hidden = false; assetRows.appendChild(row); });

  const first = filteredRows.length ? start + 1 : 0;
  const last = Math.min(start + visibleLimit, filteredRows.length);
  paginationInfo.textContent = `Mostrando ${first}–${last} de ${filteredRows.length} patrimônio(s)`;
  pageIndicator.textContent = `${currentPage} / ${totalPages}`;
  previousPage.disabled = currentPage === 1;
  nextPage.disabled = currentPage === totalPages;
  loadMore.hidden = visibleLimit >= filteredRows.length || filteredRows.length === 0;
}

function updateTableFromFilter() {
  currentPage = 1;
  renderTable();
}

tableSearch.addEventListener('input', updateTableFromFilter);
statusFilter.addEventListener('change', updateTableFromFilter);
pageSize.addEventListener('change', () => {
  visibleLimit = Number(pageSize.value);
  currentPage = 1;
  renderTable();
});
previousPage.addEventListener('click', () => { if (currentPage > 1) { currentPage -= 1; renderTable(); } });
nextPage.addEventListener('click', () => { currentPage += 1; renderTable(); });
loadMore.addEventListener('click', () => {
  visibleLimit += 100;
  pageSize.value = visibleLimit <= 100 ? '100' : visibleLimit <= 200 ? '200' : '500';
  renderTable();
  notify(`Mais itens carregados: até ${visibleLimit} por página.`);
});

function bindTableActions() {
  document.querySelectorAll('.delete').forEach(button => {
    button.onclick = () => {
      if (window.confirm('Deseja realmente excluir este patrimônio?')) {
        button.closest('tr').remove();
        notify('Patrimônio removido.');
        renderTable();
      }
    };
  });
  document.querySelectorAll('.edit').forEach(button => {
    button.onclick = () => notify('Modo de edição selecionado.');
  });
}

bindTableActions();
renderTable();

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
