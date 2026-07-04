const messageBox = document.getElementById('message');

function showMessage(text, type = 'success') {
  messageBox.textContent = text;
  messageBox.className = `message ${type}`;
  messageBox.style.display = 'block';
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.getElementById('btnEntrar').addEventListener('click', async () => {
  const payload = {
    email: document.getElementById('email').value.trim(),
    senha: document.getElementById('senha').value
  };

  if (!validarEmail(payload.email)) {
    showMessage('Digite um e-mail válido.', 'error');
    return;
  }

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.erro || 'Não foi possível fazer login.');
    }

    localStorage.setItem('usuarioLogado', JSON.stringify(data.usuario));
    showMessage('Login realizado com sucesso!', 'success');
    window.location.href = '/pages/index.html';
  } catch (error) {
    showMessage(error.message, 'error');
  }
});
