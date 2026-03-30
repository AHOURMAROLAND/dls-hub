# Logique Metier - DLS Hub

## Flux principal

### Creation d'un tournoi
1. Createur remplit le formulaire (nom, logo, type, nombre equipes)
2. Backend genere un slug unique (8 chars) -> lien d'invitation
3. Createur peut s'inscrire lui-meme avec son idx DLL
4. Statut : DRAFT -> REGISTRATION

### Inscription d'un joueur
1. Joueur ouvre le lien du tournoi
2. Saisit pseudo + idx DLL (ex: k5dfr5xx)
3. Backend -> POST st.cf.api.ftpub.net/StatsTracker_Frontline
   Body: {queryType: "AWSGetUserData", queryData: {TId: "idx"}}
4. Reponse : {TNm, Div, Pla, Won, Los, Matches}
5. Affichage : nom equipe + division DLL
6. Joueur upload son logo -> Cloudinary
7. Demande envoyee au createur
8. Statut joueur : PENDING -> ACCEPTED/REJECTED

### Tirage au sort
1. Createur voit liste des joueurs acceptes
2. Clique "Generer tirage"
3. Algorithme balanced_draw :
   - Trie joueurs par division DLL
   - Repartit equitablement dans les groupes
   - Evite 2 tops ensemble si possible
4. Createur voit le resultat, peut regenerer
5. Valide -> statut tournoi : IN_PROGRESS

### Validation d'un match
1. Apres que 2 joueurs ont joue en DLL
2. Createur voit match "en attente de validation"
3. Clique sur le match
4. Backend fetche les donnees joueur A (idx_A)
5. Filtre par OId == idx_B dans les resultats
6. Trie par MTm (timestamp) decroissant
7. Renvoie les 3 derniers matchs avec heure
8. Createur selectionne le bon match
9. Score extrait : HSc / ASc selon Hom (domicile/exterieur)
10. Buteurs extraits : UGo (home) / OGo (away)
11. Createur valide OU modifie manuellement
12. Si manuel : is_manual = True -> affichage rouge
13. WebSocket broadcast -> tous les clients mettent a jour

### Regles de score selon le format
- Poule / Championnat : Min <= 90 -> 90min seulement
- Double elim match 1 : Min <= 90 -> 90min seulement
- Double elim match 2 : Min > 90 -> compte (prolongations + penalties GCR)

### Calcul classement championnat
- Victoire : 3 pts | Nul : 1 pt | Defaite : 0 pt
- Criteres de departage : pts > diff buts > buts marques

### Champs API tracker utilises
- TNm : nom de l'equipe
- Div : division DLL
- Pla/Won/Los : stats globales
- Matches.results[].HSc : score domicile
- Matches.results[].ASc : score exterieur
- Matches.results[].Hom : true si joueur est a domicile
- Matches.results[].OId : idx de l'adversaire
- Matches.results[].MTm : timestamp Unix du match
- Matches.results[].UGo : buts du joueur (scorer, Ti, assister)
- Matches.results[].OGo : buts de l'adversaire
- Matches.results[].MOTM : homme du match
- Matches.results[].GCR : code penalties (si > 0)
- Matches.results[].Min : minutes jouees
