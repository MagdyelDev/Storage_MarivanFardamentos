**Descrição do Projeto – Sistema de Estoque Marivan Fardamentos**

O projeto consiste no desenvolvimento de um sistema de controle de estoque para a **Marivan Fardamentos**, com o objetivo de organizar e gerenciar a entrada, saída e disponibilidade de produtos de forma prática, segura e eficiente.

O sistema permitirá o cadastro de fardamentos e demais itens comercializados pela empresa, incluindo informações como nome, categoria, tamanho, cor, quantidade em estoque, fornecedor e preço. Além disso, será possível registrar movimentações de entrada e saída de produtos, consultar o estoque em tempo real, emitir relatórios e identificar itens com baixa quantidade para facilitar a reposição.

Com essa solução, a Marivan Fardamentos terá maior controle sobre seu estoque, reduzindo erros, evitando perdas e agilizando o atendimento aos clientes, contribuindo para uma gestão mais organizada e eficiente.

---

# Documentação Técnica do Projeto

## Objetivo da Aplicação Desenvolvida

O presente projeto consiste no desenvolvimento de um sistema para o controle de estoque da **Marivan Fardamentos**. O objetivo principal da aplicação é organizar e automatizar o gerenciamento dos produtos armazenados, substituindo o controle manual por um sistema mais seguro, rápido e eficiente.

A aplicação permite cadastrar produtos, controlar a quantidade disponível em estoque, consultar informações rapidamente e acompanhar o valor total dos itens armazenados. Dessa forma, a empresa pode planejar melhor a reposição de materiais, reduzir erros no controle e evitar a falta de produtos importantes para a produção.

---

## Arquitetura Utilizada

O sistema foi desenvolvido utilizando a **Arquitetura em Camadas (Layered Architecture)**, um padrão de arquitetura que organiza a aplicação em diferentes camadas, separando cada responsabilidade do sistema. Essa abordagem torna o código mais organizado, facilita a manutenção, melhora a reutilização de componentes e permite futuras expansões do projeto.

Além da Arquitetura em Camadas, o projeto segue o princípio da **Separação de Responsabilidades (Separation of Concerns)**, organizando o código em diretórios específicos para cada função da aplicação.

A estrutura do backend foi organizada da seguinte forma:

- **config:** configurações gerais da aplicação.
- **controllers:** recebem as requisições HTTP e controlam o fluxo da aplicação.
- **database:** responsável pela conexão e armazenamento dos dados utilizando SQLite.
- **middlewares:** executam validações e tratamentos antes das requisições chegarem aos controladores.
- **repositories:** realizam o acesso ao banco de dados por meio das operações de consulta, cadastro, atualização e exclusão.
- **routes:** definem todas as rotas disponíveis na API.
- **services:** concentram as regras de negócio e validações do sistema.
- **utils:** armazenam funções auxiliares reutilizadas em diferentes partes da aplicação.

No frontend, os arquivos foram organizados em pastas específicas para separar imagens, estilos, scripts JavaScript, componentes reutilizáveis e páginas da aplicação, mantendo uma estrutura organizada e de fácil manutenção.

---

## Aplicação da Arquitetura

### Camada de Apresentação (UI)

A camada de apresentação é responsável pela interface do usuário. Nela foram desenvolvidas as telas do sistema, formulários de cadastro, tabelas de produtos e toda a parte visual da aplicação.

Também é responsável por destacar em vermelho os produtos cujo estoque está zerado, facilitando a identificação dos itens que precisam ser repostos.

### Camada de Negócio (Service)

A camada de negócio concentra todas as regras de funcionamento do sistema.

Entre as principais responsabilidades estão:

- Validar os dados informados pelo usuário.
- Impedir o cadastro de valores negativos para quantidade e preço.
- Calcular automaticamente o valor total de cada produto.

A fórmula utilizada é:

**Valor Total = Quantidade × Preço Unitário**

### Camada de Dados (Repository)

A camada de dados é responsável pela comunicação com o banco SQLite.

Ela realiza operações como:

- Cadastro de produtos.
- Consulta de registros.
- Atualização de informações.
- Exclusão de produtos.

Essa separação permite que alterações no banco de dados não afetem diretamente as demais camadas da aplicação.

---

## Funcionalidades Implementadas

O sistema possui as seguintes funcionalidades:

- Cadastro de produtos.
- Identificação dos produtos por código único.
- Registro do nome, quantidade e preço unitário.
- Cálculo automático do valor total.
- Atualização de produtos.
- Exclusão de produtos.
- Consulta dos produtos cadastrados.
- Controle de estoque.
- Destaque visual para produtos com estoque zerado.
- Validação de dados antes do armazenamento.
- Persistência das informações utilizando SQLite.

---

## Tecnologias Utilizadas

### Backend

- **Node.js**
- **Express.js**
- **SQLite**
- **dotenv**

### Frontend

- **HTML5**
- **CSS3**
- **JavaScript**

---

## Estrutura do Projeto

```text
Estoque/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middlewares/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   └── public/
│       ├── assets/
│       ├── components/
│       ├── js/
│       ├── pages/
│       └── style/
│
└── README.md
```

---

## Responsabilidades da Equipe

As atividades foram divididas entre os integrantes da equipe para facilitar o desenvolvimento do projeto.

- **Interface (Frontend):** desenvolvimento das telas, estilização e experiência do usuário.
- **Lógica de Negócio:** implementação das regras do sistema, validações e cálculos automáticos.
- **Persistência de Dados:** criação da estrutura do banco de dados, integração com SQLite e implementação das operações de cadastro, consulta, edição e exclusão de produtos.

---

## Considerações Finais

O desenvolvimento deste projeto permitiu aplicar conceitos de desenvolvimento web utilizando **Node.js**, **Express** e **SQLite**, além da utilização da **Arquitetura em Camadas**, amplamente empregada em sistemas profissionais.

A organização do código em camadas e diretórios específicos tornou o projeto mais limpo, modular e de fácil manutenção, facilitando futuras implementações e novas funcionalidades para o sistema de controle de estoque da **Marivan Fardamentos**.
