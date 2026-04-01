import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Swords, Shield, Zap, Check, Radio } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const MATCH_OPTIONS = [
  {
    id: 1,
    score: '3 – 1',
    date: 'Aujourd\'hui 14h32 · 90min',
    scorers: 'Buts: Ronaldo ×2, Messi · Adv: Neymar',
    selected: true
  },
  {
    id: 2,
    score: '2 – 2',
    date: 'Hier 20h15 · 90min',
    scorers: 'Buts: Salah ×2 · Adv: Mbappe ×2',
    selected: false
  },
  {
    id: 3,
    score: '1 – 4',
    date: 'Avant-hier 18h05 · 90min',
    scorers: 'Buts: Vini · Adv: Benzema ×3, Haaland',
    selected: false
  }
];

export default function ValidationMatch() {
  const [selectedMatch, setSelectedMatch] = useState(1);
  const [manualScore, setManualScore] = useState({ home: 3, away: 1 });

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
          className="mb-4"
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-[rgba(26,110,62,0.1)] border border-[var(--dls-green)]/20 flex items-center justify-center">
              <Swords className="w-5 h-5 text-[var(--dls-green)]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Valider un match</h1>
              <p className="text-xs text-[var(--text-muted)]">QDF 1 · Élimination simple</p>
            </div>
          </div>
        </motion.div>

        {/* Match Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[rgba(255,184,0,0.1)] border border-[var(--dls-gold)]/20 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[var(--dls-gold)]" />
                </div>
                <div>
                  <div className="font-semibold text-white">RolandDLS26</div>
                  <div className="text-xs text-[var(--text-muted)]">FC Lomé Eagles</div>
                </div>
              </div>
              <div className="text-lg font-bold text-[var(--text-muted)]">VS</div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-semibold text-white">StrikerKofi</div>
                  <div className="text-xs text-[var(--text-muted)]">Thunder Accra</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[rgba(91,29,176,0.1)] border border-[var(--dls-purple-vivid)]/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[var(--dls-purple-vivid)]" />
                </div>
              </div>
            </div>

            {/* Tracker Badge */}
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-3">
              <span>3 derniers matchs FTGames tracker</span>
              <Badge variant="blue" className="text-[10px] flex items-center gap-1">
                <Radio className="w-3 h-3" />
                Live
              </Badge>
            </div>
          </Card>
        </motion.div>

        {/* Match Options */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2 mb-4"
        >
          {MATCH_OPTIONS.map((match) => (
            <div
              key={match.id}
              onClick={() => setSelectedMatch(match.id)}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                selectedMatch === match.id
                  ? 'bg-[rgba(17,85,204,0.1)] border-[var(--dls-blue)]'
                  : 'bg-[var(--dls-navy-light)] border-[var(--border-subtle)] hover:border-[var(--dls-purple-vivid)]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                  selectedMatch === match.id
                    ? 'border-[var(--dls-blue)] bg-[var(--dls-blue)]'
                    : 'border-[var(--border-subtle)]'
                }`}>
                  {selectedMatch === match.id && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="flex-1">
                  <div className="text-lg font-bold text-white">{match.score}</div>
                  <div className="text-xs text-[var(--text-muted)]">{match.date}</div>
                  <div className="text-xs text-[var(--text-secondary)] mt-1">{match.scorers}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Manual Score */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 mb-4">
            <div className="text-xs text-[var(--dls-red)] font-medium mb-3 flex items-center gap-1">
              <span>✎</span> Score manuel (affiché en rouge)
            </div>
            <div className="flex items-center justify-center gap-3">
              <input
                type="number"
                value={manualScore.home}
                onChange={(e) => setManualScore({ ...manualScore, home: e.target.value })}
                className="w-16 h-14 bg-[var(--dls-navy)] border border-[var(--dls-red)]/30 rounded-xl text-center text-2xl font-bold text-[var(--dls-red)] focus:outline-none focus:border-[var(--dls-red)]"
                min="0"
                max="99"
              />
              <div className="text-xl font-bold text-[var(--text-muted)]">–</div>
              <input
                type="number"
                value={manualScore.away}
                onChange={(e) => setManualScore({ ...manualScore, away: e.target.value })}
                className="w-16 h-14 bg-[var(--dls-navy)] border border-[var(--dls-red)]/30 rounded-xl text-center text-2xl font-bold text-[var(--dls-red)] focus:outline-none focus:border-[var(--dls-red)]"
                min="0"
                max="99"
              />
            </div>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3"
        >
          <Button variant="ghost" className="flex-1">
            Annuler
          </Button>
          <Button variant="primary" className="flex-1">
            <Check className="w-4 h-4" />
            Valider ce score
          </Button>
        </motion.div>

        <p className="text-xs text-[var(--text-muted)] text-center mt-3">
          Broadcast WebSocket → tous les clients
        </p>
      </div>
    </Layout>
  );
}
