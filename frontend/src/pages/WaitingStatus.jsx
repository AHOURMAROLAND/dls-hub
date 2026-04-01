import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Shield, FileImage, ArrowRight, Trophy } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { tournamentAPI, playerAPI } from '../lib/api';
import toast from 'react-hot-toast';

const STEPS = [
  {
    id: 'identity',
    icon: Shield,
    title: 'Identité DLS vérifiée',
    subtitle: 'FC Lomé Eagles · Élite Div. I',
    status: 'completed',
    color: 'var(--dls-green)'
  },
  {
    id: 'logo',
    icon: FileImage,
    title: 'Logo uploadé',
    subtitle: 'Cloudinary · eagles_logo.png',
    status: 'completed',
    color: 'var(--dls-green)'
  },
  {
    id: 'validation',
    icon: Clock,
    title: 'Validation créateur',
    subtitle: 'Ligue des Champions IAI',
    status: 'pending',
    color: 'var(--dls-gold)'
  }
];

export default function WaitingStatus() {
  const [searchParams] = useSearchParams();
  const [dots, setDots] = useState('');
  const [player, setPlayer] = useState(null);
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const slug = searchParams.get('t') || localStorage.getItem('last_tournament_slug');
  const playerSession = localStorage.getItem(`player_${slug}_session`);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        toast.error('Aucun tournoi spécifié');
        return;
      }
      try {
        const tournamentData = await tournamentAPI.get(slug);
        setTournament(tournamentData);
        
        const playersData = await tournamentAPI.getPlayers(slug);
        // Find current player by session
        const currentPlayer = playersData.find(p => p.session_token === playerSession);
        setPlayer(currentPlayer || playersData[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, playerSession]);

  const steps = [
    {
      id: 'identity',
      icon: Shield,
      title: 'Identité DLS vérifiée',
      subtitle: player ? `${player.team_name} · ${player.dll_division || 'Division inconnue'}` : 'Vérification...',
      status: 'completed',
      color: 'var(--dls-green)'
    },
    {
      id: 'logo',
      icon: FileImage,
      title: 'Logo uploadé',
      subtitle: player?.team_logo_url ? 'Logo personnalisé' : 'Logo par défaut',
      status: player?.team_logo_url ? 'completed' : 'pending',
      color: 'var(--dls-green)'
    },
    {
      id: 'validation',
      icon: Clock,
      title: 'Validation créateur',
      subtitle: tournament?.name || 'En attente...',
      status: player?.status === 'accepted' ? 'completed' : 'pending',
      color: 'var(--dls-gold)'
    }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="max-w-lg mx-auto py-8 text-center">
          <div className="w-12 h-12 border-4 border-[var(--dls-blue)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--text-muted)]">Chargement...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-lg mx-auto py-8">
        {/* Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="relative w-24 h-24 mx-auto mb-4">
            {/* Pulsing rings */}
            <div className="absolute inset-0 rounded-full bg-[var(--dls-blue)]/20 animate-ping" />
            <div className="absolute inset-2 rounded-full bg-[var(--dls-blue)]/30 animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--dls-blue)] to-[var(--dls-purple-vivid)] flex items-center justify-center">
              <Clock className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Demande envoyée{dots}
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Le créateur doit valider ton inscription.
            <br />
            Tu seras notifié dès la réponse.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-3 mb-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className={`p-4 ${step.status === 'pending' ? 'border-[var(--dls-gold)]/30' : ''}`}>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: step.status === 'completed' 
                        ? `${step.color}20` 
                        : 'rgba(255,184,0,0.1)',
                      border: `1px solid ${step.status === 'completed' ? step.color : 'var(--dls-gold)'}30`
                    }}
                  >
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="w-5 h-5" style={{ color: step.color }} />
                    ) : (
                      <Clock className="w-5 h-5 text-[var(--dls-gold)]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white">{step.title}</div>
                    <div className="text-xs text-[var(--text-muted)]">{step.subtitle}</div>
                  </div>
                  <div 
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: step.status === 'completed' 
                        ? `${step.color}15` 
                        : 'rgba(255,184,0,0.15)',
                      color: step.status === 'completed' ? step.color : 'var(--dls-gold)'
                    }}
                  >
                    {step.status === 'completed' ? 'OK' : 'En attente'}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div className="rounded-xl bg-[rgba(17,85,204,0.05)] border border-[var(--dls-blue)]/20 p-4 text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              <span className="text-[var(--dls-blue)] font-medium">Pas besoin de rester sur cette page.</span>
              <br />
              Reviens sur ce lien pour voir si tu es accepté.
            </p>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link to="/" className="flex-1">
            <Button variant="secondary" className="w-full">
              Retour à l'accueil
            </Button>
          </Link>
          <Link to="/historique" className="flex-1">
            <Button variant="outline" className="w-full">
              Mes tournois
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
