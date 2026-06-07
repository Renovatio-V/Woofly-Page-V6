/* ========================
   SHARED STATE & UTILITIES
   ======================== */

// Shared state stored in sessionStorage so all pages can read it
const WF = {
  getState() {
    const raw = sessionStorage.getItem('woofly_state');
    if (raw) return JSON.parse(raw);
    // Default state
    return {
      user: 'Juan',
      citas: [],
      historial: [
        {
          id: 1, servicio: 'Consulta General', fecha: '2026-04-15', mascota: 'Max',
          doctor: 'Dra. María González', especialidad: 'Medicina Veterinaria General',
          diagnostico: 'Infección leve en el oído. Se recomienda limpieza regular y tratamiento antibiótico.',
          prescripcion: 'Gotas óticas antibióticas, 2 gotas cada 12 horas por 7 días',
          estrellas: 5, reseña: 'Excelente atención, la doctora fue muy cuidadosa con Max.'
        },
        {
          id: 2, servicio: 'Vacunación Anual', fecha: '2025-11-10', mascota: 'Luna',
          doctor: 'Dr. Carlos Rueda', especialidad: 'Medicina Preventiva',
          diagnostico: 'Mascota en buen estado de salud. Vacunas al día.',
          prescripcion: 'Próxima vacunación en 12 meses.',
          estrellas: 4, reseña: 'Muy buen servicio y trato amable.'
        },
        {
          id: 3, servicio: 'Desparasitación', fecha: '2025-09-05', mascota: 'Max',
          doctor: 'Dra. María González', especialidad: 'Medicina Veterinaria General',
          diagnostico: 'Desparasitación interna y externa preventiva.',
          prescripcion: 'Antiparasitario oral. Repetir en 3 meses.',
          estrellas: 5, reseña: ''
        }
      ],
      mascotas: [
        { nombre: 'Max',   emoji: '🐕', raza: 'Labrador Retriever', edad: '3 años' },
        { nombre: 'Luna',  emoji: '🐈', raza: 'Gato Siamés',        edad: '2 años' },
        { nombre: 'Rocky', emoji: '🐶', raza: 'Bulldog Francés',    edad: '5 años' }
      ]
    };
  },
  setState(data) {
    sessionStorage.setItem('woofly_state', JSON.stringify(data));
  },
  isLoggedIn() {
    return sessionStorage.getItem('wf_logged') === 'true';
  },
  login(user) {
    sessionStorage.setItem('wf_logged', 'true');
    sessionStorage.setItem('wf_user', user);
  },
  logout() {
    sessionStorage.removeItem('wf_logged');
    sessionStorage.removeItem('wf_user');
  },
  getUser() {
    return sessionStorage.getItem('wf_user') || 'Usuario';
  }
};

// Guard: redirect to login if not authenticated (call on each protected page)
function requireAuth() {
  if (!WF.isLoggedIn()) {
    window.location.href = '../index.html';
  }
}

// Toast notification
function showToast(msg, type = 'info') {
  let cont = document.getElementById('toastContainer');
  if (!cont) {
    cont = document.createElement('div');
    cont.id = 'toastContainer';
    cont.className = 'toast-container';
    document.body.appendChild(cont);
  }
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.innerHTML = `<span style="font-size:18px;">${icons[type]}</span> ${msg}`;
  cont.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transition = 'opacity .4s';
    setTimeout(() => t.remove(), 400);
  }, 3200);
}

// Init Lucide icons after DOM ready
function initIcons() {
  if (window.lucide) lucide.createIcons();
}
