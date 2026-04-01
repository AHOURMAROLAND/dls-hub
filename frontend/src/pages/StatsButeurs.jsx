import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, TrendingUp, Star, Shield, Zap, Crown, Flame, Diamond } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const TOP_SCORERS = [
  { rank: 1, name: 'RolandDLS26', team: 'FC Lomé Eagles', avatar: Shield, goals: 11, color: 'var(--dls-gold)' },
  { rank: 2, name: 'AxelFC', team: 'Lions Cotonou', avatar: Crown, goals: 8, color: '#B4B2A9' },
  { rank: 3, name: 'DiamondStriker', team: 'Crystal United', avatar: Diamond, goals: 6, color: '#CD7F32' }
];

const TOP_ASSISTS = [
  { rank: 1, name: 'AxelFC', team: 'Lions Cotonou', avatar: Crown, assists: 7, color: 'var(--dls-purple-vivid)' },
  { rank: 2, name: 'RolandDLS26', team: 'FC Lomé Eagles', avatar: Shield, assists: 5, color: 'var(--dls-purple-vivid)' }
];

export default function StatsButeurs() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-4">
        {/* Header */}
        <Link to="/dashboard" className="flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors mb-4">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Dashboard</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[rgba(255,184,0,0.1)] border border-[var(--dls-gold)]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[var(--dls-gold)]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Statistiques</h1>
              <Badge variant="gold" className="mt-1">Ligue des Champions IAI</Badge>
            </div>
          </div>
        </motion.div>

        {/* MOTM Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 mb-4 border-[var(--dls-gold)]/30 bg-gradient-to-r from-[rgba(255,184,0,0.08)] to-[rgba(255,184,0,0.03)]">
            <div className="flex items-center gap-3">
              <div className="text-3xl">★</div>
              <div className="flex-1">
                <div className="text-[10px] text-[var(--dls-gold)] font-semibold uppercase tracking-wider">Homme du match</div>
                <div className="text-lg font-bold text-white">RolandDLS26</div>
                <div className="text-xs text-[var(--text-muted)]">FC Lomé Eagles · QDF 1</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[var(--dls-gold)]">3</div>
                <div className="text-[10px] text-[var(--text-muted)]">fois</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Top Scorers */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
            Top buteurs
          </div>
          <div className="space-y-2">
            {TOP_SCORERS.map((player) => (
              <Card key={player.name} className="p-3">
                <div className="flex items-center gap-3">
                  <div className={`w-6 text-center text-base font-bold`} style={{ color: player.color }}>
                    {player.rank}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-[var(--dls-navy)] flex items-center justify-center">
                    <player.avatar className="w-5 h-5 text-[var(--text-muted)]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{player.name}</div>
                    <div className="text-xs text-[var(--text-muted)]">{player.team}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-[var(--dls-green)]">{player.goals}</div>
                    <div className="text-[10px] text-[var(--text-muted)]">buts</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Top Assists */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4"
        >
          <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
            Top passeurs
          </div>
          <div className="space-y-2">
            {TOP_ASSISTS.map((player) => (
              <Card key={player.name} className="p-3">
                <div className="flex items-center gap-3">
                  <div className={`w-6 text-center text-base font-bold`} style={{ color: player.color }}>
                    {player.rank}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-[var(--dls-navy)] flex items-center justify-center">
                    <player.avatar className="w-5 h-5 text-[var(--text-muted)]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{player.name}</div>
                    <div className="text-xs text-[var(--text-muted)]">{player.team}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold" style={{ color: player.color }}>{player.assists}</div>
                    <div className="text-[10px] text-[var(--text-muted)]">passes D</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
