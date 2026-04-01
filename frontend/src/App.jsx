import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Landing from './pages/Landing';
import CreateTournament from './pages/CreateTournament';
import JoinTournament from './pages/JoinTournament';
import PlayerRegistration from './pages/PlayerRegistration';
import UploadLogo from './pages/UploadLogo';
import WaitingStatus from './pages/WaitingStatus';
import Dashboard from './pages/Dashboard';
import GestionInscriptions from './pages/GestionInscriptions';
import TirageSort from './pages/TirageSort';
import ValidationMatch from './pages/ValidationMatch';
import ParametresTournament from './pages/ParametresTournament';
import BracketElimination from './pages/BracketElimination';
import PhasePoules from './pages/PhasePoules';
import ClassementChampionnat from './pages/ClassementChampionnat';
import StatsButeurs from './pages/StatsButeurs';
import Calendrier from './pages/Calendrier';
import ProfilJoueur from './pages/ProfilJoueur';
import TournoiTermine from './pages/TournoiTermine';
import SystemStates from './pages/SystemStates';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/creer" element={<CreateTournament />} />
        <Route path="/rejoindre" element={<JoinTournament />} />
        <Route path="/inscription/:slug" element={<PlayerRegistration />} />
        <Route path="/upload-logo" element={<UploadLogo />} />
        <Route path="/attente" element={<WaitingStatus />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/inscriptions" element={<GestionInscriptions />} />
        <Route path="/dashboard/tirage" element={<TirageSort />} />
        <Route path="/dashboard/validation" element={<ValidationMatch />} />
        <Route path="/dashboard/parametres" element={<ParametresTournament />} />
        <Route path="/bracket" element={<BracketElimination />} />
        <Route path="/poules" element={<PhasePoules />} />
        <Route path="/classement" element={<ClassementChampionnat />} />
        <Route path="/stats" element={<StatsButeurs />} />
        <Route path="/calendrier" element={<Calendrier />} />
        <Route path="/profil" element={<ProfilJoueur />} />
        <Route path="/termine" element={<TournoiTermine />} />
        <Route path="/404" element={<SystemStates />} />
        <Route path="/session-expiree" element={<SystemStates />} />
        <Route path="/chargement" element={<SystemStates />} />
        <Route path="/offline" element={<SystemStates />} />
        <Route path="/historique" element={<WaitingStatus />} />
        <Route path="/tournoi/:slug" element={<div className="text-white p-8">Tournoi Detail - Coming Soon</div>} />
      </Routes>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#0F1020',
            color: '#FFFFFF',
            border: '1px solid rgba(91,29,176,0.3)'
          }
        }}
      />
    </BrowserRouter>
  );
}
