/* ========================
   LOGIN PAGE LOGIC
   ======================== */
document.addEventListener('DOMContentLoaded', () => {
  // If already logged in, skip to dashboard
  if (WF.isLoggedIn()) {
    window.location.href = 'pages/dashboard.html';
    return;
  }
  initIcons();

  ['loginUser', 'loginPass'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => {
      if (e.key === 'Enter') doLogin();
    });
  });
});

function doLogin() {
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value.trim();
  if (!u || !p) { showToast('Ingresa usuario y contraseña', 'error'); return; }
  WF.login(u);
  showToast('¡Bienvenido, ' + u + '!', 'success');
  setTimeout(() => { window.location.href = 'pages/dashboard.html'; }, 700);
}

function togglePwd() {
  const inp = document.getElementById('loginPass');
  const ico = document.getElementById('eyeIcon');
  if (inp.type === 'password') {
    inp.type = 'text';
    ico.setAttribute('data-lucide', 'eye-off');
  } else {
    inp.type = 'password';
    ico.setAttribute('data-lucide', 'eye');
  }
  lucide.createIcons();
}
