/* ========================
   HISTORIAL PAGE LOGIC
   ======================== */
document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  initIcons();
  renderHistorial();
});

function renderHistorial() {
  const state        = WF.getState();
  const filtro       = document.getElementById('histMascotaFilter').value;
  const list         = document.getElementById('historialList');
  let data           = state.historial;
  if (filtro !== 'todas') data = data.filter(h => h.mascota === filtro);

  list.innerHTML = '';
  if (data.length === 0) {
    list.innerHTML = '<p style="color:var(--verde-s);text-align:center;padding:40px;">No hay registros para esta mascota.</p>';
    return;
  }
  data.forEach(h => {
    const stars = '★'.repeat(h.estrellas) + '☆'.repeat(5 - h.estrellas);
    const div   = document.createElement('div');
    div.className = 'hist-card';
    div.innerHTML = `
      <div class="hist-card-header">
        <div class="hist-card-left">
          <div class="hist-icon-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
                 stroke="#E87C5B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <div>
            <div class="hist-service">${h.servicio}</div>
            <div class="hist-date">${h.fecha}</div>
            <div class="hist-pet">Mascota: ${h.mascota}</div>
          </div>
        </div>
        <div class="stars">${stars}</div>
      </div>
      <div class="hist-detail">
        <div class="hist-field"><label>👤 Doctor</label><p>${h.doctor}</p></div>
        <div class="hist-field"><label>🔬 Especialidad</label><p>${h.especialidad}</p></div>
        <div class="hist-field full"><label>📋 Diagnóstico</label><p>${h.diagnostico}</p></div>
        <div class="hist-field full"><label>💊 Prescripción</label><p>${h.prescripcion}</p></div>
      </div>
      ${h.reseña ? `<div class="hist-review"><strong>Tu reseña:</strong> "${h.reseña}"</div>` : ''}
    `;
    list.appendChild(div);
  });
}

function doLogout() {
  WF.logout();
  window.location.href = '../index.html';
}
