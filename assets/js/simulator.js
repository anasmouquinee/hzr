/**
 * KZR Consulting - Interactive Multiservices Estimator
 * Real-time scope and project sizing tool for corporate clients and copropriétés in Morocco.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSimulator();
});

function initSimulator() {
  const container = document.getElementById('kzr-simulator');
  if (!container) return;

  const checkboxes = container.querySelectorAll('.kzr-sim-checkbox');
  const propertySelect = document.getElementById('sim-property-type');
  const sizeSlider = document.getElementById('sim-size-slider');
  const sizeValueBadge = document.getElementById('sim-size-val');
  
  // Output fields
  const countEl = document.getElementById('sim-out-count');
  const teamEl = document.getElementById('sim-out-team');
  const freqEl = document.getElementById('sim-out-freq');
  const tierNameEl = document.getElementById('sim-out-tier-name');
  const tierEstEl = document.getElementById('sim-out-tier-est');
  const whatsappBtn = document.getElementById('sim-whatsapp-btn');
  const quoteAnchor = document.getElementById('sim-quote-btn');

  function calculateEstimate() {
    const selectedServices = [];
    checkboxes.forEach(cb => {
      if (cb.checked) {
        selectedServices.push(cb.value);
      }
    });

    const propertyType = propertySelect ? propertySelect.value : 'residence';
    const size = sizeSlider ? parseInt(sizeSlider.value, 10) : 25;

    // Update slider label
    if (sizeValueBadge) {
      if (propertyType === 'bureaux' || propertyType === 'commerce') {
        sizeValueBadge.textContent = `${size * 20} m²`;
      } else if (propertyType === 'villa') {
        sizeValueBadge.textContent = `${size * 15} m² de terrain/bâti`;
      } else {
        sizeValueBadge.textContent = `${size} lots / appartements`;
      }
    }

    const serviceCount = selectedServices.length;

    // Update Selected Poles Count
    if (countEl) {
      countEl.textContent = `${serviceCount} Pôle${serviceCount > 1 ? 's' : ''} Sélectionné${serviceCount > 1 ? 's' : ''}`;
    }

    // Determine staffing / team recommendation
    let teamRecommendation = 'Équipe mobile d’intervention KZR';
    let frequencyText = 'Interventions planifiées sur mesure';
    let tierName = 'Formule Initiale';
    let estimateRange = 'Sur Étude';

    if (serviceCount === 0) {
      teamRecommendation = 'Veuillez sélectionner au moins 1 pôle';
      frequencyText = '—';
      tierName = 'Sélection requise';
      estimateRange = '— MAD';
    } else if (serviceCount === 1) {
      teamRecommendation = '1 Chef d’équipe + Agents spécialisés';
      frequencyText = 'Hebdomadaire ou selon cahier des charges';
      tierName = 'Pôle Dédié Mono-Service';
      estimateRange = size > 30 ? 'Devis Personnalisé' : 'Étude Sous 24h';
    } else if (serviceCount >= 2 && serviceCount <= 3) {
      teamRecommendation = '1 Responsable de Site + 2 à 4 Agents KZR';
      frequencyText = 'Présence continue ou quotidienne';
      tierName = 'Pack Synergie Multiservices';
      estimateRange = 'Tarif Préférentiel Groupé';
    } else {
      teamRecommendation = '1 Property Manager Dédié + Équipe Permanente Polyvalente';
      frequencyText = 'Supervision 24/7 & Astreinte d’urgence';
      tierName = 'Pack Intégral Clé en Main (Full KZR)';
      estimateRange = 'Contrat Cadre Tout Compris';
    }

    if (teamEl) teamEl.textContent = teamRecommendation;
    if (freqEl) freqEl.textContent = frequencyText;
    if (tierNameEl) tierNameEl.textContent = tierName;
    if (tierEstEl) tierEstEl.textContent = estimateRange;

    // Build WhatsApp Message with estimate summary
    if (whatsappBtn) {
      const servicesList = selectedServices.join(', ') || 'Aucun';
      const msg = `Bonjour KZR Consulting,%0A%0AJe souhaite obtenir un devis basé sur votre simulateur en ligne :%0A- Pôles souhaités : ${servicesList}%0A- Type de bien : ${propertyType}%0A- Envergure : ${sizeValueBadge ? sizeValueBadge.textContent : size}%0A- Formule recommandée : ${tierName}%0A%0AMerci de me recontacter sous 24h.`;
      whatsappBtn.href = `https://wa.me/212661250118?text=${msg}`;
    }

    // Pre-fill contact form anchor
    if (quoteAnchor) {
      quoteAnchor.addEventListener('click', (e) => {
        const formServiceSelect = document.getElementById('form-service');
        const formNotes = document.getElementById('form-message');
        if (formServiceSelect && selectedServices.length > 0) {
          formServiceSelect.value = selectedServices.length > 1 ? 'pack-multiservices' : selectedServices[0];
        }
        if (formNotes && selectedServices.length > 0) {
          formNotes.value = `Simulation en ligne : Pôles [${selectedServices.join(', ')}] pour bien type [${propertyType}], taille [${sizeValueBadge ? sizeValueBadge.textContent : size}].`;
        }
      });
    }
  }

  // Bind change events
  checkboxes.forEach(cb => cb.addEventListener('change', calculateEstimate));
  if (propertySelect) propertySelect.addEventListener('change', calculateEstimate);
  if (sizeSlider) sizeSlider.addEventListener('input', calculateEstimate);

  // Initial calculation
  calculateEstimate();
}
