async function carregarResumo() {
  const response = await fetch('/api/produtos');
  const produtos = await response.json();
  const faltantes = produtos.filter((item) => Number(item.quantidade) <= 5);
  const resumo = document.getElementById('resumo');
  resumo.innerHTML = '';

  if (faltantes.length === 0) {
    resumo.innerHTML = '<div class="item"><strong>Parabéns!</strong><span>Não há itens com estoque baixo no momento.</span></div>';
    return;
  }

  faltantes.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `<span>${item.nome}</span><strong>${item.quantidade}</strong>`;
    resumo.appendChild(div);
  });

  const tbody = document.getElementById('tabela-baixa');
  tbody.innerHTML = '';
  faltantes.forEach((item) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${item.nome}</td><td class="status-low">${item.quantidade}</td><td>R$ ${Number(item.preco).toFixed(2)}</td>`;
    tbody.appendChild(tr);
  });
}

function logout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = '/';
}

document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
  if (!usuario) {
    window.location.href = '/';
    return;
  }
  carregarResumo();
});
