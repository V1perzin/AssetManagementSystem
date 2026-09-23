# Asset Management System

Projeto de mockup visual para um sistema de gestão patrimonial, com foco em melhorar o layout, a hierarquia visual e a usabilidade do painel administrativo.

## Objetivo do projeto

Este repositório contém uma interface moderna e responsiva para um sistema de patrimônio, com a proposta de substituir um layout mais simples por uma experiência visual mais profissional e amigável.

A estrutura foi desenvolvida para simular um painel administrativo com:

- menu lateral navegável;
- dashboard com indicadores e resumo;
- formulário de cadastro de patrimônio;
- consulta e busca;
- listagem de itens com ações;
- área de relatórios.

## O que está incluso

### 1. Dashboard
Painel principal com indicadores visuais do patrimônio cadastrado:

- total de itens;
- itens em uso;
- itens baixados;
- valor acumulado;
- resumo gráfico por estado;
- atividade recente.

### 2. Cadastro de patrimônio
Seção para registrar novos itens com campos como:

- etiqueta;
- produto;
- nota fiscal;
- data de aquisição;
- fornecedor;
- valor;
- local de uso;
- estado de conservação;
- observação.

### 3. Listagem de patrimônios
Tabela com os principais itens cadastrados, incluindo:

- busca por texto;
- filtro por estado;
- ações de edição e exclusão;
- status visual com badges coloridos;
- layout responsivo para telas menores.

### 4. Consulta
Área dedicada para pesquisar patrimônios por:

- etiqueta;
- nome do produto;
- nota fiscal;
- local de uso;
- outros diferenciais do cadastro.

### 5. Relatórios
Seção para visualização de relatórios administrativas, com cartões informativos para:

- inventário geral;
- itens em uso;
- itens em manutenção.

## Estrutura dos arquivos

- `index.html` — estrutura principal do sistema e páginas das seções.
- `styles.css` — estilos visuais, responsividade, layout, botões, cards, tabelas e formulários.
- `app.js` — interações do painel, navegação entre seções, filtro e notificações.
- `README.md` — documentação do projeto.

## Como executar

Como este é um mockup front-end estático, não é necessário instalar dependências.

### Opção 1: abrir diretamente no navegador

1. Baixe ou clone o repositório.
2. Abra o arquivo `index.html` em qualquer navegador moderno.

### Opção 2: usar servidor local leve

Se preferir, você pode rodar em um servidor simples com Python:

```bash
python -m http.server 8000
```

Depois acesse:

```bash
http://localhost:8000
```

## Tecnologias utilizadas

### CSS utilizado

Foi utilizado CSS puro, sem framework de UI.

Arquivo principal:

- `styles.css`

Características:

- variáveis CSS (`:root`) para padronizar cores;
- layout com flexbox e grid;
- design responsivo com `@media` queries;
- componentes personalizados para cards, botões, badges, formulário e tabela;
- estilos visuais próprios para menu lateral, dashboard e seções internas.

Não foi utilizado Bootstrap, Tailwind CSS, Materialize ou outro framework CSS.

### JavaScript utilizado

Arquivo:

- `app.js`

Ele foi usado para:

- alternar entre as seções do sistema;
- controlar o menu lateral em mobile;
- aplicar busca e filtros na tabela;
- mostrar toasts/notificações;
- simular ações de edição, exclusão e relatórios.

## Observações importantes

Este projeto é uma interface visual de demonstração. Ele não contém:

- autenticação real;
- conexão com banco de dados;
- persistência de dados em backend;
- validação de segurança em produção.

Ele serve como base visual para um sistema real, podendo ser integrado a um backend posteriormente.

## Possíveis evoluções futuras

- integração com API REST;
- autenticação de usuário;
- persistência de dados em banco;
- exportação para PDF/Excel;
- filtro avançado por data e fornecedor;
- layout de acesso com perfis administrativos;
- criação de páginas separadas para cadastro, edição e visualização detalhada;
- suporte a temas claro/escuro.

## Licença

Este projeto foi desenvolvido como mockup interno e pode ser adaptado conforme a necessidade da equipe ou do cliente.
