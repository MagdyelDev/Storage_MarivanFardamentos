const form = document.getElementById('produtoForm');
const lista = document.getElementById('listaProdutos');
const filtro = document.getElementById('filtro');
const btnCancelar = document.getElementById('btnCancelar');

async function carregarProdutos() {
  const response = await fetch('/api/produtos', { cache: 'no-store' });
  const produtos = await response.json();
  const termo = filtro.value.toLowerCase();
  const filtrados = produtos.filter((produto) => {
    const texto = `${produto.codigo || ''} ${produto.nome || ''}`.toLowerCase();
    return texto.includes(termo);
  });

  lista.innerHTML = '';
  if (filtrados.length === 0) {
    lista.innerHTML = '<tr><td colspan="6">Nenhum produto encontrado.</td></tr>';
    return;
  }

  filtrados.forEach((produto) => {
    const codigoTexto = produto.codigo === undefined || produto.codigo === null || produto.codigo === '' ? '-' : produto.codigo;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${codigoTexto}</td>
      <td>${produto.nome}</td>
      <td>${produto.quantidade}</td>
      <td>R$ ${Number(produto.preco).toFixed(2)}</td>
      <td>R$ ${(Number(produto.quantidade) * Number(produto.preco)).toFixed(2)}</td>
      <td class="actions-cell">
        <button class="btn-edit" onclick="editarProduto(${produto.id})">Editar</button>
        <button class="btn-delete" onclick="removerProduto(${produto.id})">Excluir</button>
      </td>`;
    lista.appendChild(tr);
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const codigoInput = document.getElementById('codigo');
  const payload = {
    codigo: String(codigoInput.value).trim(),
    nome: document.getElementById('nome').value.trim(),
    quantidade: Number(document.getElementById('quantidade').value),
    preco: Number(document.getElementById('preco').value)
  };
  const id = document.getElementById('produtoId').value;

  const response = await fetch(`/api/produtos${id ? '/' + id : ''}`, {
    method: id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store'
  });

  if (response.ok) {
    form.reset();
    document.getElementById('produtoId').value = '';
    carregarProdutos();
  }
});

async function editarProduto(id) {
  const response = await fetch(`/api/produtos/${id}`, { cache: 'no-store' });
  const produto = await response.json();
  document.getElementById('produtoId').value = produto.id;
  document.getElementById('codigo').value = produto.codigo || '';
  document.getElementById('nome').value = produto.nome;
  document.getElementById('quantidade').value = produto.quantidade;
  document.getElementById('preco').value = produto.preco;
}

async function removerProduto(id) {
  if (!confirm('Deseja remover este produto?')) return;
  const response = await fetch(`/api/produtos/${id}`, { method: 'DELETE', cache: 'no-store' });
  if (response.ok) {
    carregarProdutos();
  }
}

btnCancelar.addEventListener('click', () => {
  form.reset();
  document.getElementById('produtoId').value = '';
});

filtro.addEventListener('input', carregarProdutos);

document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
  if (!usuario) {
    window.location.href = '/';
    return;
  }
  carregarProdutos();
});

function logout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = '/';
}
