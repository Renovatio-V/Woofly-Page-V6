/* ========================
   PERFIL PAGE LOGIC
   ======================== */
document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  initIcons();
  loadPersonalData();
  renderPets();
});

function switchTab(tabId, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + tabId).classList.add('active');
  if (tabId === 'misMascotas') renderPets();
}

function loadPersonalData() {
  const user = WF.getUser();
  // Pre-fill name with logged-in user
  const el = document.getElementById('pfNombre');
  if (el && el.value === '') el.value = user;
}

function renderPets() {
  const state = WF.getState();
  const grid  = document.getElementById('petGrid');
  grid.innerHTML = '';
  state.mascotas.forEach(pet => {
    const card = document.createElement('div');
    card.className = 'pet-card';
    card.innerHTML = `
      <div class="pet-avatar">${pet.emoji}</div>
      <div class="pet-name">${pet.nombre}</div>
      <div class="pet-breed">${pet.raza}</div>
      <div class="pet-age">${pet.edad}</div>
    `;
    grid.appendChild(card);
  });
  const addCard = document.createElement('div');
  addCard.className = 'add-pet-card';
  addCard.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="16"/>
      <line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
    <span style="margin-top:8px;">Agregar Mascota</span>
  `;
  addCard.onclick = () => showToast('Función próximamente disponible', 'info');
  grid.appendChild(addCard);
}

function guardarPerfil() {
  showToast('Perfil actualizado correctamente', 'success');
}

function doLogout() {
  WF.logout();
  window.location.href = '../index.html';
}
