# DLS Hub - Documentation Interfaces (Écrans 12-19)

## Vue d'ensemble - Vues Tournoi, Profil & États Système
Cette documentation décrit les 8 derniers écrans de l'application DLS Hub (12-19), convertis de HTML vers React/Vite avec la palette DLS 2026.

---

## Écran 12: BracketElimination

**Fichier**: `src/pages/BracketElimination.jsx`
**Route**: `/bracket`
**Access**: Partagé (Créateur + Participant)

### Description
Visualisation interactive du bracket d'élimination avec support pour Winners/Losers brackets, matchs en live et indication des scores manuels.

### Composants Clés
- **Tabs Winners/Losers**: Switch entre brackets
- **Round Columns**: Colonnes pour chaque round (Quarts, Demis)
- **Match Cards**: 
  - Indicateur LIVE avec pulse animation
  - Avatars équipes (icônes Lucide)
  - Scores avec color coding (vert = gagnant, rouge = manuel)
  - Connecteurs visuels entre rounds
- **Finale Card**: Card spéciale avec border gold

### Props/State
```javascript
{
  activeTab: string,  // 'winners' | 'losers'
  matches: Array<{     // Match data
    id, live, team1, team2, score1, score2, winner, manual
  }>
}
```

### Icônes Lucide Utilisées
- `TrophyIcon, Circle` - Header et badge LIVE
- `Shield, Zap, Crown, Flame, Diamond, Swords` - Avatars équipes

---

## Écran 13: PhasePoules

**Fichier**: `src/pages/PhasePoules.jsx`
**Route**: `/poules`
**Access**: Partagé

### Description
Affichage des classements de groupes avec tableau de standings et derniers résultats.

### Composants Clés
- **Group Tabs**: Navigation entre Groupes A/B/C/D
- **Standings Table**:
  - Colonnes: Équipe, J, V, D, DB (Diff Buts), Pts
  - Lignes qualifiées surlignées (vert)
  - Rank colors (gold=1er, silver=2ème)
- **Recent Matches**: Derniers matchs du groupe avec badges

### Props/State
```javascript
{
  activeGroup: number,  // Index groupe actif (0-3)
  standings: Array<{
    pos, name, avatar, played, wins, losses, diff, pts, qualified, rank
  }>
}
```

### Icônes Lucide Utilisées
- `Trophy, ChevronLeft` - Navigation
- `Shield, Zap, Crown, Flame` - Avatars équipes

---

## Écran 14: ClassementChampionnat

**Fichier**: `src/pages/ClassementChampionnat.jsx`
**Route**: `/classement`
**Access**: Partagé

### Description
Classement complet du championnat avec forme des 5 derniers matchs et différence de buts.

### Composants Clés
- **Classement List**: Liste verticale des équipes
- **Position Badges**: Gold/Silver/Bronze/Standard
- **Form Badges**: 5 badges (V=vert, D=rouge, N=gris)
- **Stats**: Points + Différence de buts

### Data Structure
```javascript
standings: Array<{
  pos, name, avatar, form: ['V','V','N','V','V'], pts, diff, rank
}>
```

### Icônes Lucide Utilisées
- `BarChart3` - Header
- `Shield, Zap, Crown, Flame, Diamond, Swords` - Avatars

---

## Écran 15: StatsButeurs

**Fichier**: `src/pages/StatsButeurs.jsx`
**Route**: `/stats`
**Access**: Partagé

### Description
Statistiques du tournoi avec top buteurs, top passeurs et homme du match (MOTM).

### Composants Clés
- **MOTM Card**: Homme du match en évidence (gradient gold)
- **Top Scorers**: Podium buteurs avec médailles
- **Top Assists**: Podium passeurs décisives

### Data Structure
```javascript
{
  motm: { name, team, count },
  scorers: Array<{ rank, name, team, goals }>,
  assists: Array<{ rank, name, team, assists }>
}
```

### Icônes Lucide Utilisées
- `TrendingUp, Star` - Header et MOTM
- `Shield, Zap, Crown, Flame, Diamond` - Avatars

---

## Écran 16: Calendrier

**Fichier**: `src/pages/Calendrier.jsx`
**Route**: `/calendrier`
**Access**: Partagé

### Description
Calendrier complet des matchs avec indicateurs de statut (live, à venir, terminé, manuel).

### Composants Clés
- **Match Days**: Groupés par jour (Aujourd'hui, Hier, etc.)
- **Match Cards**:
  - Live: Border vert + badge LIVE
  - Upcoming: Score "–" et badge round
  - Completed: Score final + badge Validé
  - Manual: Border rouge + badge Manuel
- **VS Indicator**: "en cours", "à jouer", "résultat final"

### Match Status
- `live` - Match en cours (WebSocket)
- `upcoming` - À venir
- `completed` - Terminé et validé
- `manual` - Score saisi manuellement

---

## Écran 17: ProfilJoueur

**Fichier**: `src/pages/ProfilJoueur.jsx`
**Route**: `/profil`
**Access**: Partagé

### Description
Profil individuel d'un joueur avec stats tournoi et historique des matchs.

### Composants Clés
- **Profile Hero**: Avatar, nom, équipe, division (badge gold)
- **Stats Grid**: 4+2 stats (Joués, Victoires, Défaites, Buts, Passes, MOTM)
- **History**: Liste des matchs avec résultats (V/N/D) et scores
- **Result Badges**: Colorés selon résultat (V=vert, D=rouge, N=gris)

### Data Structure
```javascript
{
  profile: { name, team, division },
  stats: { played, wins, losses, goals, assists, motm },
  history: Array<{ result, opponent, round, date, score, manual }>
}
```

---

## Écran 18: TournoiTermine

**Fichier**: `src/pages/TournoiTermine.jsx`
**Route**: `/termine`
**Access**: Partagé

### Description
Page de fin de tournoi avec podium et statistiques finales.

### Composants Clés
- **Champion Card**: Card gold avec couronne et score final
- **Podium 2nd/3rd**: Cards côte à côte avec médailles
- **Final Stats**: Grid 2x2 (Matchs, Buts, Top buteur, Top passeur)
- **Share Button**: Partager le palmarès

### Data Structure
```javascript
{
  podium: {
    champion: { name, team, score },
    second: { name, team },
    third: { name, team }
  },
  stats: { matches, goals, topScorer, topAssister }
}
```

---

## Écran 19: SystemStates

**Fichier**: `src/pages/SystemStates.jsx`
**Route**: `/404`, `/session-expiree`, `/chargement`, `/offline`
**Access**: Système

### Description
Écrans d'erreur et d'état du système (404, session expirée, chargement, offline).

### Composants Exportés

#### Error404
- Icône lien brisé (rouge)
- Message "Lien invalide"
- Boutons: Retour accueil, Entrer autre code

#### SessionExpired
- Icône horloge (gold)
- Message d'expiration
- Info réinscription
- Bouton réinscription

#### LoadingWebSocket
- Double animation spin
- Barre de progression animée
- Message "Synchronisation..."

#### Offline
- Icône WiFi (rouge)
- Message connexion perdue
- Bouton réessayer

### Routing Logic
```javascript
path.includes('404') → Error404
path.includes('session-expiree') → SessionExpired
path.includes('chargement') → LoadingWebSocket
path.includes('offline') → Offline
```

---

## Routes Configurées (Écrans 12-19)

| Route | Composant | Description | Access |
|-------|-----------|-------------|--------|
| `/bracket` | BracketElimination | Bracket interactif | Partagé |
| `/poules` | PhasePoules | Classements groupes | Partagé |
| `/classement` | ClassementChampionnat | Classement championnat | Partagé |
| `/stats` | StatsButeurs | Stats & buteurs | Partagé |
| `/calendrier` | Calendrier | Calendrier matchs | Partagé |
| `/profil` | ProfilJoueur | Profil joueur | Partagé |
| `/termine` | TournoiTermine | Tournoi terminé | Partagé |
| `/404` | SystemStates | Erreur 404 | Système |
| `/session-expiree` | SystemStates | Session expirée | Système |
| `/chargement` | SystemStates | Chargement | Système |
| `/offline` | SystemStates | Hors ligne | Système |

---

## Build Production

Commande: `npm run build`

Output:
- `dist/assets/index-xxx.css` (22.65 kB gzipped)
- `dist/assets/index-xxx.js` (473.42 kB gzipped)
- ✓ Build successful

---

## Résumé Complet des 19 Écrans

| # | Écran | Fichier | Route | Access |
|---|-------|---------|-------|--------|
| 1 | Landing | Landing.jsx | `/` | Public |
| 2 | Créer Tournoi | CreateTournament.jsx | `/creer` | Public |
| 3 | Rejoindre | JoinTournament.jsx | `/rejoindre` | Public |
| 4 | Inscription | PlayerRegistration.jsx | `/inscription/:slug` | Public |
| 5 | Upload Logo | UploadLogo.jsx | `/upload-logo` | Public |
| 6 | Attente | WaitingStatus.jsx | `/attente` | Public |
| 7 | Dashboard | Dashboard.jsx | `/dashboard` | Créateur |
| 8 | Inscriptions | GestionInscriptions.jsx | `/dashboard/inscriptions` | Créateur |
| 9 | Tirage | TirageSort.jsx | `/dashboard/tirage` | Créateur |
| 10 | Validation | ValidationMatch.jsx | `/dashboard/validation` | Créateur |
| 11 | Paramètres | ParametresTournament.jsx | `/dashboard/parametres` | Créateur |
| 12 | Bracket | BracketElimination.jsx | `/bracket` | Partagé |
| 13 | Poules | PhasePoules.jsx | `/poules` | Partagé |
| 14 | Classement | ClassementChampionnat.jsx | `/classement` | Partagé |
| 15 | Stats | StatsButeurs.jsx | `/stats` | Partagé |
| 16 | Calendrier | Calendrier.jsx | `/calendrier` | Partagé |
| 17 | Profil | ProfilJoueur.jsx | `/profil` | Partagé |
| 18 | Terminé | TournoiTermine.jsx | `/termine` | Partagé |
| 19 | Système | SystemStates.jsx | `/404` etc. | Système |

---

*Documentation générée le: 31 Mars 2026*
*Palette: DLS 2026 (Navy #07080F, Blue #1155CC, Purple #5B1DB0, Gold #FFB800, Green #00D68F, Red #FF4F5E)*
*Framework: React 18 + Vite + Tailwind CSS 4*
*Icons: Lucide React + Framer Motion*
*Total: 19 écrans fonctionnels*
