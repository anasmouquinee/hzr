/**
 * KZR Consulting - Contact & Quote Form Handling
 * Validates inputs, handles WhatsApp direct submission, provides instant user feedback
 * with zero browser alert() popups for a high-end luxury UX.
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('kzr-quote-form');
  if (!form) return;

  const nameInput = document.getElementById('form-name');
  const phoneInput = document.getElementById('form-phone');
  const emailInput = document.getElementById('form-email');
  const serviceSelect = document.getElementById('form-service');
  const cityInput = document.getElementById('form-city');
  const messageInput = document.getElementById('form-message');
  const feedbackEl = document.getElementById('form-feedback');
  const directWaBtn = document.getElementById('form-direct-wa');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Auto-format Morocco phone number on blur
  if (phoneInput) {
    phoneInput.addEventListener('blur', () => {
      let val = phoneInput.value.trim().replace(/\s+/g, '');
      if (val.startsWith('0') && val.length === 10) {
        phoneInput.value = `+212 ${val.substring(1, 3)} ${val.substring(3, 5)} ${val.substring(5, 7)} ${val.substring(7, 10)}`;
      }
    });

    phoneInput.addEventListener('input', () => {
      phoneInput.classList.remove('input-error');
    });
  }

  if (nameInput) {
    nameInput.addEventListener('input', () => nameInput.classList.remove('input-error'));
  }
  if (serviceSelect) {
    serviceSelect.addEventListener('change', () => serviceSelect.classList.remove('input-error'));
  }

  // Direct WhatsApp quote generator button
  if (directWaBtn) {
    directWaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = nameInput?.value.trim() || 'Client';
      const service = serviceSelect?.options[serviceSelect.selectedIndex]?.text || serviceSelect?.value || 'Non spécifié';
      const city = cityInput?.value.trim() || 'Casablanca';
      const message = messageInput?.value.trim() || 'Demande d\'étude et devis multiservices';

      const text = `Bonjour KZR Consulting,%0A%0AJe m'appelle *${encodeURIComponent(name)}* (Ville : ${encodeURIComponent(city)}).%0A%0A*Service souhaité :* ${encodeURIComponent(service)}%0A*Détails du projet :* ${encodeURIComponent(message)}%0A%0AMerci de me faire parvenir votre meilleure proposition.`;
      window.open(`https://wa.me/212661250118?text=${text}`, '_blank');
    });
  }

  // Form submission handler with inline validation
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let hasErrors = false;
    const errors = [];

    if (!nameInput || !nameInput.value.trim()) {
      if (nameInput) nameInput.classList.add('input-error');
      errors.push('Votre nom ou raison sociale');
      hasErrors = true;
    }

    if (!phoneInput || !phoneInput.value.trim()) {
      if (phoneInput) phoneInput.classList.add('input-error');
      errors.push('Votre numéro de téléphone');
      hasErrors = true;
    }

    if (!serviceSelect || !serviceSelect.value) {
      if (serviceSelect) serviceSelect.classList.add('input-error');
      errors.push('Le pôle de service concerné');
      hasErrors = true;
    }

    if (hasErrors) {
      if (feedbackEl) {
        feedbackEl.className = 'kzr-form-feedback error';
        feedbackEl.innerHTML = `
          <i class="fa-solid fa-circle-exclamation" style="font-size: 1.25rem; color: #ef4444;"></i>
          <div>
            <strong>Champs obligatoires manquants :</strong><br>
            Veuillez renseigner : ${errors.join(', ')}.
          </div>
        `;
        feedbackEl.style.display = 'flex';
        feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Simulate submission with button state
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Transmission en cours...</span>`;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }

      if (feedbackEl) {
        feedbackEl.className = 'kzr-form-feedback success';
        feedbackEl.innerHTML = `
          <i class="fa-solid fa-circle-check" style="font-size: 1.35rem; color: #10b981;"></i>
          <div>
            <strong>Demande transmise avec succès !</strong><br>
            Votre dossier d'étude a bien été pris en compte. Un responsable technique KZR Consulting Casablanca prendra contact avec vous sous 24h ouvrées.
          </div>
        `;
        feedbackEl.style.display = 'flex';
        form.reset();
        feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 600);
  });
}
