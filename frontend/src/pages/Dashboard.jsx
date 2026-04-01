import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trophy, Users, ClipboardList, Dices, Swords, Settings, 
  Copy, CheckCircle2, Clock, ChevronRight, Eye, UserPlus 
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { tournamentAPI } from '../lib/api';
import toast from 'react-hot-toast';

const TIMELINE = [
  { 
    id: 1, 
    player: 'RolandDLS26', 
    action: 'a rejoint · inscription en attente', 
    time: 'il y a 5min',
    status: 'pending',
    color: 'var(--dls-gold)'
  },
  { 
    id: 2, 
    player: 'AxelFC', 
    action: 'accepté · FC Lomé Eagles', 
    time: 'il y a 1h',
    status: 'success',
    color: 'var(--dls-green)'
  },
  { 
    id: 3, 
    player: null, 
    action: 'Tournoi créé · 8 places ouvertes', 
    time: 'hier',
    status: 'info',
    color: 'var(--dls-blue)'
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [tournament, setTournament] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const slug = searchParams.get('t') || 'demo';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tournamentData = await tournamentAPI.get(slug);
        setTournament(tournamentData);
        
        const playersData = await tournamentAPI.getPlayers(slug);
        setPlayers(playersData);
      } catch (error) {
        toast.error('Erreur de chargement des données');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const copyLink = () => {
    const link = `${window.location.origin}/rejoindre?code=${tournament?.slug || slug}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pendingCount = players.filter(p => p.status === 'pending').length;
  const acceptedCount = players.filter(p => p.status === 'accepted').length;

  const ACTION_CARDS = [
    { 
      id: 'inscriptions', 
      icon: ClipboardList, 
      name: 'Inscriptions', 
      sub: `${pendingCount} en attente`, 
      alert: pendingCount > 0,
      color: 'var(--dls-gold)',
      path: '/dashboard/inscriptions'
    },
    { 
      id: 'tirage', 
      icon: Dices, 
      name: 'Tirage au sort', 
      sub: `Disponible à ${acceptedCount}/${tournament?.max_teams || 8}`, 
      alert: false,
      color: 'var(--dls-blue)',
      path: '/dashboard/tirage'
    },
    { 
      id: 'validation', 
      icon: Swords, 
      name: 'Valider match', 
      sub: 'Aucun en attente', 
      alert: false,
      color: 'var(--dls-green)',
      path: '/dashboard/validation'
    },
    { 
      id: 'parametres', 
      icon: Settings, 
      name: 'Paramètres', 
      sub: 'Modifier tournoi', 
      alert: false,
      color: 'var(--dls-purple-vivid)',
      path: '/dashboard/parametres'
    }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto py-8 text-center">
          <div className="w-12 h-12 border-4 border-[var(--dls-blue)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--text-muted)]">Chargement...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-5 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--dls-gold)] to-[var(--dls-crimson)] flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-lg font-bold text-white">{tournament?.name || 'Chargement...'}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="gold">● {tournament?.status === 'registration' ? 'Inscriptions ouvertes' : tournament?.status}</Badge>
                  <Badge variant="blue">{tournament?.max_teams || 8} équipes</Badge>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3 mb-4"
        >
          <Card className="p-4">
            <div className="text-2xl font-bold text-white mb-1">
              {acceptedCount}<span className="text-sm text-[var(--text-muted)]">/{tournament?.max_teams || 8}</span>
            </div>
            <div className="text-xs text-[var(--text-muted)]">Joueurs inscrits</div>
            <div className="text-xs text-[var(--dls-gold)] mt-1">{pendingCount} en attente</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-white mb-1">0</div>
            <div className="text-xs text-[var(--text-muted)]">Matchs joués</div>
            <div className="text-xs text-[var(--dls-green)] mt-1">Tirage non fait</div>
          </Card>
        </motion.div>

        {/* Invite Link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 mb-4">
            <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Lien d'invitation
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-[var(--dls-blue)] tracking-wider">{tournament?.slug || slug}</div>
                <div className="text-xs text-[var(--text-muted)]">{window.location.origin}/rejoindre?code={tournament?.slug || slug}</div>
              </div>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={copyLink}
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copié!' : 'Copier'}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Action Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3 mb-4"
        >
          {ACTION_CARDS.map((action) => (
            <Link key={action.id} to={action.path}>
              <Card className={`p-4 cursor-pointer ${action.alert ? 'border-[var(--dls-gold)]' : ''}`}>
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
                  style={{ 
                    background: `${action.color}15`,
                    border: `1px solid ${action.color}30`
                  }}
                >
                  <action.icon className="w-5 h-5" style={{ color: action.color }} />
                </div>
                <div className="text-sm font-semibold text-white">{action.name}</div>
                <div className="text-xs text-[var(--text-muted)]">{action.sub}</div>
                {action.alert && (
                  <Badge variant="gold" className="mt-1 text-[10px]">Action requise</Badge>
                )}
              </Card>
            </Link>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
            Activité récente
          </div>
          <div className="space-y-3">
            {TIMELINE.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div 
                  className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  style={{ background: item.color }}
                />
                <div className="flex-1">
                  <div className="text-sm text-white">
                    {item.player && <span className="font-semibold">{item.player}</span>}
                    {' '}{item.action}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
