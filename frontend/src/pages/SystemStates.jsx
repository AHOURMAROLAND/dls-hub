import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link2, Clock, Wifi, ArrowLeft, RefreshCw } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

// 404 - Lien invalide
export function Error404() {
  return (
    <div className="min-h-screen bg-[var(--dls-navy)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-sm w-full"
      >
        <Card className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[rgba(255,79,94,0.12)] border border-[var(--dls-red)]/25 flex items-center justify-center mx-auto mb-4">
            <Link2 className="w-8 h-8 text-[var(--dls-red)]" />
          </div>
          <h1 className="text-lg font-bold text-white mb-2">Lien invalide</h1>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Ce lien de tournoi n'existe pas ou a expiré.
          </p>
          <div className="px-4 py-2 rounded-lg bg-[var(--dls-navy)] border border-[var(--border-subtle)] mb-4">
            <span className="text-sm font-bold text-[var(--text-muted)] tracking-wider">ERREUR 404</span>
          </div>
          <Link to="/">
            <Button variant="primary" className="w-full mb-2">
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Button>
          </Link>
          <Link to="/rejoindre">
            <Button variant="secondary" className="w-full">
              Entrer un autre code
            </Button>
          </Link>
        </Card>
      </motion.div>
    </div>
  );
}

// Session expirée
export function SessionExpired() {
  return (
    <div className="min-h-screen bg-[var(--dls-navy)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-sm w-full"
      >
        <Card className="p-8">
          <div className="w-16 h-16 rounded-full bg-[rgba(255,184,0,0.12)] border border-[var(--dls-gold)]/25 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-[var(--dls-gold)]" />
          </div>
          <h1 className="text-lg font-bold text-white mb-2 text-center">Session expirée</h1>
          <p className="text-sm text-[var(--text-muted)] mb-4 text-center">
            Ton cookie de session a expiré (1 mois). Réinscris-toi en quelques secondes.
          </p>
          <div className="p-3 rounded-lg bg-[rgba(0,214,143,0.06)] border border-[var(--dls-green)]/15 mb-4">
            <p className="text-xs text-[var(--text-secondary)]">
              <span className="text-[var(--dls-green)] font-semibold">Déjà inscrit ?</span><br />
              Entre ton idx DLS pour retrouver ton profil instantanément dans ce tournoi.
            </p>
          </div>
          <Link to="/rejoindre">
            <Button variant="primary" className="w-full">
              Me réinscrire
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </Link>
        </Card>
      </motion.div>
    </div>
  );
}

// Loading WebSocket
export function LoadingWebSocket() {
  return (
    <div className="min-h-screen bg-[var(--dls-navy)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-sm w-full"
      >
        <Card className="p-8 text-center">
          {/* Spin Animation */}
          <div className="relative w-12 h-12 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-2 border-[rgba(255,255,255,0.08)] border-t-[var(--dls-green)] animate-spin" />
            <div className="absolute inset-1.5 rounded-full border-2 border-transparent border-t-[rgba(0,214,143,0.35)] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
          </div>
          
          <h1 className="text-lg font-bold text-white mb-2">Chargement</h1>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Synchronisation du bracket<br />via WebSocket…
          </p>
          
          {/* Progress Bar */}
          <div className="w-full h-1 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden mb-3">
            <motion.div 
              className="h-full bg-[var(--dls-green)] rounded-full"
              initial={{ width: '20%' }}
              animate={{ width: ['20%', '85%', '65%', '90%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          
          <p className="text-xs text-[var(--text-muted)]">Mise à jour live automatique</p>
        </Card>
      </motion.div>
    </div>
  );
}

// Offline
export function Offline() {
  return (
    <div className="min-h-screen bg-[var(--dls-navy)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-sm w-full"
      >
        <Card className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[rgba(255,79,94,0.1)] border border-[var(--dls-red)]/25 flex items-center justify-center mx-auto mb-4 text-xl">
                📡
          </div>
          <h1 className="text-lg font-bold text-white mb-2">Hors ligne</h1>
          <p className="text-sm text-[var(--text-muted)] mb-4">
            Connexion perdue. Vérifie ta connexion internet.
          </p>
          <Button variant="primary" className="w-full" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4" />
            Réessayer
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}

// Default export for route
export default function SystemStates() {
  // Determine which state to show based on URL or prop
  const path = window.location.pathname;
  
  if (path.includes('404')) return <Error404 />;
  if (path.includes('session-expiree')) return <SessionExpired />;
  if (path.includes('chargement')) return <LoadingWebSocket />;
  if (path.includes('offline')) return <Offline />;
  
  // Default to 404
  return <Error404 />;
}
