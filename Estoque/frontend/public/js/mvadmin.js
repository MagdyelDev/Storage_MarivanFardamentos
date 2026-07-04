const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

function openTab(tabName) {
  tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.tab === tabName));
  panels.forEach((panel) => panel.classList.toggle('active', panel.id === tabName));
}

async function carregarUsuarios() {
  const response = await fetch('/api/usuarios');
  const usuarios = await response.json();
  const tbody = document.getElementById('listaUsuarios');
  tbody.innerHTML = '';

  if (!usuarios.length) {
    tbody.innerHTML = '<tr><td colspan="4">Nenhum usuário cadastrado.</td></tr>';
    return;
  }

  usuarios.forEach((usuario) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${usuario.nome}</td>
      <td>${usuario.email}</td>
      <td>${usuario.criado_em}</td>
      <td><button class="btn-delete" onclick="removerUsuario(${usuario.id})">Excluir</button></td>`;
    tbody.appendChild(tr);
  });
}

async function removerUsuario(id) {
  if (!confirm('Deseja remover este usuário?')) return;
  const response = await fetch(`/api/usuarios/${id}`, { method: 'DELETE' });
  if (response.ok) {
    carregarUsuarios();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  tabs.forEach((tab) => tab.addEventListener('click', () => openTab(tab.dataset.tab)));
  carregarUsuarios();
});

window.openTab = openTab;
window.removerUsuario = removerUsuario;
