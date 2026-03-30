# DLS Hub - Plateforme de Tournois Dream League Soccer

Plateforme web permettant de creer et gerer des tournois DLS 26 avec integration automatique du tracker officiel FTGames.

## Stack technique
- Backend : FastAPI + PostgreSQL + Redis
- Frontend : React + Vite (PWA)
- Scraping : httpx vers st.cf.api.ftpub.net
- Deploy : Railway (backend) + Vercel (frontend)

## Demarrage rapide

### Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload

## Modes de tournoi
- Elimination directe (simple ou double)
- Phases de poules + elimination
- Championnat (aller simple ou aller-retour)

## Auteur
AHOUR MAROLAND - IAI-Togo
