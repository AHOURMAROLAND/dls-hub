import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, User, Shield, Trophy, Check, X, Minus } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const STATS = [
  { label: 'Joués', value: 4, color: 'white' },
  { label: 'Victoires', value: 3, color: 'var(--dls-green)' },
  { label: 'Défaites', value: 0, color: 'var(--dls-red)' },
  { label: 'Buts', value: 11, color: 'var(--dls-gold)' }
];

const EXTRA_STATS = [
  { label: 'Passes D.', value: 5, color: 'var(--dls-purple-vivid)' },
  { label: 'MOTM', value: 3, color: 'var(--dls-gold)' }
];

const HISTORY = [
  { result: 'V', opponent: 'StrikerKofi', round: 'QDF 1', date: 'Aujourd\'hui', score: '3–1', manual: false },
  { result: 'V', opponent: 'WolfFC', round: 'Journée 3', date: 'Hier', score: '2–0', manual: false },
  { result: 'N', opponent: 'DiamondStriker', round: 'Journée 2', date: '', score: '1–1', manual: false },
  { result: 'V', opponent: 'FoxStriker', round: 'Journée 1', date: '', score: '5–2', manual: true }
];

const ResultBadge = ({ result }) => {
  const styles = {
    V: 'bg-[rgba(0,214,143,0.15)] text-[var(--dls-green)]',
    D: 'bg-[rgba(255,79,94,0.12)] text-[var(--dls-red)]',
    N: 'bg-[rgba(255,255,255,0.07)] text-[var(--text-muted)]'
  };
  return (
    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-sm font-bold ${styles[result]}`}>
      {result}
    </div>
  );
};

export default function ProfilJoueur() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto py-4">
        {/* Header */}
        <Link to="/bracket" className="flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors mb-4">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Bracket</span>
        </Link>

        {/* Profile Hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 mb-4 border-[var(--dls-green)]/30 bg-gradient-to-br from-[rgba(0,214,143,0.1)] to-[rgba(0,214,143,0.03)]">
            <div className="text-center">
              <div className="text-5xl mb-3">🦅</div>
              <h1 className="text-xl font-bold text-white mb-1">RolandDLS26</h1>
              <p className="text-sm text-[var(--text-muted)] mb-3">FC Lomé Eagles</p>
              <Badge variant="gold" className="text-xs">★ ÉLITE DIVISION I</Badge>
            </div>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-2 mb-2"
        >
          {STATS.map((stat) => (
            <Card key={stat.label} className="p-3 text-center">
              <div className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-[10px] text-[var(--text-muted)]">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 gap-2 mb-4"
        >
          {EXTRA_STATS.map((stat) => (
            <Card key={stat.label} className="p-3 text-center">
              <div className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-[10px] text-[var(--text-muted)]">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        {/* History */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
            Historique tournoi
          </div>
          <div className="space-y-2">
            {HISTORY.map((match, i) => (
              <Card key={i} className="p-3">
                <div className="flex items-center gap-3">
                  <ResultBadge result={match.result} />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white">vs {match.opponent}</div>
                    <div className="text-xs text-[var(--text-muted)]">{match.round} {match.date && `· ${match.date}`}</div>
                  </div>
                  <div className={`text-lg font-bold ${match.manual ? 'text-[var(--dls-red)]' : 'text-white'}`}>
                    {match.score} {match.manual && '✎'}
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
