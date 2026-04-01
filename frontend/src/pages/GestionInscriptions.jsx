import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ClipboardList, Check, X, Eye, 
  Shield, Zap, Flame, Diamond, Crown, Swords 
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const FILTERS = [
  { id: 'all', label: 'Tous', count: 6 },
  { id: 'pending', label: 'En attente', count: 2 },
  { id: 'accepted', label: 'Acceptés', count: 3 },
  { id: 'rejected', label: 'Refusés', count: 1 }
];

const PLAYERS = [
  {
    id: 1,
    name: 'RolandDLS26',
    team: 'FC Lomé Eagles',
    division: 'Élite Div. I',
    stats: { played: 147, wins: 89, losses: 31 },
    status: 'pending',
    icon: Shield,
    color: 'var(--dls-gold)'
  },
  {
    id: 2,
    name: 'StrikerKofi',
    team: 'Thunder Accra',
    division: 'Div. II',
    stats: { played: 98, wins: 54, losses: 28 },
    status: 'pending',
    icon: Zap,
    color: 'var(--dls-purple-vivid)'
  },
  {
    id: 3,
    name: 'AxelFC',
    team: 'Lions Cotonou',
    division: 'Élite Div. I',
    status: 'accepted',
    icon: Crown,
    color: 'var(--dls-green)'
  },
  {
    id: 4,
    name: 'MasterDribble',
    team: 'Inferno FC',
    division: 'Div. II',
    status: 'accepted',
    icon: Flame,
    color: 'var(--dls-blue)'
  },
  {
    id: 5,
    name: 'DiamondStriker',
    team: 'Crystal United',
    division: 'Élite Div. I',
    status: 'accepted',
    icon: Diamond,
    color: 'var(--dls-green)'
  },
  {
    id: 6,
    name: 'DragonGK',
    team: 'idx invalide · Vérifié KO',
    division: null,
    status: 'rejected',
    icon: Shield,
    color: 'var(--dls-red)'
  }
];

export default function GestionInscriptions() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredPlayers = PLAYERS.filter(p => 
    activeFilter === 'all' ? true : p.status === activeFilter
  );

  const handleAction = (id, action) => {
    console.log(`${action} player ${id}`);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-4">
        {/* Header */}
        <Link to="/dashboard" className="flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Dashboard</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[rgba(255,184,0,0.1)] border border-[var(--dls-gold)]/20 flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-[var(--dls-gold)]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Inscriptions</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="gold">2 en attente</Badge>
                <Badge variant="green">3 acceptés</Badge>
                <Badge variant="red">1 refusé</Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-2 mb-4"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === filter.id
                  ? 'bg-[var(--dls-blue)] text-white'
                  : 'bg-[var(--dls-navy-light)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </motion.div>

        {/* Player List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {filteredPlayers.map((player, i) => (
            <Card 
              key={player.id} 
              className="p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ 
                    background: `${player.color}15`,
                    border: `1px solid ${player.color}30`
                  }}
                >
                  <player.icon className="w-6 h-6" style={{ color: player.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white truncate">{player.name}</div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {player.team} {player.division && `· ${player.division}`}
                  </div>
                  {player.stats && (
                    <div className="flex gap-3 mt-1 text-xs">
                      <span className="text-[var(--text-muted)]">
                        Joués: <span className="text-white">{player.stats.played}</span>
                      </span>
                      <span className="text-[var(--dls-green)]">
                        V: {player.stats.wins}
                      </span>
                      <span className="text-[var(--dls-red)]">
                        D: {player.stats.losses}
                      </span>
                    </div>
                  )}
                </div>
                
                {player.status === 'pending' ? (
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleAction(player.id, 'accept')}
                      className="w-8 h-8 rounded-lg bg-[var(--dls-green)]/20 hover:bg-[var(--dls-green)]/30 flex items-center justify-center transition-colors"
                    >
                      <Check className="w-4 h-4 text-[var(--dls-green)]" />
                    </button>
                    <button 
                      onClick={() => handleAction(player.id, 'reject')}
                      className="w-8 h-8 rounded-lg bg-[var(--dls-red)]/20 hover:bg-[var(--dls-red)]/30 flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-[var(--dls-red)]" />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-[var(--dls-navy)] hover:bg-[var(--dls-navy-light)] flex items-center justify-center transition-colors">
                      <Eye className="w-4 h-4 text-[var(--text-muted)]" />
                    </button>
                  </div>
                ) : player.status === 'accepted' ? (
                  <div className="w-8 h-8 rounded-full bg-[var(--dls-green)]/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-[var(--dls-green)]" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[var(--dls-red)]/20 flex items-center justify-center">
                    <X className="w-4 h-4 text-[var(--dls-red)]" />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
}
