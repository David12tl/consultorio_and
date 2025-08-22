// Pon aquí tu URL real de AlwaysData (HTTPS)
const API_BASE = 'http://clinical.alwaysdata.net/';

const form = document.getElementById('loginForm');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const Nombre = document.getElementById('Nombre').value.trim();
  const password = document.getElementById('password').value;

  if (!Nombre || !password) {
    alert('Por favor completa ambos campos.');
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/login.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Nombre, password }) // claves deben coincidir con login.php
    });

    const data = await res.json();

    if (data.success) {
      // muestra el mensaje de éxito si lo tienes
      const success = document.getElementById('successMessage');
      if (success) success.style.display = 'block';

      // redirige a tu dashboard
      setTimeout(() => {
        window.location.href = '/dashboard.html';
      }, 1500);
    } else {
      alert(data.message || 'Credenciales inválidas');
    }
  } catch (err) {
    console.error(err);
    alert('No se pudo conectar con el servidor. Revisa la URL del backend y CORS.');
  }
});
