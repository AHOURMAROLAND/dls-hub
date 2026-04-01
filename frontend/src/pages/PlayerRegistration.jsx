import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Search, Shield, CheckCircle2, XCircle } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { playerAPI, tournamentAPI } from '../lib/api';
import toast from 'react-hot-toast';

export default function PlayerRegistration() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [idx, setIdx] = useState('');
  const [checking, setChecking] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [pseudo, setPseudo] = useState('');
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch tournament data on mount
  useEffect(() => {
    const fetchTournament = async () => {
      try {
        const data = await tournamentAPI.get(slug);
        setTournament(data);
      } catch (error) {
        toast.error('Tournoi introuvable');
        navigate('/');
      }
    };
    fetchTournament();
  }, [slug, navigate]);

  const checkPlayer = async () => {
    if (idx.length < 6) return;
    setChecking(true);
    try {
      const data = await playerAPI.verify(idx);
      setPlayerData({
        team: data.team_name,
        division: data.division,
        played: data.played,
        wins: data.won,
        losses: data.lost,
        avatar: 'eagle'
      });
      setPseudo(data.pseudo || idx);
    } catch (error) {
      toast.error(error.message || 'Identifiant DLL invalide');
    } finally {
      setChecking(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('pseudo', pseudo);
      formData.append('dll_idx', idx);
      
      const response = await playerAPI.register(slug, formData);
      
      // Store session token
      localStorage.setItem(`player_${slug}_session`, response.session_token);
      
      toast.success('Inscription envoyée !');
      navigate('/attente');
    } catch (error) {
      toast.error(error.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto py-6">
        {/* Back */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Retour</span>
        </button>

        {/* Tournament Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[rgba(255,184,0,0.1)] border border-[var(--dls-gold)]/20 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[var(--dls-gold)]" />
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-bold text-white">{tournament?.name || 'Chargement...'}</h2>
                <p className="text-xs text-[var(--text-muted)]">
                  {tournament ? `${tournament.registered_count || 0} / ${tournament.max_teams} joueurs inscrits · ${tournament.tournament_type}` : 'Chargement...'}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* IDX Input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
            Ton identifiant DLS (idx)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={idx}
              onChange={(e) => setIdx(e.target.value)}
              placeholder="k5dfr5xx"
              className="flex-1 bg-[var(--dls-navy)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--dls-blue)] transition-colors"
            />
            <Button 
              variant="primary" 
              onClick={checkPlayer}
              disabled={idx.length < 6 || checking}
              loading={checking}
            >
              <Search className="w-4 h-4" />
              Vérifier
            </Button>
          </div>
        </motion.div>

        {/* Player Preview */}
        {playerData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <Card className="p-5 overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--dls-blue)] to-[var(--dls-purple-vivid)] flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">{playerData.team}</div>
                  <Badge variant="blue">{playerData.division}</Badge>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-xl bg-[var(--dls-navy)]">
                  <div className="text-xl font-bold text-white">{playerData.played}</div>
                  <div className="text-xs text-[var(--text-muted)]">Joués</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-[rgba(26,110,62,0.1)]">
                  <div className="text-xl font-bold text-[var(--dls-green)]">{playerData.wins}</div>
                  <div className="text-xs text-[var(--dls-green)]">Victoires</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-[rgba(168,11,28,0.1)]">
                  <div className="text-xl font-bold text-[var(--dls-red)]">{playerData.losses}</div>
                  <div className="text-xs text-[var(--dls-red)]">Défaites</div>
                </div>
              </div>
            </Card>

            {/* Pseudo Input */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                Pseudo dans le tournoi
              </label>
              <input
                type="text"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                className="w-full bg-[var(--dls-navy)] border border-[var(--border-subtle)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--dls-blue)] transition-colors"
              />
            </div>

            {/* Register Button */}
            <Button 
              variant="primary" 
              className="w-full" 
              onClick={handleRegister}
              loading={loading}
              disabled={!pseudo.trim()}
            >
              S'inscrire au tournoi
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
