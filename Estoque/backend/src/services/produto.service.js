const produtoRepository = require("../repositories/produto.repository");
const ApiError = require("../utils/ApiError");

// Regras de negócio e validação vivem aqui — nunca no controller,
// nunca na repository. O controller só chama estas funções.

function listarProdutos() {
  return produtoRepository.findAll();
}

function buscarProdutoPorId(id) {
  const produto = produtoRepository.findById(id);
  if (!produto) {
    throw new ApiError(404, "Produto não encontrado.");
  }
  return produto;
}

function normalizarCodigo(codigo) {
  if (codigo === undefined || codigo === null || `${codigo}`.trim() === "") {
    return null;
  }

  const codigoTexto = `${codigo}`.trim();
  if (!/^\d+$/.test(codigoTexto)) {
    throw new ApiError(400, "O campo 'codigo' deve conter apenas números.");
  }

  return codigoTexto;
}

function validarDadosProduto({ codigo, nome, quantidade, preco }) {
  const codigoNormalizado = normalizarCodigo(codigo);

  if (!nome || typeof nome !== "string" || !nome.trim()) {
    throw new ApiError(400, "O campo 'nome' é obrigatório.");
  }
  if (quantidade === undefined || isNaN(quantidade) || Number(quantidade) < 0) {
    throw new ApiError(400, "O campo 'quantidade' deve ser um número maior ou igual a 0.");
  }
  if (preco === undefined || isNaN(preco) || Number(preco) < 0) {
    throw new ApiError(400, "O campo 'preco' deve ser um número maior ou igual a 0.");
  }

  return codigoNormalizado;
}

function criarProduto(dados) {
  console.log('dados recebidos no service:', dados);
  const codigo = validarDadosProduto(dados);
  console.log('codigo normalizado:', codigo);
  const quantidade = Number(dados.quantidade);
  const preco = Number(dados.preco);
  const nome = (dados.nome || '').trim();

  const produtoExistente = codigo ? produtoRepository.findByCodigo(codigo) : null;
  if (produtoExistente) {
    return produtoRepository.update(produtoExistente.id, {
      codigo,
      nome,
      quantidade: Number(produtoExistente.quantidade) + quantidade,
      preco,
    });
  }

  return produtoRepository.create({
    codigo,
    nome,
    quantidade,
    preco,
  });
}

function atualizarProduto(id, dados) {
  buscarProdutoPorId(id); // garante 404 se o produto não existir
  const codigo = validarDadosProduto(dados);

  return produtoRepository.update(id, {
    codigo,
    nome: dados.nome.trim(),
    quantidade: Number(dados.quantidade),
    preco: Number(dados.preco),
  });
}

function removerProduto(id) {
  buscarProdutoPorId(id); // garante 404 se o produto não existir
  produtoRepository.remove(id);
}

module.exports = {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  removerProduto,
};
