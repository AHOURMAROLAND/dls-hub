# DLS Hub - Documentation Interfaces (Écrans 7-11)

## Vue d'ensemble - Dashboard Créateur
Cette documentation décrit les 5 écrans du Dashboard Créateur de l'application DLS Hub, convertis de HTML vers React/Vite avec la palette DLS 2026.

---

## Écran 7: Dashboard (Principal)

**Fichier**: `src/pages/Dashboard.jsx`
**Route**: `/dashboard`
**Access**: Créateur uniquement

### Description
Vue d'ensemble du tournoi avec statistiques en temps réel, lien d'invitation, actions rapides et timeline d'activité.

### Composants Clés
- **Header Card**: Nom du tournoi + badges statut (inscriptions ouvertes, nb équipes)
- **Stats Grid**: Joueurs inscrits (5/8), matchs joués avec indicateurs visuels
- **Invite Link Box**: Code K7F2XQ9A + bouton copier avec feedback visuel
- **Action Cards Grid**: 4 cards (Inscriptions, Tirage, Validation, Paramètres)
- **Timeline**: Activité récente avec dots colorés et timestamps

### Props/State
```javascript
{
  copied: boolean  // État du bouton copier (feedback visuel)
}
```

### Data Constants
- `ACTION_CARDS`: Configuration des 4 actions rapides
- `TIMELINE`: Données d'activité récente

### Icônes Lucide Utilisées
- `Trophy` - Header et logo
- `Users` - Stats joueurs
- `Copy/CheckCircle2` - Bouton copier lien
- `ClipboardList` - Action inscriptions
- `Dices` - Action tirage
- `Swords` - Action validation
- `Settings` - Action paramètres
- `Eye/Clock/UserPlus` - Timeline

---

## Écran 8: GestionInscriptions

**Fichier**: `src/pages/GestionInscriptions.jsx`
**Route**: `/dashboard/inscriptions`
**Access**: Créateur uniquement

### Description
Interface de gestion des inscriptions avec filtres, liste des joueurs et actions accepter/refuser.

### Composants Clés
- **Header**: Titre + badges filtres (en attente/acceptés/refusés)
- **Filter Tabs**: Navigation par statut (Tous, En attente, Acceptés, Refusés)
- **Player Cards**: 
  - Avatar (icône couleur selon équipe)
  - Info joueur (nom, équipe, division)
  - Stats mini (joués/victoires/défaites) pour pending
  - Actions (✓ accepter, ✕ refuser, 👁 voir) ou checkmark final

### Props/State
```javascript
{
  activeFilter: string  // 'all' | 'pending' | 'accepted' | 'rejected'
}
```

### Data Constants
- `FILTERS`: Configuration des 4 filtres
- `PLAYERS`: Liste des 6 joueurs avec données complètes

### Icônes Lucide Utilisées
- `ArrowLeft` - Retour dashboard
- `ClipboardList` - Header
- `Shield/Zap/Crown/Flame/Diamond` - Avatars joueurs
- `Check/X/Eye` - Actions

---

## Écran 9: TirageSort

**Fichier**: `src/pages/TirageSort.jsx`
**Route**: `/dashboard/tirage`
**Access**: Créateur uniquement

### Description
Visualisation et génération du tirage au sort avec algorithm balanced_draw et système de têtes de série.

### Composants Clés
- **Header**: Titre + sous-titre (8 joueurs · Élimination simple)
- **Algo Badge**: Badge "Algorithme balanced_draw · Trié par division DLL"
- **Draw Groups**: Groupes de matchs (Quarts de finale)
  - Slots numérotés (1, 2)
  - Avatar joueur avec icône
  - Nom + division + badge "★ Top" pour têtes de série
- **Action Buttons**: Régénérer (avec animation rotate) + Valider

### Props/State
```javascript
{
  regenerating: boolean,  // Animation en cours
  validated: boolean      // Tirage validé
}
```

### Data Constants
- `DRAW_GROUPS`: Configuration des 2 quarts de finale avec 2 slots chacun

### Icônes Lucide Utilisées
- `ArrowLeft` - Retour
- `Dices` - Header tirage
- `Shield/Zap/Crown/Flame` - Avatars joueurs
- `RefreshCw` - Bouton régénérer
- `Check` - Bouton valider

---

## Écran 10: ValidationMatch

**Fichier**: `src/pages/ValidationMatch.jsx`
**Route**: `/dashboard/validation`
**Access**: Créateur uniquement

### Description
Validation des scores de match via le tracker FTGames avec sélection du match et option de score manuel.

### Composants Clés
- **Match Header**: VS entre deux joueurs avec avatars et noms d'équipe
- **Tracker Badge**: Badge Live + texte "3 derniers matchs FTGames tracker"
- **Match Options**: Liste des 3 derniers matchs avec radio buttons
  - Score (ex: 3 – 1)
  - Date et durée
  - Buteurs détaillés
- **Manual Score Section**: Input manuel rouge avec séparateur
- **Validate Bar**: Annuler + Valider avec broadcast WebSocket

### Props/State
```javascript
{
  selectedMatch: number,     // ID match sélectionné
  manualScore: {             // Score manuel
    home: number,
    away: number
  }
}
```

### Data Constants
- `MATCH_OPTIONS`: 3 derniers matchs du tracker

### Icônes Lucide Utilisées
- `ArrowLeft` - Retour
- `Swords` - Header validation
- `Shield/Zap` - Avatars équipes
- `Radio` - Badge Live
- `Check` - Radio buttons sélectionnés

---

## Écran 11: ParametresTournament

**Fichier**: `src/pages/ParametresTournament.jsx`
**Route**: `/dashboard/parametres`
**Access**: Créateur uniquement

### Description
Configuration du tournoi avec sections Informations, Règles, Lien & partage et zone dangereuse.

### Composants Clés
- **Param Sections**: 3 sections groupées par thème
  - **Informations**: Nom, Logo, Nombre d'équipes (verrouillé)
  - **Règles**: Double élimination (toggle), Lien d'invitation (toggle)
  - **Lien & partage**: Partager le bracket
- **Param Items**: Ligne avec icône, nom, détail, action (chevron, toggle, badge verrouillé)
- **Danger Zone**: Bouton "Annuler et supprimer le tournoi" en rouge

### Props/State
```javascript
{
  toggles: {
    double: boolean,   // Double élimination
    link: boolean      // Lien actif
  }
}
```

### Data Constants
- `PARAM_SECTIONS`: Configuration des 3 sections avec leurs items

### Icônes Lucide Utilisées
- `ArrowLeft` - Retour
- `Settings` - Header
- `Edit3/Image/Users` - Section Informations
- `Clock/Link2` - Section Règles
- `Share2` - Section partage
- `ChevronRight` - Navigation
- `Trash2` - Zone dangereuse

---

## Navigation Dashboard

Tous les écrans 7-11 partagent :
- **Layout**: Même structure avec Navbar et Footer
- **Back Button**: Lien de retour vers `/dashboard`
- **Header Pattern**: Icône dans badge coloré + titre + sous-titre
- **Card Pattern**: Cards avec bordure violet DLS et hover effects

### Routes Configurées
| Route | Composant | Description |
|-------|-----------|-------------|
| `/dashboard` | Dashboard | Vue d'ensemble |
| `/dashboard/inscriptions` | GestionInscriptions | Gestion joueurs |
| `/dashboard/tirage` | TirageSort | Génération brackets |
| `/dashboard/validation` | ValidationMatch | Validation scores |
| `/dashboard/parametres` | ParametresTournament | Configuration |

---

## Build Production

Commande: `npm run build`

Output:
- `dist/assets/index-xxx.css` (22.65 kB gzipped)
- `dist/assets/index-xxx.js` (432.96 kB gzipped)

---

## Prochaines Interfaces (12-19)

Restant à développer:
- Écrans 12-16: Vues Tournoi Partagées (Bracket, Poules, Classement, Stats, Calendrier)
- Écrans 17-19: Profil, Tournoi Terminé, Erreurs

---

*Documentation générée le: 31 Mars 2026*
*Palette: DLS 2026 (Navy #07080F, Blue #1155CC, Purple #5B1DB0, Gold #FFB800, Red #A80B1C)*
*Framework: React 18 + Vite + Tailwind CSS 4*
*Icons: Lucide React*
