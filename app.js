const sections = [...document.querySelectorAll('.page-section')];
const breadcrumbTitle = document.querySelector('#breadcrumbTitle');
const sidebar = document.querySelector('#sidebar');
const overlay = document.querySelector('#sidebarOverlay');
const toast = document.querySelector('#toast');
const tableBody = document.querySelector('#assetRows');
const tableSearch = document.querySelector('#tableSearch');
const statusFilter = document.querySelector('#statusFilter');

const titles = {
  dashboard: 'Dashboard',
  cadastro: 'Cadastrar patrimônio',
  lista: 'Patrimônios cadastrados',
  consulta: 'Consultar patrimônio',
  relatorios: 'Relatórios'
};

const patrimonios = [
  { etiqueta: '0001', produto: 'Fragmentadora Kobra 245', notaFiscal: '8823', data: '28/09/2023', fornecedor: 'Casas das Máquinas', valor: 'R$ 9.350,00', estado: 'Em uso', local: 'Setor interno · Sala 01' },
  { etiqueta: '0002', produto: 'Mesa de trabalho executiva', notaFiscal: '4712', data: '05/02/2025', fornecedor: 'Móveis & Cia', valor: 'R$ 1.280,00', estado: 'Em uso', local: 'Escritório administrativo' },
  { etiqueta: '0003', produto: 'Escaner de documentos', notaFiscal: '5581', data: '10/03/2024', fornecedor: 'Tech Print', valor: 'R$ 2.450,00', estado: 'Em uso', local: 'Recepção' },
  { etiqueta: '0004', produto: 'Notebook Dell Latitude', notaFiscal: '1032750', data: '22/04/2025', fornecedor: 'Lenovo', valor: 'R$ 3.607,99', estado: 'Em uso', local: 'Setor TI' },
  { etiqueta: '0005', produto: 'Impressora multifuncional', notaFiscal: '2217', data: '18/07/2024', fornecedor: 'PrintLine', valor: 'R$ 1.899,00', estado: 'Manutenção', local: 'Setor de manutenção' },
  { etiqueta: '0006', produto: 'Cadeira ergonômica', notaFiscal: '3319', data: '09/01/2023', fornecedor: 'Fábrica de Moveis', valor: 'R$ 540,00', estado: 'Em uso', local: 'Sala de reuniões' },
  { etiqueta: '0007', produto: 'Projetor Epson', notaFiscal: '8840', data: '02/11/2022', fornecedor: 'Apex Visual', valor: 'R$ 4.200,00', estado: 'Em uso', local: 'Auditório' },
  { etiqueta: '0008', produto: 'Servidor HP ProLiant', notaFiscal: '7711', data: '14/08/2024', fornecedor: 'DataCore', valor: 'R$ 18.900,00', estado: 'Em uso', local: 'Data center' },
  { etiqueta: '0009', produto: 'Ar condicionado split', notaFiscal: '9091', data: '06/12/2024', fornecedor: 'Climatiza Tech', valor: 'R$ 2.980,00', estado: 'Em uso', local: 'Sala de diretoria' },
  { etiqueta: '0010', produto: 'Microcomputador mini', notaFiscal: '6402', data: '17/03/2025', fornecedor: 'PC Market', valor: 'R$ 2.150,00', estado: 'Em uso', local: 'Operações' },
  { etiqueta: '0011', produto: 'Estabilizador de energia', notaFiscal: '9124', data: '12/05/2024', fornecedor: 'Energia Segura', valor: 'R$ 880,00', estado: 'Em uso', local: 'Sala do almoxarifado' },
  { etiqueta: '0012', produto: 'Duplicador de documentos', notaFiscal: '6755', data: '08/02/2021', fornecedor: 'Copy Master', valor: 'R$ 1.350,00', estado: 'Baixado', local: 'Setor administrativo' },
  { etiqueta: '0013', produto: 'Mesa digitalizadora', notaFiscal: '1190', data: '22/09/2022', fornecedor: 'Office Tools', valor: 'R$ 790,00', estado: 'Em uso', local: 'Financeiro' },
  { etiqueta: '0014', produto: 'Televisão 55 polegadas', notaFiscal: '7752', data: '11/06/2023', fornecedor: 'TV Central', valor: 'R$ 3.450,00', estado: 'Em uso', local: 'Sala de espera' },
  { etiqueta: '0015', produto: 'Roteador Wi-Fi corporativo', notaFiscal: '2874', data: '16/04/2025', fornecedor: 'Net Connect', valor: 'R$ 1.120,00', estado: 'Em uso', local: 'Sala de rede' },
  { etiqueta: '0016', produto: 'Balança de precisão', notaFiscal: '1534', data: '03/01/2023', fornecedor: 'Lugatti', valor: 'R$ 670,00', estado: 'Em uso', local: 'Laboratório' },
  { etiqueta: '0017', produto: 'Armário metálico', notaFiscal: '4729', data: '20/02/2024', fornecedor: 'Segurança Max', valor: 'R$ 1.980,00', estado: 'Em uso', local: 'Almoxarifado central' },
  { etiqueta: '0018', produto: 'Monitor 27 polegadas', notaFiscal: '1037', data: '25/08/2025', fornecedor: 'Vision Tec', valor: 'R$ 1.660,00', estado: 'Em uso', local: 'Setor de faturamento' },
  { etiqueta: '0019', produto: 'Leitor de código de barras', notaFiscal: '3348', data: '19/06/2022', fornecedor: 'Barcode Pro', valor: 'R$ 840,00', estado: 'Em uso', local: 'Expedição' },
  { etiqueta: '0020', produto: 'Câmera de segurança', notaFiscal: '9029', data: '09/09/2024', fornecedor: 'Vision Safe', valor: 'R$ 2.310,00', estado: 'Manutenção', local: 'Recepção externa' }
];

let currentPage = 1;
let visibleLimit = 20;

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

const tablePanel = document.querySelector('.table-panel');
const paginationStyles = document.createElement('style');
paginationStyles.textContent = `
  .pagination-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:15px 18px;border-top:1px solid var(--border);color:var(--muted);font-size:12px}
  .pagination-info{white-space:nowrap}.pagination-actions{display:flex;align-items:center;gap:8px}
  .page-button{min-width:34px;height:34px;padding:0 10px;border:1px solid var(--border);border-radius:7px;background:#fff;color:var(--text);cursor:pointer}.page-button:hover:not(:disabled){border-color:var(--primary);color:var(--primary)}.page-button:disabled{cursor:not-allowed;opacity:.45}
  .load-more{border:0;background:#eff6ff;color:var(--primary);font:inherit;font-weight:700;cursor:pointer}.load-more:hover{text-decoration:underline}
  @media(max-width:760px){.pagination-bar{flex-direction:column;align-items:flex-start}.pagination-actions{width:100%;justify-content:space-between}}
`;
document.head.appendChild(paginationStyles);

tablePanel.insertAdjacentHTML('beforeend', `
  <div class="pagination-bar" aria-label="Paginação dos patrimônios">
    <span class="pagination-info" id="paginationInfo"></span>
    <div class="pagination-actions">
      <button class="page-button" id="previousPage" aria-label="Página anterior">‹</button>
      <span id="pageIndicator"></span>
      <button class="page-button" id="nextPage" aria-label="Próxima página">›</button>
      <button class="button load-more" id="loadMore" type="button">＋ Listar mais</button>
    </div>
  </div>
`);

const paginationInfo = document.querySelector('#paginationInfo');
const pageIndicator = document.querySelector('#pageIndicator');
const previousPage = document.querySelector('#previousPage');
const nextPage = document.querySelector('#nextPage');
const loadMore = document.querySelector('#loadMore');

function getStatusClass(status) {
  if (status === 'Em uso') return 'badge-green';
  if (status === 'Manutenção') return 'badge-amber';
  return 'badge-red';
}

function getFilteredItems() {
  const query = tableSearch.value.trim().toLowerCase();
  const status = statusFilter.value.toLowerCase();

  return patrimonios.filter(item => {
    const text = `${item.etiqueta} ${item.produto} ${item.local} ${item.fornecedor}`.toLowerCase();
    const matchesQuery = text.includes(query);
    const matchesStatus = !status || item.estado.toLowerCase() === status;
    return matchesQuery && matchesStatus;
  });
}

function renderRows() {
  const filtered = getFilteredItems();
  const totalPages = Math.max(1, Math.ceil(filtered.length / visibleLimit));
  currentPage = Math.min(currentPage, totalPages);
  const start = (currentPage - 1) * visibleLimit;
  const pageItems = filtered.slice(start, start + visibleLimit);

  tableBody.innerHTML = '';

  pageItems.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${item.etiqueta}</strong></td>
      <td>${item.produto}</td>
      <td>${item.data}</td>
      <td>${item.valor}</td>
      <td><span class="badge ${getStatusClass(item.estado)}">${item.estado}</span></td>
      <td>${item.local}</td>
      <td>
        <button class="table-action edit" aria-label="Editar">✎</button>
        <button class="table-action delete" aria-label="Excluir">⌫</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  const first = filtered.length ? start + 1 : 0;
  const last = Math.min(start + visibleLimit, filtered.length);
  paginationInfo.textContent = `Mostrando ${first}–${last} de ${filtered.length} patrimônio(s)`;
  pageIndicator.textContent = `${currentPage} / ${totalPages}`;
  previousPage.disabled = currentPage === 1;
  nextPage.disabled = currentPage >= totalPages;
  loadMore.hidden = filtered.length <= visibleLimit || filtered.length === 0;

  bindActions();
}

function updatePage(reset = true) {
  if (reset) currentPage = 1;
  renderRows();
}

tableSearch.addEventListener('input', () => updatePage());
statusFilter.addEventListener('change', () => updatePage());

previousPage.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
    renderRows();
  }
});

nextPage.addEventListener('click', () => {
  const filtered = getFilteredItems();
  const totalPages = Math.max(1, Math.ceil(filtered.length / visibleLimit));
  if (currentPage < totalPages) {
    currentPage += 1;
    renderRows();
  }
});

loadMore.addEventListener('click', () => {
  visibleLimit += 20;
  currentPage = 1;
  renderRows();
  notify('Mais itens carregados.');
});

function bindActions() {
  document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', () => {
      if (window.confirm('Deseja realmente excluir este patrimônio?')) {
        const row = button.closest('tr');
        const etiqueta = row.querySelector('strong').textContent;
        const index = patrimonios.findIndex(item => item.etiqueta === etiqueta);
        if (index >= 0) patrimonios.splice(index, 1);
        row.remove();
        renderRows();
        notify('Patrimônio removido.');
      }
    });
  });

  document.querySelectorAll('.edit').forEach(button => {
    button.addEventListener('click', () => notify('Modo de edição selecionado.'));
  });
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

renderRows();

document.querySelector('#consultSearch').addEventListener('keydown', event => {
  if (event.key === 'Enter') notify('Consulta realizada.');
});

document.querySelector('.large-search .button').addEventListener('click', () => notify('Consulta realizada.'));
