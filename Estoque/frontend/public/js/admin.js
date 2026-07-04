const $ = (id) => document.getElementById(id);
const messageBox = $('message');

function showMessage(text, type = 'success') {
  messageBox.textContent = text;
  messageBox.className = `message ${type}`;
  messageBox.style.display = 'block';
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

$('btnCriar').addEventListener('click', async () => {
  const payload = {
    nome: $('nome').value.trim(),
    email: $('email').value.trim(),
    senha: $('senha').value
  };

  if (!payload.nome || !payload.email || !payload.senha) {
    showMessage('Preencha todos os campos.', 'error');
    return;
  }

  if (!validarEmail(payload.email)) {
    showMessage('Digite um e-mail válido.', 'error');
    return;
  }

  try {
    const response = await fetch('/api/auth/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.erro || 'Não foi possível criar o usuário.');
    }

    showMessage('Usuário criado com sucesso. Você pode voltar para a tela de login.', 'success');
  } catch (error) {
    showMessage(error.message, 'error');
  }
});
