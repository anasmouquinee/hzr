/**
 * KZR Consulting - Pole Deep-Dive Modal System
 * Provides rich interactive specifications, equipment rosters, SLA commitments,
 * and direct quotation triggers for each of the 6 core business poles.
 */

(function () {
  'use strict';

  /**
   * Comprehensive database of the 6 KZR Consulting business poles
   */
  const POLES_DATA = {
    syndic: {
      id: 'syndic',
      number: 'Pôle 01',
      title: 'Syndic de Copropriété Professionnel',
      tagline: 'Administration rigoureuse, comptabilité transparente & conformité Loi 18-00',
      category: 'Copropriétés Résidentielles & Tertiaires',
      icon: 'fa-solid fa-building-user',
      pageUrl: 'syndic.html',
      whatsappText: "Bonjour KZR Consulting, je souhaite des informations sur votre offre de Syndic Professionnel de Copropriété.",
      badge: 'Géré sous Loi 18-00',
      description: `KZR Consulting intervient comme syndic professionnel assermenté à Casablanca et dans les grandes métropoles marocaines. Nous apportons une gestion d'excellence, transparente et moderne pour valoriser votre patrimoine immobilier et garantir la paix des résidents.`,
      scopes: [
        'Tenue rigoureuse des Assemblées Générales ordinaires et extraordinaires (convocations, tenue des débats, PV certifiés).',
        'Comptabilité bancaire individualisée avec compte bancaire dédié au nom de la copropriété.',
        'Recouvrement proactif et amiable des charges de copropriété avec assistance contentieuse si nécessaire.',
        'Audit technique initial de l\'immeuble et plan pluriannuel de maintenance préventive.',
        'Supervision et négociation de tous les contrats de maintenance (ascenseurs, suppresseurs, RIA, portes).',
        'Gestion administrative continue et permanence d\'assistance téléphonique pour les copropriétaires.'
      ],
      equipments: [
        'Extranet sécurisé accessible 24/7 par les copropriétaires pour consulter comptes et documents.',
        'Système de registres numériques d\'interventions techniques horodatées.',
        'Logiciel comptable immobilier agréé avec édition instantanée des bilans et relevés individuels.',
        'Réseau d\'astreinte d\'artisans partenaires qualifiés pour interventions d\'urgence.'
      ],
      certifications: [
        '100% Conforme au cadre légal de la Loi 18-00 relative à la copropriété au Maroc.',
        'Police d\'assurance Responsabilité Civile Professionnelle Syndic.',
        'Astreinte technique d\'urgence 24h/24 et 7j/7 avec intervention garantie sous 2h.',
        'Visite sur site hebdomadaire planifiée par un Property Manager attitré.'
      ]
    },

    securite: {
      id: 'securite',
      number: 'Pôle 02',
      title: 'Sécurité Privée & Gardiennage 24/7',
      tagline: 'Surveillance physique, contrôle d’accès rigoureux et télésurveillance connectée',
      category: 'Entreprises, Sièges Sociaux, Résidences & Événements',
      icon: 'fa-solid fa-shield-halved',
      pageUrl: 'securite.html',
      whatsappText: "Bonjour KZR Consulting, je souhaite recevoir une proposition pour le gardiennage et la sécurité privée de notre site.",
      badge: 'Agrément Ministère de l’Intérieur',
      description: `Notre pôle Sécurité déploie des agents assermentés, formés et encadrés pour assurer la protection continue de vos résidences, sièges sociaux et plateformes logistiques. Respect, vigilance et courtoisie sont nos maîtres-mots.`,
      scopes: [
        'Filtrage rigoureux des entrées piétons et véhicules avec enregistrement électronique des visiteurs.',
        'Rondes de sécurité régulières et inopinées jour/nuit avec système de pointage électronique infalsifiable.',
        'Surveillance des parkings souterrains, des issues de secours et des locaux techniques sensibles.',
        'Gestion des systèmes de détection incendie (SSI), évacuation d’urgence et levée de doute.',
        'Accueil prestige / conciergerie d’entreprise conjuguant élégance et vigilance sécuritaire.',
        'Dispositifs spécifiques pour événements d’entreprise ou sécurisation de chantiers.'
      ],
      equipments: [
        'Pointeurs de ronde électroniques GPS/RFID avec horodatage en temps réel.',
        'Émetteurs-récepteurs radio UHF professionnels sécurisés avec oreillettes discrètes.',
        'Uniformes corporate haute qualité (costumes de prestige ou tenues d’intervention d’hiver/été).',
        'Postes centraux de vidéosurveillance avec écrans de contrôle multipoints haute définition.'
      ],
      certifications: [
        'Agrément officiel du Ministère de l\'Intérieur du Royaume du Maroc.',
        'Agents détenteurs de certifications Secourisme du Travail (SST) et maniement d\'extincteurs.',
        'Remplacement d\'agent sous 60 minutes en cas d\'imprévu avec effectif de réserve permanent.',
        'Journal de sécurité numérique transmis quotidiennement au donneur d\'ordre.'
      ]
    },

    nettoyage: {
      id: 'nettoyage',
      number: 'Pôle 03',
      title: 'Nettoyage Professionnel & Propreté',
      tagline: 'Hygiène irréprochable, produits écologiques certifiés et protocoles hospitaliers/tertiaires',
      category: 'Bureaux, Copropriétés, Showrooms, Cliniques & Chantiers',
      icon: 'fa-solid fa-broom',
      pageUrl: 'nettoyage.html',
      whatsappText: "Bonjour KZR Consulting, je souhaite un devis pour des prestations de nettoyage professionnel régulier.",
      badge: 'Éco-responsable & Normes FDS',
      description: `KZR Consulting apporte une expertise complète en propreté tertiaire et industrielle à Casablanca. Nos agents de service qualifiés opèrent selon des cahiers des charges sur-mesure pour un environnement sain, lumineux et soigné.`,
      scopes: [
        'Entretien quotidien des bureaux, banques d\'accueil, postes de travail et espaces collaboratifs.',
        'Nettoyage en profondeur des halls de copropriété, cages d\'escaliers, paliers et ascenseurs.',
        'Lustrage, ponçage et cristallisation haute brillance des marbres, granitos et parquets.',
        'Lavage de vitrerie et façades vitrées intérieures/extérieures, y compris travaux en hauteur.',
        'Remise en état après travaux, fin de chantier, ou avant emménagement (désincrustage sols et faïences).',
        'Protocoles de désinfection, désinsectisation et dératisation certifiés.'
      ],
      equipments: [
        'Autolaveuses autoportées et autotractées pour grands parkings et espaces commerciaux.',
        'Monobrosses haute et basse vitesse avec disques diamants pour marbre.',
        'Aspirateurs industriels bi-moteur et injecteurs-extracteurs moquette haute pression.',
        'Systèmes de lavage de vitres à eau pure osmosée avec perches télescopiques carbone (jusqu\'à 18m).'
      ],
      certifications: [
        'Produits de nettoyage écolabellisés conformes aux normes Fiches Données de Sécurité (FDS).',
        'Contrôles qualité contradictoires mensuels avec grille d\'évaluation certifiée.',
        'Personnel 100% déclaré CNSS, assuré et formé aux gestes et postures ergonomiques.',
        'Protocoles stricts de traçabilité des consommables et réapprovisionnement automatique.'
      ]
    },

    renovation: {
      id: 'renovation',
      number: 'Pôle 04',
      title: 'Rénovation & Travaux Tous Corps d’État',
      tagline: 'Second œuvre, étanchéité garantie, peinture de prestige et réhabilitation globale',
      category: 'Résidentiel Haut Standing, Bureaux, Immeubles & Commerces',
      icon: 'fa-solid fa-trowel-bricks',
      pageUrl: 'renovation.html',
      whatsappText: "Bonjour KZR Consulting, je prévois des travaux de rénovation et souhaite une visite technique pour chiffrage.",
      badge: 'Garantie Décennale & Devis 48h',
      description: `Du simple rafraîchissement à la restructuration intégrale de vos espaces, KZR Consulting pilote vos chantiers avec rigueur technique et maîtrise des plannings. Nos équipes de compagnons d'élite garantissent des finitions irréprochables.`,
      scopes: [
        'Travaux d\'étanchéité garantis pour toitures terrasses, balcons et façades (membranes SBS, résine PU).',
        'Peinture intérieure décorative (stucco, sablé, laques) et ravalement de façades extérieures.',
        'Plomberie sanitaire générale, remplacement de colonnes montantes et traitement anticalcaire.',
        'Électricité générale, remise aux normes NFC 15-100, éclairages LED architecturaux et tableaux.',
        'Pose de carrelages grand format, faïences rectifiées, marbre calacatta et parquets massifs/stratifiés.',
        'Création de cloisons BA13, faux plafonds décoratifs acoustiques avec gorges lumineuses LED.'
      ],
      equipments: [
        'Caméras thermiques d\'inspection infrarouge pour diagnostic précis d\'infiltrations et ponts thermiques.',
        'Stations de peinture Airless haute pression pour un rendu mural ultra-lisse et homogène.',
        'Échafaudages tubulaires normés et matériel d\'étaiement certifié pour sécurité maximale.',
        'Outillage électroportatif professionnel avec aspiration de poussières intégrée.'
      ],
      certifications: [
        'Assurance Responsabilité Civile Travaux et Décennale sur les ouvrages structurels et étanchéité.',
        'Devis détaillé poste par poste transmis sous 48h après métré sur site.',
        'Planning d\'intervention type GANTT avec engagement contractuel sur les dates de livraison.',
        'PV de réception de travaux avec levée formelle des réserves.'
      ]
    },

    amenagement: {
      id: 'amenagement',
      number: 'Pôle 05',
      title: 'Aménagement d’Intérieur & Décoration',
      tagline: 'Conception 3D immersive, space-planning professionnel et mobilier sur-mesure',
      category: 'Sièges Sociaux, Bureaux Modernes, Boutiques & Appartements de Prestige',
      icon: 'fa-solid fa-couch',
      pageUrl: 'amenagement-decoration.html',
      whatsappText: "Bonjour KZR Consulting, nous avons un projet d'aménagement d'intérieur et souhaitons une étude de conception 3D.",
      badge: 'Conception 3D & Clé en Main',
      description: `Nos architectes d'intérieur et designers d'espace conçoivent des environnements harmonieux et stimulants qui traduisent l'identité de votre entreprise ou subliment votre habitat privé. Une approche globale, du concept à la livraison meublée.`,
      scopes: [
        'Space-planning optimisé pour open-spaces, zones de détente, call-boxes et salles de conseil.',
        'Conception 3D photoréaliste et visites virtuelles avant le début des réalisations.',
        'Fabrication et pose de menuiseries sur-mesure (banques d\'accueil, dressings, bibliothèques, boiseries).',
        'Création et équipement de cuisines modernes contemporaines (îlots centraux, plans en quartz).',
        'Cloisons amovibles vitrées acoustiques simple ou double vitrage bord à bord.',
        'Sélection et fourniture de luminaires d\'ambiance et mobilier design ergonomique certifié.'
      ],
      equipments: [
        'Logiciels de modélisation 3D et rendu d\'éclairage photoréaliste (AutoCAD, SketchUp Pro, V-Ray).',
        'Machines à commande numérique (CNC) d\'ébénisterie pour découpes et assemblages parfaits.',
        'Catalogue exclusif d\'échantillons de matières nobles : placages bois, marbres, textiles antitaches.',
        'Instruments de mesure laser 3D Leica pour une prise de cotes millimétrique.'
      ],
      certifications: [
        'Accompagnement personnalisé par un Chef de Projet Décoration dédié tout au long du chantier.',
        'Respect scrupuleux des normes d\'accessibilité ERP et de sécurité incendie des matériaux.',
        'Garantie fabricant sur l\'ensemble des mobiliers et éléments de menuiserie installés.',
        'Optimisation de l\'acoustique certifiée conforme aux exigences du bien-être au travail.'
      ]
    },

    'espaces-verts': {
      id: 'espaces-verts',
      number: 'Pôle 06',
      title: 'Espaces Verts & Paysagisme Durable',
      tagline: 'Création paysagère, arrosage automatique intelligent et entretien vert éco-responsable',
      category: 'Jardins de Copropriétés, Parcs d’Entreprises & Domaines Privés',
      icon: 'fa-solid fa-tree',
      pageUrl: 'espaces-verts.html',
      whatsappText: "Bonjour KZR Consulting, je souhaite confier la création ou l'entretien paysager de nos espaces verts à vos équipes.",
      badge: 'Gestion Éco-Hydrique & Éco-Jardin',
      description: `Nos jardiniers paysagistes façonnent des oasis végétales durables et raffinées. En intégrant des essences adaptées au climat marocain et des technologies d'arrosage économe en eau, nous conjuguons beauté visuelle et responsabilité environnementale.`,
      scopes: [
        'Création et réhabilitation de parcs et jardins : terrassement, nivellement et plantations d\'arbres.',
        'Installation de réseaux d\'arrosage automatique goutte-à-goutte et asperseurs avec programmateur connecté.',
        'Engazonnement par semis adapté ou placage de gazon naturel en rouleaux haute résistance.',
        'Contrats d\'entretien périodique : tonte, débroussaillage, scarification et binage des massifs.',
        'Taille esthétique des haies, topiaires, et élagage sécurisé de grands arbres par bûcherons certifiés.',
        'Soins phytosanitaires raisonnés, amendements organiques naturels et paillage thermique des sols.'
      ],
      equipments: [
        'Flotte de tondeuses professionnelles autotractées et débroussailleuses silencieuses sur batteries.',
        'Taille-haies télescopiques et tronçonneuses d\'élagage de précision Stihl.',
        'Programmateurs d\'arrosage météo connectés Wi-Fi avec sondes d\'humidité des sols.',
        'Broyeurs de branches mobiles pour valorisation et recyclage des déchets verts sur site.'
      ],
      certifications: [
        'Réduction de la consommation d\'eau jusqu\'à 40% grâce au pilotage micrométrique de l\'arrosage.',
        'Approvisionnement en sujets sains auprès de pépinières partenaires sélectionnées au Maroc.',
        'Personnel formé au travail en hauteur et équipé de harnais et EPI élagage homologués.',
        'Visite semestrielle d\'un ingénieur horticole pour diagnostic de vigueur et de santé végétale.'
      ]
    }
  };

  class PoleDeepDiveModal {
    constructor() {
      this.modal = null;
      this.backdrop = null;
      this.content = null;
      this.closeBtn = null;
      this.lastFocusedElement = null;
      this.currentPole = null;

      this.init();
    }

    /**
     * Create or attach to modal DOM structure
     */
    init() {
      this.buildModalDOM();
      this.bindTriggers();
      this.bindModalEvents();
    }

    /**
     * Build accessible modal HTML skeleton if not already present
     */
    buildModalDOM() {
      let modalEl = document.getElementById('kzr-pole-modal');

      if (!modalEl) {
        modalEl = document.createElement('div');
        modalEl.id = 'kzr-pole-modal';
        modalEl.className = 'kzr-modal';
        modalEl.setAttribute('role', 'dialog');
        modalEl.setAttribute('aria-modal', 'true');
        modalEl.setAttribute('aria-labelledby', 'kzr-modal-title');
        modalEl.setAttribute('aria-hidden', 'true');

        modalEl.innerHTML = `
          <div class="kzr-modal-backdrop" id="kzr-modal-backdrop"></div>
          <div class="kzr-modal-dialog" role="document">
            <button type="button" class="kzr-modal-close" id="kzr-modal-close-btn" aria-label="Fermer la fenêtre de détail">
              <i class="fa-solid fa-xmark"></i>
            </button>
            <div class="kzr-modal-content" id="kzr-modal-dynamic-content">
              <!-- Content dynamically rendered via renderPoleDetails -->
            </div>
          </div>
        `;

        document.body.appendChild(modalEl);
      }

      this.modal = modalEl;
      this.backdrop = modalEl.querySelector('.kzr-modal-backdrop');
      this.content = modalEl.querySelector('#kzr-modal-dynamic-content');
      this.closeBtn = modalEl.querySelector('#kzr-modal-close-btn');
    }

    /**
     * Bind click listeners to all pole cards, deep-dive triggers, and links
     */
    bindTriggers() {
      // Find all pole cards on the page
      const poleCards = document.querySelectorAll('.kzr-pole-card');

      poleCards.forEach((card, index) => {
        // Automatically assign data-pole-id if not explicitly set
        if (!card.getAttribute('data-pole-id')) {
          const keys = Object.keys(POLES_DATA);
          const poleKey = keys[index % keys.length];
          card.setAttribute('data-pole-id', poleKey);
        }

        const poleId = card.getAttribute('data-pole-id');

        // Check if an "En savoir plus" or "Détails" button already exists
        let deepDiveBtn = card.querySelector('.kzr-pole-deep-dive-btn');
        if (!deepDiveBtn) {
          // Add a deep-dive trigger button inside card footer
          const footer = card.querySelector('.kzr-pole-footer');
          if (footer) {
            const btnWrap = document.createElement('div');
            btnWrap.className = 'kzr-pole-card-actions';
            btnWrap.style.display = 'flex';
            btnWrap.style.gap = '0.5rem';
            btnWrap.style.alignItems = 'center';
            btnWrap.style.marginTop = '0.75rem';
            btnWrap.style.width = '100%';

            deepDiveBtn = document.createElement('button');
            deepDiveBtn.type = 'button';
            deepDiveBtn.className = 'kzr-btn kzr-btn-sm kzr-btn-outline-gold kzr-pole-deep-dive-btn';
            deepDiveBtn.setAttribute('data-pole-open', poleId);
            deepDiveBtn.innerHTML = `
              <i class="fa-solid fa-circle-info"></i>
              <span>Fiche Technique & Équipements</span>
            `;

            footer.appendChild(deepDiveBtn);
          }
        }

        // Clicking the thumbnail or deep dive button opens modal
        const thumb = card.querySelector('.kzr-pole-thumb');
        if (thumb) {
          thumb.style.cursor = 'pointer';
          thumb.setAttribute('title', 'Cliquer pour ouvrir les spécifications détaillées');
          thumb.addEventListener('click', (e) => {
            e.preventDefault();
            this.open(poleId, thumb);
          });
        }

        if (deepDiveBtn) {
          deepDiveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.open(poleId, deepDiveBtn);
          });
        }
      });

      // Delegate any arbitrary element with data-pole-open attribute
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-pole-open]');
        if (trigger) {
          e.preventDefault();
          const poleKey = trigger.getAttribute('data-pole-open');
          this.open(poleKey, trigger);
        }
      });
    }

    /**
     * Bind modal-specific events (Esc key, backdrop click, close button)
     */
    bindModalEvents() {
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.close());
      }

      if (this.backdrop) {
        this.backdrop.addEventListener('click', () => this.close());
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen()) {
          this.close();
        }
      });
    }

    /**
     * Check if modal is currently open
     */
    isOpen() {
      return this.modal && this.modal.classList.contains('active');
    }

    /**
     * Open modal and display comprehensive specifications for requested pole
     */
    open(poleKey, triggerEl) {
      const data = POLES_DATA[poleKey] || POLES_DATA['syndic'];
      this.currentPole = data;
      this.lastFocusedElement = triggerEl || document.activeElement;

      this.renderContent(data);

      this.modal.classList.add('active');
      this.modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Focus close button for accessibility
      setTimeout(() => {
        if (this.closeBtn) this.closeBtn.focus();
      }, 50);
    }

    /**
     * Close modal and return focus
     */
    close() {
      if (!this.modal) return;
      this.modal.classList.remove('active');
      this.modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
        this.lastFocusedElement.focus();
      }
    }

    /**
     * Render the rich HTML template into the modal content wrapper
     */
    renderContent(pole) {
      if (!this.content) return;

      const scopesHtml = pole.scopes
        .map(item => `<li><i class="fa-solid fa-circle-check text-gold"></i><span>${item}</span></li>`)
        .join('');

      const equipmentsHtml = pole.equipments
        .map(item => `<li><i class="fa-solid fa-gears text-gold"></i><span>${item}</span></li>`)
        .join('');

      const certificationsHtml = pole.certifications
        .map(item => `<li><i class="fa-solid fa-award text-gold"></i><span>${item}</span></li>`)
        .join('');

      this.content.innerHTML = `
        <header class="kzr-modal-header">
          <div class="kzr-modal-tag-row">
            <span class="kzr-modal-badge">${pole.number} • ${pole.category}</span>
            <span class="kzr-modal-pill-gold"><i class="fa-solid fa-shield"></i> ${pole.badge}</span>
          </div>
          <div class="kzr-modal-title-wrap">
            <div class="kzr-modal-icon-disc">
              <i class="${pole.icon}"></i>
            </div>
            <div>
              <h2 id="kzr-modal-title" class="kzr-modal-title">${pole.title}</h2>
              <p class="kzr-modal-tagline">${pole.tagline}</p>
            </div>
          </div>
        </header>

        <div class="kzr-modal-body">
          <!-- Overview Box -->
          <div class="kzr-modal-section kzr-modal-overview-box">
            <h3 class="kzr-modal-subtitle"><i class="fa-solid fa-compass"></i> Présentation & Enjeux</h3>
            <p>${pole.description}</p>
          </div>

          <!-- Grid Specifications -->
          <div class="kzr-modal-spec-grid">
            <!-- Col 1: Scope -->
            <div class="kzr-modal-spec-col">
              <h3 class="kzr-modal-subtitle"><i class="fa-solid fa-list-check"></i> Périmètre d'Intervention</h3>
              <ul class="kzr-modal-list">
                ${scopesHtml}
              </ul>
            </div>

            <!-- Col 2: Equipment & Certifications -->
            <div class="kzr-modal-spec-col">
              <div style="margin-bottom: 1.5rem;">
                <h3 class="kzr-modal-subtitle"><i class="fa-solid fa-microchip"></i> Équipements & Technologies</h3>
                <ul class="kzr-modal-list">
                  ${equipmentsHtml}
                </ul>
              </div>

              <div>
                <h3 class="kzr-modal-subtitle"><i class="fa-solid fa-certificate"></i> Garanties & Engagements SLA</h3>
                <ul class="kzr-modal-list">
                  ${certificationsHtml}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <footer class="kzr-modal-footer">
          <div class="kzr-modal-cta-left">
            <a href="https://wa.me/212661250118?text=${encodeURIComponent(pole.whatsappText)}" 
               target="_blank" rel="noopener" class="kzr-btn kzr-btn-wa">
              <i class="fa-brands fa-whatsapp"></i>
              <span>Échanger sur WhatsApp</span>
            </a>
            <a href="${pole.pageUrl}" class="kzr-btn kzr-btn-outline-white">
              <span>Page Dédiée</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
          <div class="kzr-modal-cta-right">
            <button type="button" class="kzr-btn kzr-btn-gold" id="kzr-modal-select-quote-btn">
              <i class="fa-solid fa-file-invoice"></i>
              <span>Demander un Devis pour ce Pôle</span>
            </button>
          </div>
        </footer>
      `;

      // Direct quote action button handling
      const selectQuoteBtn = this.content.querySelector('#kzr-modal-select-quote-btn');
      if (selectQuoteBtn) {
        selectQuoteBtn.addEventListener('click', () => {
          this.close();

          // Pre-select checkbox in simulator if on homepage
          const simCheckbox = document.querySelector(`.kzr-sim-checkbox[value="${pole.id}"]`);
          if (simCheckbox) {
            simCheckbox.checked = true;
            simCheckbox.dispatchEvent(new Event('change'));
          }

          // Pre-select in contact form if present
          const formService = document.getElementById('form-service');
          if (formService) {
            formService.value = pole.id;
          }

          // Smooth scroll to devis or simulator section
          const targetSection = document.getElementById('devis') || document.getElementById('simulateur');
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    }
  }

  // Initialize modal system on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.kzrModal = new PoleDeepDiveModal();
    });
  } else {
    window.kzrModal = new PoleDeepDiveModal();
  }

  // Expose API
  window.PoleDeepDiveModal = PoleDeepDiveModal;
  window.openPoleModal = function (poleKey) {
    if (window.kzrModal) {
      window.kzrModal.open(poleKey);
    }
  };
})();
