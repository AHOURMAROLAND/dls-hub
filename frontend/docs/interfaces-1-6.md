# DLS Hub - Documentation Interfaces (Écrans 1-6)

## Vue d'ensemble
Cette documentation décrit les 6 premiers écrans de l'application DLS Hub, convertis de HTML vers React/Vite avec la palette DLS 2026.

---

## Palette DLS 2026 Utilisée

| Rôle | Couleur | Hex | Usage |
|------|---------|-----|-------|
| Background principal | Navy noir profond | `#07080F` | Body, fond général |
| Background secondaire | Navy light | `#0F1020` | Cards, sections |
| Accent interactif | Bleu électrique | `#1155CC` | Boutons primaires, liens |
| Accent hover | Bleu light | `#1460E8` | Boutons hover |
| Violet DLS | Violet vif | `#5B1DB0` | Bordures, accents secondaires |
| Success | Vert | `#1a6e3e` | Validations, confirmations |
| Warning/Or | Gold | `#FFB800` | En attente, badges |
| Danger | Crimson | `#A80B1C` | Erreurs, défaites |
| Texte principal | Blanc | `#FFFFFF` | Titres, texte important |
| Texte secondaire | Blanc 70% | `rgba(255,255,255,0.7)` | Sous-titres |
| Texte muted | Blanc 40% | `rgba(255,255,255,0.4)` | Labels, hints |
| Bordures | Subtile | `rgba(255,255,255,0.07)` | Bordures par défaut |
| Bordures accent | Violet | `rgba(91,29,176,0.2)` | Bordures cards |

---

## Écran 1: Landing (Accueil)

**Fichier**: `src/pages/Landing.jsx`
**Route**: `/`
**Access**: Public

### Description
Page d'accueil présentant l'application avec un hero section, call-to-action buttons et features cards.

### Composants Clés
- **Hero Section**: Gradient background DLS (navy → purple → crimson split)
- **Animated Orbs**: Effet pulse avec `framer-motion`
- **Logo Badge**: Badge "Dream League Soccer 26" avec icône Sparkles
- **CTA Buttons**: "Créer un tournoi" (primary) + "Rejoindre avec un lien" (secondary)
- **Join Link Row**: Card interactive avec lien vers page rejoindre
- **Features Grid**: 3 cards (Tournois sur mesure, Scores automatiques, Mises à jour live)

### Props/State
- Aucun state local
- Navigation via `Link` de react-router-dom

### Icônes Lucide Utilisées
- `Trophy` - Logo et CTA
- `Sparkles` - Badge DLS
- `Zap` - Feature scores
- `Wifi` - Feature live
- `Link2` - Section rejoindre
- `ArrowRight` - Navigation

---

## Écran 2: CreateTournament (Créer Tournoi)

**Fichier**: `src/pages/CreateTournament.jsx`
**Route**: `/creer`
**Access**: Public

### Description
Formulaire en 3 étapes pour créer un nouveau tournoi avec sélection du type et configuration.

### Composants Clés
- **Stepper**: Indicateur de progression (1-2-3)
- **Step 1 - Infos**: Input nom du tournoi + upload logo
- **Step 2 - Type**: Sélection entre Élimination/Poules/Championnat (cards cliquables)
- **Step 3 - Config**: Nombre d'équipes (4/8/16/32), type d'élimination (simple/double)
- **Summary Card**: Récapitulatif avant création

### Props/State
```javascript
{
  step: number,              // Étape actuelle (1-3)
  loading: boolean,          // État création en cours
  form: {
    name: string,            // Nom du tournoi
    tournament_type: string, // 'elimination' | 'groups' | 'championship'
    elimination_type: string,// 'single' | 'double'
    max_teams: number        // 4 | 8 | 16 | 32
  }
}
```

### Icônes Lucide Utilisées
- `Trophy` - Header et résumé
- `ArrowLeft` - Navigation retour
- `Upload` - Logo upload
- `Swords` - Type élimination
- `Users` - Type poules
- `BarChart3` - Type championnat
- `Check` - Sélection indicator
- `ChevronDown` - Navigation suivant

---

## Écran 3: JoinTournament (Rejoindre)

**Fichier**: `src/pages/JoinTournament.jsx`
**Route**: `/rejoindre`
**Access**: Public

### Description
Page permettant de rejoindre un tournoi existant via un code à 8 caractères (slug).

### Composants Clés
- **Hero Section**: Icône Link2 avec titre et description
- **Slug Input**: Input uppercase 8 caractères avec validation visuelle
- **Validation Indicator**: Check vert quand code valide
- **Recent Tournaments**: Liste des tournois récents avec badges de statut

### Props/State
```javascript
{
  slug: string,              // Code saisi (uppercase)
  isValid: boolean | null,   // État validation
  checking: boolean          // Vérification en cours
}
```

### Validation
- 8 caractères requis
- Auto-validation après 8 caractères
- Animation loader pendant vérification

### Icônes Lucide Utilisées
- `Link2` - Hero icon
- `ArrowRight` - CTA button
- `CheckCircle2` - Validation success
- `Trophy` - Liste tournois
- `Users` - Liste tournois
- `Clock` - Badge en cours

---

## Écran 4: PlayerRegistration (Inscription Joueur)

**Fichier**: `src/pages/PlayerRegistration.jsx`
**Route**: `/inscription/:slug`
**Access**: Public

### Description
Page d'inscription où le joueur saisit son identifiant DLS (idx), vérifie ses stats et entre son pseudo pour le tournoi.

### Composants Clés
- **Tournament Card**: Info du tournoi rejoint (nom, nb joueurs, type)
- **IDX Input**: Input pour l'identifiant DLS + bouton vérifier
- **Player Preview Card**: 
  - Team logo + nom équipe
  - Badge division (Élite Div. I)
  - Stats grid (Joués/Victoires/Défaites)
- **Pseudo Input**: Choix du pseudo dans le tournoi

### Props/State
```javascript
{
  idx: string,               // Identifiant DLS saisi
  checking: boolean,          // Vérification en cours
  playerData: {
    team: string,            // Nom équipe
    division: string,         // Division
    played: number,          // Matchs joués
    wins: number,            // Victoires
    losses: number           // Défaites
  } | null,
  pseudo: string            // Pseudo choisi
}
```

### Flow
1. Saisie idx → 2. Vérification → 3. Affichage stats → 4. Choix pseudo → 5. Continue vers upload logo

### Icônes Lucide Utilisées
- `ArrowLeft` - Retour
- `Trophy` - Info tournoi
- `Search` - Bouton vérifier
- `Shield` - Logo équipe et avatar
- `CheckCircle2/XCircle` - Validation status

---

## Écran 5: UploadLogo (Logo Équipe)

**Fichier**: `src/pages/UploadLogo.jsx`
**Route**: `/upload-logo`
**Access**: Public

### Description
Page d'upload du logo d'équipe avec option de choisir un emoji/icône prédéfini.

### Composants Clés
- **Upload Hero Zone**: Zone cliquable pour upload fichier
- **File Info**: Affichage nom fichier, taille, stockage Cloudinary
- **Emoji Strip**: Sélection d'icônes (Aigle, Lion, Dragon, Foudre, Feu, Diamant)
- **Confirmation Card**: Récap team + logo sélectionné
- **Upload Progress**: Animation pendant upload

### Props/State
```javascript
{
  selectedEmoji: string,    // ID emoji sélectionné ('eagle', 'lion', etc.)
  uploadedFile: {
    name: string,            // Nom fichier
    size: string             // Taille (ex: "1.2 MB")
  } | null,
  uploading: boolean        // Upload en cours
}
```

### Options Emoji/Icônes
1. Aigle (Eagle) - Shield icon
2. Lion - Shield icon
3. Dragon - Shield icon
4. Foudre (Bolt) - Shield icon
5. Feu (Fire) - Shield icon
6. Diamant (Diamond) - Shield icon

### Icônes Lucide Utilisées
- `ArrowLeft` - Retour
- `Upload` - Zone upload
- `Shield` - Emoji placeholder et sélection
- `FileImage` - Fichier uploadé
- `Check` - Confirmation
- `Cloud` - Badge Cloudinary

---

## Écran 6: WaitingStatus (Attente Validation)

**Fichier**: `src/pages/WaitingStatus.jsx`
**Route**: `/attente`
**Access**: Public

### Description
Page d'attente affichant le statut de la demande d'inscription avec animation et étapes complétées/en attente.

### Composants Clés
- **Animated Header**: Horloge avec anneaux pulsants (pulse animation)
- **Dynamic Text**: "Demande envoyée..." avec points animés
- **Steps List**: 3 étapes avec statut
  - Identité DLS vérifiée ✓
  - Logo uploadé ✓
  - Validation créateur ⏳
- **Info Banner**: Message "Pas besoin de rester sur cette page"
- **Action Buttons**: Retour accueil + Mes tournois

### Props/State
```javascript
{
  dots: string  // Animation points ("", ".", "..", "...")
}
```

### Animation
- `useEffect` avec interval 500ms pour animation points
- `framer-motion` pour animations d'entrée
- CSS keyframes pour pulse des anneaux

### Étapes (Steps)
| Étape | Titre | Sous-titre | Statut | Couleur |
|-------|-------|------------|--------|---------|
| 1 | Identité DLS vérifiée | FC Lomé Eagles · Élite Div. I | completed | Vert |
| 2 | Logo uploadé | Cloudinary · eagles_logo.png | completed | Vert |
| 3 | Validation créateur | Ligue des Champions IAI | pending | Gold |

### Icônes Lucide Utilisées
- `Clock` - Animation header et étape en attente
- `CheckCircle2` - Étape complétée
- `Shield` - Identité
- `FileImage` - Logo
- `ArrowRight` - Navigation
- `Trophy` - Mes tournois

---

## Composants UI Réutilisables

### Button (`src/components/ui/Button.jsx`)
Variants: `primary`, `secondary`, `outline`, `ghost`
Sizes: `sm`, `md`, `lg`
Props: `loading`, `disabled`, `onClick`

### Card (`src/components/ui/Card.jsx`)
Props: `hover` (bool), `onClick` (func)
Style: Fond navy light avec bordure violet

### Input (`src/components/ui/Input.jsx`)
Props: `label`, `error`, `icon` (Lucide icon)
Style: Fond navy avec bordure subtile, focus bleu

### Badge (`src/components/ui/Badge.jsx`)
Variants: `default`, `blue`, `green`, `gold`, `red`
Usage: Statuts, labels, tags

---

## Layout Global

**Fichier**: `src/components/layout/Layout.jsx`

### Structure
```
<Layout>
  <Navbar />        // Navigation sticky avec logo + liens
  <main>            // Contenu centré max-w-6xl
    {children}
  </main>
  <Footer />        // Copyright + FTGames Tracker
</Layout>
```

### Navbar
- Logo DLS Hub (gradient bleu→violet)
- Liens: Accueil, Créer, Mes tournois
- Bouton "Nouveau" (mobile + desktop)
- Menu mobile responsive

---

## Routes Configurées (App.jsx)

| Route | Composant | Description |
|-------|-----------|-------------|
| `/` | Landing | Page d'accueil |
| `/creer` | CreateTournament | Créer un tournoi |
| `/rejoindre` | JoinTournament | Rejoindre via slug |
| `/inscription/:slug` | PlayerRegistration | Inscription joueur |
| `/upload-logo` | UploadLogo | Upload logo équipe |
| `/attente` | WaitingStatus | Attente validation |
| `/historique` | WaitingStatus | (placeholder) |
| `/tournoi/:slug` | div | (à venir) |

---

## Dépendances Installées

```json
{
  "react-router-dom": "^6.x",
  "framer-motion": "^11.x",
  "lucide-react": "^0.x",
  "clsx": "^2.x",
  "react-hot-toast": "^2.x",
  "tailwindcss": "^4.x",
  "@tailwindcss/vite": "^4.x"
}
```

---

## Build Production

Commande: `npm run build`

Output:
- `dist/index.html`
- `dist/assets/index-xxx.css` (22.65 kB gzipped)
- `dist/assets/index-xxx.js` (405.35 kB gzipped)

---

## Prochaines Interfaces (7-19)

Restant à développer:
- Écrans 7-11: Dashboard Créateur (Gestion, Tirage, Validation, Paramètres)
- Écrans 12-16: Vues Tournoi (Bracket, Poules, Classement, Stats, Calendrier)
- Écrans 17-19: Profil, Tournoi Terminé, Erreurs

---

*Documentation générée le: 31 Mars 2026*
*Palette: DLS 2026 (Navy #07080F, Blue #1155CC, Purple #5B1DB0, Gold #FFB800)*
*Framework: React 18 + Vite + Tailwind CSS 4*
