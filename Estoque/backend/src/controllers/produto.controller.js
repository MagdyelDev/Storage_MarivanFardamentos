const produtoService = require("../services/produto.service");

// O controller só traduz HTTP <-> chamadas de service.
// Nenhuma regra de negócio e nenhuma query aparecem aqui.

function listar(req, res, next) {
  try {
    const produtos = produtoService.listarProdutos();
    res.json(produtos);
  } catch (err) {
    next(err);
  }
}

function buscarPorId(req, res, next) {
  try {
    const produto = produtoService.buscarProdutoPorId(req.params.id);
    res.json(produto);
  } catch (err) {
    next(err);
  }
}

function criar(req, res, next) {
  try {
    console.log('req.body no controller:', req.body);
    const novoProduto = produtoService.criarProduto(req.body);
    console.log('novoProduto:', novoProduto);
    res.status(201).json(novoProduto);
  } catch (err) {
    console.error('erro criar produto:', err);
    next(err);
  }
}

function atualizar(req, res, next) {
  try {
    const produtoAtualizado = produtoService.atualizarProduto(req.params.id, req.body);
    res.json(produtoAtualizado);
  } catch (err) {
    next(err);
  }
}

function remover(req, res, next) {
  try {
    produtoService.removerProduto(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
