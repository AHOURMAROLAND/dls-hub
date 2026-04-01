import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Trophy, Crown, Share2, Medal } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const PODIUM = {
  champion: { name: 'RolandDLS26', team: 'FC Lomé Eagles · Élite Div. I', score: '4 – 1' },
  second: { name: 'AxelFC', team: 'Lions Cotonou' },
  third: { name: 'DiamondStriker', team: 'Crystal United' }
};

const FINAL_STATS = [
  { label: 'Matchs joués', value: '24' },
  { label: 'Buts marqués', value: '87' },
  { label: 'Top buteur', value: 'RolandDLS26', sub: '11 buts', color: 'var(--dls-gold)' },
  { label: 'Top passeur', value: 'AxelFC', sub: '7 PD', color: 'var(--dls-purple-vivid)' }
];

export default function TournoiTermine() {
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
              <Trophy className="w-5 h-5 text-[var(--dls-gold)]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Tournoi terminé</h1>
              <Badge variant="green" className="mt-1">Ligue des Champions IAI</Badge>
            </div>
          </div>
        </motion.div>

        {/* Champion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 mb-3 border-[var(--dls-gold)]/30 bg-gradient-to-br from-[rgba(255,184,0,0.12)] to-[rgba(255,184,0,0.04)]">
            <div className="text-center">
              <div className="text-4xl mb-2">👑</div>
              <div className="text-[10px] text-[var(--dls-gold)] font-bold uppercase tracking-widest mb-2">Champion</div>
              <h2 className="text-xl font-bold text-white mb-1">{PODIUM.champion.name}</h2>
              <p className="text-xs text-[var(--text-muted)] mb-3">{PODIUM.champion.team}</p>
              <div className="inline-block px-4 py-1.5 rounded-full bg-[rgba(255,184,0,0.15)] border border-[var(--dls-gold)]/25">
                <span className="text-lg font-bold text-[var(--dls-gold)]">{PODIUM.champion.score}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* 2nd & 3rd */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-3 mb-4"
        >
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">🥈</div>
            <div className="text-sm font-bold text-white">{PODIUM.second.name}</div>
            <div className="text-xs text-[var(--text-muted)]">{PODIUM.second.team}</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl mb-1">🥉</div>
            <div className="text-sm font-bold text-white">{PODIUM.third.name}</div>
            <div className="text-xs text-[var(--text-muted)]">{PODIUM.third.team}</div>
          </Card>
        </motion.div>

        {/* Final Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3 mb-4"
        >
          {FINAL_STATS.map((stat) => (
            <Card key={stat.label} className="p-3">
              <div className={`text-lg font-bold ${stat.color || 'text-white'}`}>{stat.value}</div>
              <div className="text-[10px] text-[var(--text-muted)]">{stat.label}</div>
              {stat.sub && <div className="text-[10px] text-[var(--text-muted)]">{stat.sub}</div>}
            </Card>
          ))}
        </motion.div>

        {/* Share Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button variant="primary" className="w-full">
            <Share2 className="w-4 h-4" />
            Partager le palmarès
          </Button>
          <p className="text-xs text-[var(--text-muted)] text-center mt-2">Vue publique · lecture seule</p>
        </motion.div>
      </div>
    </Layout>
  );
}
