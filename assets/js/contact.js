/**
 * KZR Consulting - Contact & Quote Form Handling
 * Validates inputs, handles WhatsApp direct submission and provides instant user feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('kzr-quote-form');
  if (!form) return;

  const phoneInput = document.getElementById('form-phone');
  const feedbackEl = document.getElementById('form-feedback');
  const directWaBtn = document.getElementById('form-direct-wa');

  // Helper: auto-format Morocco phone number on blur
  if (phoneInput) {
    phoneInput.addEventListener('blur', () => {
      let val = phoneInput.value.trim().replace(/\s+/g, '');
      if (val.startsWith('0') && val.length === 10) {
        phoneInput.value = `+212 ${val.substring(1, 3)} ${val.substring(3, 5)} ${val.substring(5, 7)} ${val.substring(7, 10)}`;
      }
    });
  }

  // Direct WhatsApp quote generator
  if (directWaBtn) {
    directWaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value.trim() || 'Client';
      const service = document.getElementById('form-service')?.value || 'Non spécifié';
      const city = document.getElementById('form-city')?.value.trim() || 'Casablanca';
      const message = document.getElementById('form-message')?.value.trim() || 'Demande de devis';

      const text = `Bonjour KZR Consulting,%0A%0AJe m'appelle *${encodeURIComponent(name)}* (Ville : ${encodeURIComponent(city)}).%0A%0A*Service souhaité :* ${encodeURIComponent(service)}%0A*Détails :* ${encodeURIComponent(message)}%0A%0AMerci de me faire parvenir votre meilleure proposition.`;
      window.open(`https://wa.me/212661250118?text=${text}`, '_blank');
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name');
    const phone = document.getElementById('form-phone');
    const email = document.getElementById('form-email');
    const service = document.getElementById('form-service');

    if (!name.value.trim() || !phone.value.trim() || !service.value) {
      alert('Veuillez remplir les champs obligatoires (Nom, Téléphone et Pôle de service).');
      return;
    }

    // Show success feedback
    if (feedbackEl) {
      feedbackEl.className = 'kzr-form-feedback success';
      feedbackEl.innerHTML = `
        <i class="fa-solid fa-circle-check" style="font-size: 1.25rem;"></i>
        <div>
          <strong>Demande transmise avec succès !</strong><br>
          Un responsable KZR Consulting Casablanca prendra contact avec vous sous 24h ouvrées.
        </div>
      `;
      feedbackEl.style.display = 'flex';
      form.reset();

      // Smooth scroll to feedback
      feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}
