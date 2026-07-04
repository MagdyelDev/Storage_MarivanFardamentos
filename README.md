**Descrição do Projeto – Sistema de Estoque Marivan Fardamentos**

O projeto consiste no desenvolvimento de um sistema de controle de estoque para a **Marivan Fardamentos**, com o objetivo de organizar e gerenciar a entrada, saída e disponibilidade de produtos de forma prática, segura e eficiente.

O sistema permitirá o cadastro de fardamentos e demais itens comercializados pela empresa, incluindo informações como nome, categoria, tamanho, cor, quantidade em estoque, fornecedor e preço. Além disso, será possível registrar movimentações de entrada e saída de produtos, consultar o estoque em tempo real, emitir relatórios e identificar itens com baixa quantidade para facilitar a reposição.

Com essa solução, a Marivan Fardamentos terá maior controle sobre seu estoque, reduzindo erros, evitando perdas e agilizando o atendimento aos clientes, contribuindo para uma gestão mais organizada e eficiente.

--

Documentação Técnica do Projeto
Objetivo da Aplicação Desenvolvida

Este projeto tem como objetivo desenvolver um sistema para o controle de estoque da empresa Marivan Fardamentos. A aplicação foi criada para facilitar a organização dos produtos, substituindo o controle manual por um sistema mais rápido, seguro e eficiente.

Com o sistema, é possível cadastrar produtos, controlar a quantidade disponível em estoque, consultar informações rapidamente e acompanhar o valor dos itens armazenados. Dessa forma, a empresa consegue ter um melhor planejamento na reposição de materiais e evitar a falta de produtos importantes para a produção.

Arquitetura e Padrões Utilizados

O sistema foi desenvolvido utilizando a Arquitetura em Camadas, um padrão que organiza o projeto em partes independentes. Essa divisão facilita a manutenção do código, futuras melhorias e o trabalho em equipe.

As camadas utilizadas foram:

Camada de Apresentação (UI): responsável pelas telas do sistema e pela interação com o usuário.
Camada de Negócio (Service): responsável pelas regras de funcionamento do sistema, validações e cálculos.
Camada de Dados (Repository): responsável por armazenar, consultar, atualizar e remover as informações do banco de dados.
Como a Arquitetura Foi Aplicada
Camada de Apresentação

Essa camada recebe os dados informados pelo usuário, como código, nome, quantidade e preço do produto. Também exibe a lista de produtos cadastrados e destaca em vermelho aqueles que estão com estoque zerado, facilitando a identificação dos itens que precisam ser repostos.

Camada de Negócio

Antes de salvar qualquer informação, essa camada verifica se os dados são válidos. Ela impede o cadastro de quantidades e preços negativos e realiza automaticamente o cálculo do valor total do produto, multiplicando a quantidade pelo preço unitário.

Fórmula utilizada:

Valor Total = Quantidade × Preço Unitário

Camada de Dados

Essa camada é responsável por armazenar todas as informações no banco de dados. Ela permite cadastrar, editar, excluir e consultar produtos, garantindo que os dados permaneçam salvos mesmo após o fechamento da aplicação.

Regras de Negócio e Funcionalidades

O sistema possui as seguintes funcionalidades:

Cadastro de produtos com código único.
Registro do nome, quantidade e preço de cada item.
Cálculo automático do valor total dos produtos.
Validação para impedir o cadastro de valores negativos.
Destaque em vermelho para produtos com estoque igual a zero.
Consulta e atualização das informações do estoque.
Responsabilidades da Equipe

As atividades foram divididas entre os integrantes para facilitar o desenvolvimento do projeto.

Interface: desenvolvimento das telas, formulários e estilização da aplicação.
Lógica de Negócio: implementação das validações, cálculos automáticos e regras do sistema.
Banco de Dados: criação da estrutura de armazenamento, integração com o sistema e controle dos registros dos produtos.
