/* ========================
   CITAS PAGE LOGIC
   ======================== */
let citaFilter = 'todas';

document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  initIcons();
  renderCitas();
  // Close modal on overlay click
  document.querySelectorAll('.modal-overlay').forEach(o => {
    o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); });
  });
});

function filterCitas(filter, btn) {
  citaFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCitas();
}

function renderCitas() {
  const state = WF.getState();
  const list  = document.getElementById('citasList');
  const empty = document.getElementById('citasEmpty');

  const filtered = citaFilter === 'todas'
    ? state.citas
    : state.citas.filter(c => c.estado === citaFilter);

  // Update counts
  ['todas', 'pendiente', 'confirmada', 'completada'].forEach(s => {
    const count = s === 'todas' ? state.citas.length : state.citas.filter(c => c.estado === s).length;
    document.querySelectorAll('.citas-count-' + s).forEach(el => el.textContent = count);
  });

  list.innerHTML = '';
  if (filtered.length === 0) {
    empty.style.display = 'block';
    initIcons();
    return;
  }
  empty.style.display = 'none';

  filtered.forEach(c => {
    const div = document.createElement('div');
    div.className = 'cita-card ' + c.estado;
    div.innerHTML = `
      <div class="cita-info">
        <div class="cita-title">${c.servicio} — ${c.mascota}</div>
        <div class="cita-meta">📅 ${c.fecha} &nbsp;🕐 ${c.hora} &nbsp;| Dr/a. Asignado por confirmar</div>
      </div>
      <span class="cita-badge badge-${c.estado}">${c.estado.charAt(0).toUpperCase() + c.estado.slice(1)}</span>
    `;
    list.appendChild(div);
  });
}

function openModal(id) {
  document.getElementById(id).classList.add('open');
  initIcons();
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function guardarCita() {
  const mascota = document.getElementById('citaMascota').value;
  const servicio = document.getElementById('citaServicio').value;
  const fecha    = document.getElementById('citaFecha').value;
  const hora     = document.getElementById('citaHora').value;
  if (!mascota || !servicio || !fecha || !hora) {
    showToast('Completa todos los campos', 'error'); return;
  }
  const state = WF.getState();
  state.citas.push({ mascota, servicio, fecha, hora, estado: 'pendiente' });
  WF.setState(state);
  closeModal('modalNuevaCita');
  renderCitas();
  showToast('Cita registrada correctamente', 'success');
  ['citaMascota', 'citaServicio', 'citaFecha', 'citaHora'].forEach(id => {
    document.getElementById(id).value = '';
  });
}

function doLogout() {
  WF.logout();
  window.location.href = '../index.html';
}
