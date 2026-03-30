# Cahier de Charge - DLS Hub

## 1. Presentation du projet
Application web de gestion de tournois Dream League Soccer 26 avec validation automatique des scores via le tracker officiel FTGames (tracker.ftgames.com).

## 2. Acteurs
- Createur : cree et administre le tournoi
- Participant : s'inscrit et suit le tournoi
- Systeme : fetche les stats DLL automatiquement

## 3. Fonctionnalites

### 3.1 Gestion des tournois
- Creation avec : nom, logo, type, nombre d'equipes, format
- Lien unique d'invitation (slug 8 caracteres)
- 3 modes : Elimination / Poules / Championnat
- Elimination simple ou double
- Championnat aller simple ou aller-retour

### 3.2 Inscription des joueurs
- Saisie pseudo + identifiant DLL (idx)
- Verification automatique via tracker FTGames
- Affichage : nom equipe, division, stats
- Upload logo equipe (Cloudinary)
- Validation/refus par le createur

### 3.3 Tirage au sort
- Algorithme equilibre selon division DLL
- Regeneration possible jusqu'a validation
- Application automatique des groupes/brackets

### 3.4 Gestion des matchs
- Fetch automatique des 3 derniers matchs entre 2 joueurs
- Selection du bon match par le createur
- Validation du score ou modification manuelle
- Score manuel affiche en rouge pour tous
- Mise a jour live via WebSocket

### 3.5 Affichage
- Bracket interactif (elimination)
- Tableau de poules avec qualifies en vert
- Classement championnat avec forme
- Meilleurs buteurs et passeurs
- Responsive mobile

## 4. Regles metier
- Match de poule : 90 min seulement (nul = nul)
- Double elim match 1 : 90 min seulement
- Double elim match 2 : si nul -> prolongations + penalties
- Pas d'authentification : sessions 1 mois (cookie)
- Si session perdue : reinscription simple

## 5. Contraintes techniques
- API tracker : POST st.cf.api.ftpub.net/StatsTracker_Frontline
- Headers obligatoires (User-Agent mobile, origin tracker.ftgames.com)
- Delai entre requetes tracker pour eviter blocage
- WebSocket pour updates live du bracket
- Stockage logos : Cloudinary

## 6. Deploiement
- Backend : Railway (FastAPI + PostgreSQL + Redis)
- Frontend : Vercel (React PWA)
- CI/CD : GitHub Actions
