# KZR Consulting — Plateforme Web Multiservices Premium

Bienvenue dans le projet de refonte et modernisation intégrale du site web de **KZR Consulting** ([https://kzrconsulting.ma/](https://kzrconsulting.ma/)), l'agence multiservices de référence à Casablanca et au Maroc.

---

## 📌 Vue d'ensemble du Projet

KZR Consulting accompagne entreprises, copropriétés haut de gamme et résidences privées au Maroc à travers **6 pôles d'expertise intégrés** :
1. **Syndic de Copropriété** (Conformité Loi 18-00, transparence comptable, AG, maintenance)
2. **Sécurité & Gardiennage** (Protection 24/7, contrôle d'accès, rondes nocturnes, conciergerie)
3. **Nettoyage Professionnel** (Bureaux, résidences, vitres en hauteur, remise en état après chantier)
4. **Rénovation & Travaux** (Second œuvre, étanchéité de toitures, peinture, plomberie, électricité)
5. **Aménagement & Déco** (Modélisation 3D, agencement de bureaux, cuisines sur-mesure)
6. **Espaces Verts & Paysage** (Conception de jardins, tonte, élagage, arrosage automatique intelligent)

---

## 🚀 Améliorations & Évolutions Majeures

| Aspect | Ancien Site (`kzrconsulting.ma`) | Nouveau Site Modernisé (KZR Consulting) |
| :--- | :--- | :--- |
| **Architecture CSS** | CDN Tailwind avec classes arbitraires désordonnées (`bg-[#F3F3F3] text-[#7A7A7A]`) | **CSS Vanilla modulaire & Design Tokens** (`:root` CSS variables, zéro dépendance externe) |
| **Typographie & Lisibilité** | Textes justifiés avec espacements irréguliers | Typographie éditoriale moderne (`Outfit`, `Plus Jakarta Sans`, accents `Playfair Display`) sans rupture de rythme |
| **Simulateur de Devis** | Absent | **Simulateur interactif en temps réel** (sélection des pôles, calcul d'envergure, recommandation d'équipe & pré-remplissage WhatsApp) |
| **Compteurs Chiffres Clés** | Bugués (bloqués à 0% / 0 Pôles / 0h) | **Animation fluide de comptage** avec `IntersectionObserver` (100%, 6 Pôles, 24h, 1 Partenaire) |
| **Comparatif Réalisations** | Statique | **Curseur interactif Avant / Après** (Touch & Drag) pour visualiser la transformation des espaces |
| **Navigation & Mobile** | Menu mobile basique | **Header Sticky avec effet de flou**, méga-menu déroulant pour les 6 pôles et tiroir mobile avec accordéon |
| **Prise de Contact** | Formulaire simple | **Formulaire validé avec auto-formatage téléphone (+212)** + Bouton d'envoi immédiat pré-formaté sur WhatsApp |
| **Conformité & Règles** | Dépendances CDN lourdes | Respect strict des principes **SOLID, DRY, KISS** et de la charte projet de l'utilisateur |

---

## 📂 Structure des Fichiers

```text
C:\Users\anasm\Documents\KZR-Consulting\
├── index.html                  # Page d'accueil principale avec toutes les sections & simulateur
├── a-propos.html               # Présentation du cabinet, valeurs, vision et méthodologie
├── syndic.html                 # Pôle 01 : Syndic de Copropriété (Loi 18-00)
├── securite.html               # Pôle 02 : Sécurité & Gardiennage 24/7
├── nettoyage.html              # Pôle 03 : Nettoyage Professionnel & Hygiène
├── renovation.html             # Pôle 04 : Rénovation, Travaux & Étanchéité
├── amenagement-decoration.html # Pôle 05 : Aménagement d'Intérieur & Plans 3D
├── espaces-verts.html          # Pôle 06 : Espaces Verts & Entretien Paysager
├── contact.html                # Formulaire de devis express, coordonnées Casablanca & WhatsApp
│
├── assets/
│   ├── css/
│   │   ├── variables.css       # Tokens de design (palette marine & or, typographies, ombres, rayons)
│   │   ├── base.css            # Reset, typographie, conteneurs et utilitaires
│   │   ├── layout.css          # Topbar, navbar sticky, méga-menu, tiroir mobile, footer
│   │   ├── components.css      # Boutons, cartes de pôles, simulateur, curseur avant/après, FAQ
│   │   └── pages.css           # Bannières de sous-pages, grilles de prestations, fiches contact
│   │
│   ├── js/
│   │   ├── main.js             # Sticky header, gestion du menu mobile et animations légères
│   │   ├── simulator.js        # Moteur de calcul interactif du simulateur multiservices
│   │   ├── interactive.js      # Compteurs animés, accordéon FAQ accessible et curseur avant/après
│   │   └── contact.js          # Validation de formulaire, masque téléphone marocain et WhatsApp
│   │
│   └── images/                 # 58 photographies et logos haute résolution du projet KZR
└── README.md                   # Documentation complète
```

---

## 🌟 Coordonnées & Données Officielles KZR Consulting

- **Adresse :** 5 Rue Annoussour, Casablanca, Maroc
- **Téléphone :** `+212 661-250118`
- **E-mail :** `contact@kzrconsulting.ma`
- **Astreinte d'urgence :** 24h/24 & 7j/7
- **Garantie de réponse :** Sous 24 heures ouvrées
- **Réseaux sociaux :**
  - Instagram : `https://www.instagram.com/kzr_consulting/`
  - Facebook : `https://www.facebook.com/profile.php?id=61590665673242`
  - WhatsApp : `https://wa.me/212661250118`
