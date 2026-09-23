# Asset Management System

Sistema de gestão patrimonial desenvolvido como interface visual para cadastro, consulta e controle de patrimônio da organização.

## Descrição geral

Este projeto foi pensado para facilitar o gerenciamento de itens patrimoniais, como computadores, móveis, equipamentos, materiais e demais bens utilizados pela empresa.

A aplicação permite que o usuário cadastre novos patrimônios, consulte registros já existentes, filtre itens por status, acompanhe informações importantes e tenha uma visão geral do patrimônio em um painel administrativo.

Este repositório representa a parte visual e funcional inicial do sistema, com foco em experiência do usuário, organização da interface e funcionamento básico das telas.

## Como o usuário utiliza o sistema

### 1. Dashboard
Ao entrar no sistema, o usuário visualiza o painel principal com os indicadores gerais, como:

- total de patrimônios cadastrados;
- quantidade de itens em uso;
- quantidade de itens baixados;
- valor acumulado do patrimônio;
- visão resumida por situação do item.

Esse módulo serve como central de controle, permitindo que o responsável tenha uma visão rápida do estado geral do patrimônio da empresa.

### 2. Cadastro de patrimônio
Na tela de cadastro, o usuário preenche as informações do bem a ser registrado, como:

- etiqueta do patrimônio;
- nome do produto;
- nota fiscal;
- data de aquisição;
- fornecedor;
- valor de aquisição;
- local de uso;
- estado de conservação;
- observação adicional.

Esse processo permite manter um registro organizado e centralizado dos bens da organização.

### 3. Listagem de patrimônios
Na listagem, os itens cadastrados aparecem em tabela, com informações como:

- etiqueta;
- produto;
- data de aquisição;
- valor;
- estado atual;
- local de uso;
- ações de edição e exclusão.

O usuário pode também consultar e localizar itens rapidamente por busca textual ou por filtro de estado.

### 4. Consulta
A tela de consulta permite procurar patrimônio por informações importantes, como:

- etiqueta;
- nome do produto;
- fornecedor;
- local de uso;
- outros dados principais do cadastro.

Essa função ajuda a encontrar um item específico sem ter que percorrer toda a lista manualmente.

### 5. Relatórios
A área de relatórios oferece uma visão administrativa dos itens, com estrutura para geração de dados por categoria, como:

- inventário geral;
- patrimônios em uso;
- itens em manutenção.

Esses relatórios servem para dar suporte a decisões, auditoria e controle interno.

## Principais recursos da aplicação

- menu lateral com navegação por módulos;
- painel visual com indicadores principais;
- formulário de cadastro de patrimônio;
- listagem organizada em tabela;
- filtros e busca;
- controle de status dos itens;
- ações de edição e exclusão demonstrativas;
- notificações visuais para feedback do usuário;
- layout responsivo para desktop e telas menores.

## Ferramentas e fluxo de uso

O sistema foi pensado para uso por um usuário administrativo, normalmente responsável por:

- registrar novos equipamentos e itens do patrimônio;
- atualizar informações já existentes;
- identificar itens em uso, manutenção ou baixados;
- consultar rapidamente qualquer bem;
- garantir que o inventário esteja organizado.

A interface foi organizada para permitir uso simples, com navegação direta entre as telas e com foco em rapidez e produtividade.

## Tecnologias e linguagens utilizadas

### Front-end

O desenvolvimento visual foi realizado com as seguintes tecnologias:

- HTML5
- CSS3
- JavaScript

### Estrutura do código

- `index.html` — estrutura das telas e conteúdo principal do sistema.
- `styles.css` — estilos visuais, layout responsivo, componentes e identidade visual.
- `app.js` — interações do sistema, filtros, navegação, paginação e mensagens de feedback.
- `README.md` — documentação do projeto.

## Linguagens principais do desenvolvimento

- HTML: estrutura da interface e organização das telas;
- CSS: design, espaçamento, cores, bordas, alinhamento, responsividade e identidade visual;
- JavaScript: interações do usuário, filtros, navegação entre seções, carregamento de dados e notificações.

## Como executar

Como este projeto é um mockup front-end estático, não há dependências externas para instalação.

### Opção 1: abrir diretamente no navegador

1. Faça o download ou clone o repositório.
2. Abra o arquivo `index.html` em um navegador moderno.

### Opção 2: usar um servidor local simples

No terminal, execute:

```bash
python -m http.server 8000
```

Depois acesse:

```bash
http://localhost:8000
```

## Observações importantes

Este projeto representa uma interface funcional de demonstração. Ele foi criado para simular o uso do sistema e validar a experiência visual do usuário.

Ele ainda não contém:

- autenticação de usuários;
- integração com banco de dados real;
- persistência de dados em backend;
- login administrativo;
- exportação em PDF/Excel;
- conexão com API externa.

## Objetivo da versão atual

A versão atual foi criada para demonstrar a proposta visual do sistema, com foco em:

- melhorar a aparência do painel;
- facilitar o entendimento do usuário;
- deixar a interface mais moderna e profissional;
- servir como base para evoluções futuras na implementação completa.

## Evolução futura sugerida

- integração com banco de dados;
- autenticação e autorização;
- API para consulta e cadastro de itens;
- exportação de relatórios;
- paginação real no backend;
- uso de bibliotecas de ícones e componentes;
- suporte a múltiplos perfis de usuário;
- temas e personalizações visuais.

## Conclusão

O Asset Management System foi desenvolvido para facilitar o controle patrimonial de uma organização, permitindo registro, consulta, organização e acompanhamento de bens de forma prática e visualmente clara.

A aplicação foi construída com HTML, CSS e JavaScript, mantendo uma estrutura simples, direta e fácil de evoluir conforme o sistema real for implementado.
