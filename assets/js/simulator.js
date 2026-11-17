/**
 * KZR Consulting - Interactive Multiservices Estimator & Printable Devis Engine
 * Real-time scope and project sizing tool for corporate clients and copropriétés in Morocco.
 * Features:
 * - Dynamic formula calculation based on selected poles, property type, and surface/lots.
 * - WhatsApp direct simulation sharing.
 * - Printable / PDF Devis Exporter with official corporate layout, SLA guarantees, and signature fields.
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

  // Friendly names for services
  const SERVICE_NAMES = {
    syndic: 'Syndic de Copropriété (Loi 18-00)',
    securite: 'Sécurité Privée & Gardiennage 24/7',
    nettoyage: 'Nettoyage Professionnel & Hygiène',
    renovation: 'Rénovation & Travaux Tous Corps d’État',
    amenagement: 'Aménagement d’Intérieur & Décoration 3D',
    'espaces-verts': 'Espaces Verts & Paysagisme Durable'
  };

  /**
   * Current simulation state
   */
  let currentSimulation = {
    selectedServices: [],
    propertyType: '',
    sizeText: '',
    tierName: '',
    teamRecommendation: '',
    frequencyText: '',
    estimateRange: ''
  };

  function calculateEstimate() {
    const selectedKeys = [];
    checkboxes.forEach(cb => {
      if (cb.checked) {
        selectedKeys.push(cb.value);
      }
    });

    const propertyType = propertySelect ? propertySelect.value : 'Immeuble résidentiel / Copropriété';
    const size = sizeSlider ? parseInt(sizeSlider.value, 10) : 30;

    // Update slider label
    let sizeLabel = `${size} lots / appartements`;
    if (sizeValueBadge) {
      if (propertyType.includes('Bureaux') || propertyType.includes('Showroom') || propertyType.includes('Local')) {
        sizeLabel = `${size * 25} m² de surface`;
      } else if (propertyType.includes('Villa') || propertyType.includes('Domaine')) {
        sizeLabel = `${size * 18} m² terrain & bâti`;
      } else {
        sizeLabel = `${size} lots / appartements`;
      }
      sizeValueBadge.textContent = sizeLabel;
    }

    const serviceCount = selectedKeys.length;

    // Update Selected Poles Count Badge
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
      teamRecommendation = '1 Chef d’équipe + Agents spécialisés KZR';
      frequencyText = 'Hebdomadaire ou selon cahier des charges';
      tierName = 'Pôle Dédié Mono-Service';
      estimateRange = size > 30 ? 'Devis Sur-Mesure sous 24h' : 'Étude Préliminaire Gratuite';
    } else if (serviceCount >= 2 && serviceCount <= 3) {
      teamRecommendation = '1 Responsable de Site + 2 à 4 Agents KZR Dédiés';
      frequencyText = 'Présence continue ou quotidienne planifiée';
      tierName = 'Pack Synergie Multiservices';
      estimateRange = 'Tarif Préférentiel Groupé (Économies ~20%)';
    } else {
      teamRecommendation = '1 Property Manager Dédié + Équipe Permanente Polyvalente';
      frequencyText = 'Supervision 24/7 & Astreinte d’urgence immédiate';
      tierName = 'Pack Intégral Clé en Main (Full KZR)';
      estimateRange = 'Contrat Cadre Tout Compris & Audit Annuel Offert';
    }

    if (teamEl) teamEl.textContent = teamRecommendation;
    if (freqEl) freqEl.textContent = frequencyText;
    if (tierNameEl) tierNameEl.textContent = tierName;
    if (tierEstEl) tierEstEl.textContent = estimateRange;

    // Save simulation state
    currentSimulation = {
      selectedServices: selectedKeys,
      propertyType: propertyType,
      sizeText: sizeLabel,
      tierName: tierName,
      teamRecommendation: teamRecommendation,
      frequencyText: frequencyText,
      estimateRange: estimateRange
    };

    // Update WhatsApp link
    if (whatsappBtn) {
      const servicesReadable = selectedKeys.map(k => SERVICE_NAMES[k] || k).join(', ') || 'Aucun';
      const msg = `Bonjour KZR Consulting,%0A%0AJe souhaite concrétiser ma simulation en ligne :%0A- Pôles choisis : ${servicesReadable}%0A- Type de bien : ${propertyType}%0A- Dimensionnement : ${sizeLabel}%0A- Formule recommandée : ${tierName}%0A%0AMerci de me recontacter pour planifier une visite sur site à Casablanca.`;
      whatsappBtn.href = `https://wa.me/212661250118?text=${msg}`;
    }

    // Pre-fill contact form anchor
    if (quoteAnchor) {
      quoteAnchor.onclick = () => {
        const formServiceSelect = document.getElementById('form-service');
        const formNotes = document.getElementById('form-message');
        if (formServiceSelect && selectedKeys.length > 0) {
          formServiceSelect.value = selectedKeys.length > 1 ? 'pack-multiservices' : selectedKeys[0];
        }
        if (formNotes && selectedKeys.length > 0) {
          const readable = selectedKeys.map(k => SERVICE_NAMES[k] || k).join(', ');
          formNotes.value = `Simulation KZR en ligne : Pôles [${readable}] pour [${propertyType}], taille [${sizeLabel}]. Formule conseillée : ${tierName}.`;
        }
      };
    }
  }

  // Bind change events
  checkboxes.forEach(cb => cb.addEventListener('change', calculateEstimate));
  if (propertySelect) propertySelect.addEventListener('change', calculateEstimate);
  if (sizeSlider) sizeSlider.addEventListener('input', calculateEstimate);

  // Setup Printable Devis feature
  setupPrintableDevis(currentSimulation);

  // Initial calculation
  calculateEstimate();
}

/**
 * =========================================================================
 * Printable Devis Feature
 * Injects the 'Imprimer / Exporter le Devis' button and generates an official
 * executive quote summary with print stylesheet, date, SLA, and signature zones.
 * =========================================================================
 */
function setupPrintableDevis(getSimState) {
  const actionsContainer = document.querySelector('.kzr-sim-actions');
  if (!actionsContainer) return;

  // Check if print button already exists or create it
  let printBtn = document.getElementById('sim-print-btn');
  if (!printBtn) {
    printBtn = document.createElement('button');
    printBtn.type = 'button';
    printBtn.id = 'sim-print-btn';
    printBtn.className = 'kzr-btn kzr-btn-outline-gold';
    printBtn.innerHTML = `
      <i class="fa-solid fa-print"></i>
      <span>Imprimer / Exporter le Devis</span>
    `;
    actionsContainer.appendChild(printBtn);
  }

  // Print button click handler
  printBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openPrintableDevisModal();
  });
}

/**
 * Render and display the printable quotation preview modal
 */
function openPrintableDevisModal() {
  const checkboxes = document.querySelectorAll('.kzr-sim-checkbox:checked');
  const propertySelect = document.getElementById('sim-property-type');
  const sizeVal = document.getElementById('sim-size-val');
  const teamEl = document.getElementById('sim-out-team');
  const freqEl = document.getElementById('sim-out-freq');
  const tierNameEl = document.getElementById('sim-out-tier-name');
  const tierEstEl = document.getElementById('sim-out-tier-est');

  const selectedServices = Array.from(checkboxes).map(cb => cb.value);

  const SERVICE_NAMES = {
    syndic: { name: 'Syndic de Copropriété', ref: 'Conforme Loi 18-00 & Comptabilité Séparée' },
    securite: { name: 'Sécurité Privée & Gardiennage 24/7', ref: 'Agrément Ministère de l’Intérieur & Rondes RFID' },
    nettoyage: { name: 'Nettoyage Professionnel & Hygiène', ref: 'Produits Écologiques FDS & Équipements Industriels' },
    renovation: { name: 'Rénovation & Travaux Tous Corps d’État', ref: 'Garantie Décennale & Devis Détaillé' },
    amenagement: { name: 'Aménagement d’Intérieur & Déco', ref: 'Conception 3D Immersive & Mobilier Sur-Mesure' },
    'espaces-verts': { name: 'Espaces Verts & Paysage', ref: 'Arrosage Éco-Hydrique & Entretien Raisonné' }
  };

  const propertyType = propertySelect ? propertySelect.value : 'Immeuble / Copropriété';
  const sizeLabel = sizeVal ? sizeVal.textContent : 'Non spécifié';
  const team = teamEl ? teamEl.textContent : 'Équipe KZR Dédiée';
  const freq = freqEl ? freqEl.textContent : 'Selon cahier des charges';
  const tier = tierNameEl ? tierNameEl.textContent : 'Formule Multiservices';
  const estimate = tierEstEl ? tierEstEl.textContent : 'Sur Étude';

  // Format reference & date
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const refCode = `KZR-EST-${today.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Build service lines HTML
  let servicesRows = '';
  if (selectedServices.length === 0) {
    servicesRows = `<tr><td colspan="3" style="text-align: center; color: #888; padding: 1.5rem;">Aucun pôle sélectionné. Veuillez sélectionner au moins 1 pôle dans le simulateur.</td></tr>`;
  } else {
    selectedServices.forEach((s, idx) => {
      const item = SERVICE_NAMES[s] || { name: s, ref: 'Prestation certifiée KZR' };
      servicesRows += `
        <tr>
          <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0f172a;">${idx + 1}. ${item.name}</td>
          <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; color: #475569; font-size: 0.875rem;">${item.ref}</td>
          <td style="padding: 0.75rem 1rem; border-bottom: 1px solid #e2e8f0; text-align: right; font-weight: 600; color: #b45309;">Inclus au pack</td>
        </tr>
      `;
    });
  }

  // Build Modal or Printable Container
  let printModal = document.getElementById('kzr-print-devis-modal');
  if (!printModal) {
    printModal = document.createElement('div');
    printModal.id = 'kzr-print-devis-modal';
    printModal.className = 'kzr-modal';
    printModal.setAttribute('role', 'dialog');
    printModal.setAttribute('aria-modal', 'true');
    printModal.setAttribute('aria-label', 'Estimation Prévisionnelle KZR Consulting');
    document.body.appendChild(printModal);
  }

  printModal.innerHTML = `
    <div class="kzr-modal-backdrop" id="kzr-print-modal-backdrop"></div>
    <div class="kzr-modal-dialog" style="max-width: 820px; background: #ffffff; color: #0f172a; padding: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);">
      
      <!-- Top Action Bar (Hidden during print) -->
      <div class="kzr-print-no-print" style="background: #0f172a; color: #ffffff; padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #d4af37;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <i class="fa-solid fa-file-invoice text-gold" style="font-size: 1.25rem;"></i>
          <strong>Estimation Prévisionnelle Prête à Imprimer</strong>
        </div>
        <div style="display: flex; gap: 0.75rem;">
          <button type="button" class="kzr-btn kzr-btn-sm kzr-btn-gold" id="kzr-trigger-print-btn" style="padding: 0.4rem 1rem;">
            <i class="fa-solid fa-print"></i> <span>Lancer l'Impression / PDF</span>
          </button>
          <button type="button" class="kzr-modal-close-static" id="kzr-close-print-btn" style="background: transparent; border: none; color: #fff; font-size: 1.25rem; cursor: pointer; padding: 0.25rem 0.5rem;" aria-label="Fermer">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>

      <!-- Printable Document Sheet -->
      <div id="kzr-printable-sheet" style="padding: 2.5rem; font-family: 'Montserrat', system-ui, -apple-system, sans-serif; background: #ffffff; color: #0f172a;">
        
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #d4af37; padding-bottom: 1.5rem; margin-bottom: 1.5rem;">
          <div>
            <img src="assets/images/logo_header.png" alt="KZR Consulting" style="height: 48px; margin-bottom: 0.5rem;">
            <div style="font-size: 0.8rem; color: #64748b; line-height: 1.4;">
              <strong>KZR CONSULTING SARL AU</strong><br>
              Cabinet Multiservices Premium & Facility Management<br>
              5 Rue Annoussour, Quartier Palmier, Casablanca • Maroc<br>
              Tél : +212 661-250118 | Email : contact@kzrconsulting.ma
            </div>
          </div>
          <div style="text-align: right;">
            <div style="display: inline-block; background: #fef3c7; color: #92400e; padding: 0.25rem 0.75rem; border-radius: 9999px; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">
              Simulation Prévisionnelle
            </div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.25rem;">${refCode}</div>
            <div style="font-size: 0.875rem; color: #64748b;">Date : ${dateFormatted}</div>
            <div style="font-size: 0.8rem; color: #94a3b8;">Validité : 30 jours calendaires</div>
          </div>
        </div>

        <!-- Project Criteria Banner -->
        <div style="background: #f8fafc; border-left: 4px solid #d4af37; padding: 1rem 1.25rem; border-radius: 4px; margin-bottom: 1.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
          <div>
            <span style="font-size: 0.75rem; text-transform: uppercase; color: #64748b; font-weight: 600;">Nature du Bien :</span>
            <div style="font-weight: 700; color: #0f172a; margin-top: 0.25rem;">${propertyType}</div>
          </div>
          <div>
            <span style="font-size: 0.75rem; text-transform: uppercase; color: #64748b; font-weight: 600;">Dimensionnement :</span>
            <div style="font-weight: 700; color: #0f172a; margin-top: 0.25rem;">${sizeLabel}</div>
          </div>
          <div>
            <span style="font-size: 0.75rem; text-transform: uppercase; color: #64748b; font-weight: 600;">Formule Recommandée :</span>
            <div style="font-weight: 700; color: #b45309; margin-top: 0.25rem;">${tier}</div>
          </div>
        </div>

        <!-- Table of Selected Services -->
        <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.05em; color: #0f172a; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-list-check" style="color: #d4af37;"></i>
          <span>Pôles de Services Sélectionnés (${selectedServices.length})</span>
        </h4>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.9rem;">
          <thead>
            <tr style="background: #f1f5f9; text-align: left; font-size: 0.8rem; text-transform: uppercase; color: #475569;">
              <th style="padding: 0.6rem 1rem; border-bottom: 2px solid #cbd5e1;">Pôle / Prestation</th>
              <th style="padding: 0.6rem 1rem; border-bottom: 2px solid #cbd5e1;">Engagement & Cadre</th>
              <th style="padding: 0.6rem 1rem; border-bottom: 2px solid #cbd5e1; text-align: right;">Statut</th>
            </tr>
          </thead>
          <tbody>
            ${servicesRows}
          </tbody>
        </table>

        <!-- Operating Structure & Staffing -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: #fafafa; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem;">
          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; color: #64748b; font-weight: 600;">Organisation Opérationnelle :</div>
            <div style="font-weight: 700; color: #0f172a; margin-top: 0.25rem; font-size: 0.95rem;">${team}</div>
            <div style="font-size: 0.8rem; color: #64748b; margin-top: 0.25rem;">Supervision par interlocuteur unique KZR.</div>
          </div>
          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; color: #64748b; font-weight: 600;">Fréquence & SLA :</div>
            <div style="font-weight: 700; color: #0f172a; margin-top: 0.25rem; font-size: 0.95rem;">${freq}</div>
            <div style="font-size: 0.8rem; color: #16a34a; font-weight: 600; margin-top: 0.25rem;"><i class="fa-solid fa-check"></i> Astreinte d'urgence & réponse sous 24h</div>
          </div>
        </div>

        <!-- Tariff & Note -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 2px dashed #cbd5e1; padding-top: 1.25rem; margin-bottom: 1.5rem;">
          <div>
            <div style="font-size: 0.85rem; font-weight: 600; color: #475569;">Estimation Tarifaire Indicative :</div>
            <div style="font-size: 0.775rem; color: #64748b; max-width: 420px; margin-top: 0.25rem;">
              Diagnostic technique et visite métrique préalables 100% gratuits sur le Grand Casablanca.
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.35rem; font-weight: 800; color: #b45309;">${estimate}</div>
            <div style="font-size: 0.75rem; color: #64748b;">Hors Taxes (TVA applicable en sus)</div>
          </div>
        </div>

        <!-- Signatures & Legal Stamp Box -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
          <div style="border: 1px dashed #cbd5e1; border-radius: 6px; padding: 1rem; min-height: 90px;">
            <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #64748b;">Bon pour accord & Accord Client :</div>
            <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 0.25rem;">Nom, Signature et Cachet</div>
          </div>
          <div style="border: 1px dashed #cbd5e1; border-radius: 6px; padding: 1rem; min-height: 90px; text-align: right;">
            <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #64748b;">Pour KZR Consulting Casablanca :</div>
            <div style="font-size: 0.75rem; color: #d4af37; font-weight: 700; margin-top: 0.25rem;">Direction Commerciale & Technique</div>
            <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 1.5rem;">Visa & Cachet Opérationnel KZR</div>
          </div>
        </div>

        <!-- Footer Legal Mentions -->
        <div style="margin-top: 1.5rem; text-align: center; font-size: 0.7rem; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 0.75rem;">
          Document non contractuel généré via l'estimateur officiel KZR Consulting • Soumis à validation technique sur site • ICE : 003254891000042 • RC Casablanca : 489215 • 5 Rue Annoussour, Casablanca
        </div>
      </div>
    </div>
  `;

  // Display modal
  printModal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Wire up close button & backdrop
  const closeBtn = printModal.querySelector('#kzr-close-print-btn');
  const backdrop = printModal.querySelector('#kzr-print-modal-backdrop');
  const triggerPrintBtn = printModal.querySelector('#kzr-trigger-print-btn');

  const closePrintModal = () => {
    printModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.onclick = closePrintModal;
  if (backdrop) backdrop.onclick = closePrintModal;

  // Window.print trigger
  if (triggerPrintBtn) {
    triggerPrintBtn.onclick = () => {
      window.print();
    };
  }
}
