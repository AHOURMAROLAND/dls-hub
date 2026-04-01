import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trophy, Users, Zap, Trophy as TrophyIcon, ChevronLeft,
  Shield, Flame, Diamond, Crown, Swords, Circle
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const BRACKET_DATA = {
  round: 'Quarts',
  matches: [
    {
      id: 1,
      live: true,
      team1: { name: 'Roland', avatar: Shield, score: 3, winner: true },
      team2: { name: 'Kofi', avatar: Zap, score: 1, winner: false }
    },
    {
      id: 2,
      live: false,
      team1: { name: 'Axel', avatar: Crown, score: 2, winner: true },
      team2: { name: 'Master', avatar: Flame, score: 0, winner: false, manual: true }
    },
    {
      id: 3,
      live: false,
      team1: { name: 'Diamond', avatar: Diamond, score: null, winner: false },
      team2: { name: 'WolfFC', avatar: Swords, score: null, winner: false }
    },
    {
      id: 4,
      live: false,
      team1: { name: 'FoxStriker', avatar: Flame, score: null, winner: false },
      team2: { name: 'DragonGK', avatar: Shield, score: null, winner: false }
    }
  ],
  demis: [
    { id: 1, team1: 'Roland', team2: 'Axel', tbd: false },
    { id: 2, team1: null, team2: null, tbd: true }
  ]
};

export default function BracketElimination() {
  const [activeTab, setActiveTab] = useState('winners');

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-4">
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
            <div className="w-10 h-10 rounded-xl bg-[rgba(0,214,143,0.1)] border border-[var(--dls-green)]/20 flex items-center justify-center">
              <TrophyIcon className="w-5 h-5 text-[var(--dls-green)]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Bracket</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="green">● Live</Badge>
                <Badge variant="gold">QDF en cours</Badge>
                <Badge variant="blue">WebSocket</Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {['winners', 'losers'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-[var(--dls-green)] text-[var(--dls-navy)]'
                  : 'bg-[var(--dls-navy-light)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
              }`}
            >
              {tab === 'winners' ? 'Winners' : 'Losers'}
            </button>
          ))}
        </div>

        {/* Bracket */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="overflow-x-auto"
        >
          <div className="flex gap-4 min-w-[600px]">
            {/* Round Column */}
            <div className="flex-1">
              <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider text-center mb-3">
                Quarts
              </div>
              <div className="space-y-3">
                {BRACKET_DATA.matches.map((match) => (
                  <Card 
                    key={match.id} 
                    className={`p-3 ${match.live ? 'border-[var(--dls-green)]' : ''}`}
                  >
                    {match.live && (
                      <div className="flex items-center justify-end mb-2">
                        <div className="flex items-center gap-1.5">
                          <Circle className="w-2 h-2 text-[var(--dls-green)] fill-current animate-pulse" />
                          <span className="text-[10px] text-[var(--dls-green)] font-medium">LIVE</span>
                        </div>
                      </div>
                    )}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[var(--dls-navy)] flex items-center justify-center text-sm">
                          <match.team1.avatar className="w-3.5 h-3.5" style={{ color: match.team1.winner ? 'var(--dls-green)' : 'var(--text-muted)' }} />
                        </div>
                        <span className={`flex-1 text-sm font-medium ${match.team1.winner ? 'text-[var(--dls-green)]' : 'text-white'}`}>
                          {match.team1.name}
                        </span>
                        <span className={`text-lg font-bold font-['Syne',sans-serif] ${match.team1.winner ? 'text-[var(--dls-green)]' : 'text-white'}`}>
                          {match.team1.score ?? '–'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[var(--dls-navy)] flex items-center justify-center text-sm">
                          <match.team2.avatar className="w-3.5 h-3.5" style={{ color: match.team2.winner ? 'var(--dls-green)' : 'var(--text-muted)' }} />
                        </div>
                        <span className={`flex-1 text-sm font-medium ${match.team2.winner ? 'text-[var(--dls-green)]' : 'text-white'}`}>
                          {match.team2.name}
                        </span>
                        <span className={`text-lg font-bold font-['Syne',sans-serif] ${match.team2.manual ? 'text-[var(--dls-red)]' : match.team2.winner ? 'text-[var(--dls-green)]' : 'text-white'}`}>
                          {match.team2.score ?? '–'}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Connectors */}
            <div className="flex items-center justify-center w-8">
              <div className="w-full h-px bg-[var(--border-subtle)]" />
            </div>

            {/* Demis Column */}
            <div className="flex-1">
              <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider text-center mb-3">
                Demis
              </div>
              <div className="space-y-3 pt-8">
                {BRACKET_DATA.demis.map((match) => (
                  <Card key={match.id} className="p-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[var(--dls-navy)] flex items-center justify-center text-sm opacity-30">
                          <span className="text-[10px]">?</span>
                        </div>
                        <span className={`flex-1 text-sm font-medium ${match.tbd ? 'text-[var(--text-muted)]' : 'text-white'}`}>
                          {match.team1 ?? 'TBD'}
                        </span>
                        <span className="text-lg font-bold text-[var(--text-muted)]">–</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[var(--dls-navy)] flex items-center justify-center text-sm opacity-30">
                          <span className="text-[10px]">?</span>
                        </div>
                        <span className={`flex-1 text-sm font-medium ${match.tbd ? 'text-[var(--text-muted)]' : 'text-white'}`}>
                          {match.team2 ?? 'TBD'}
                        </span>
                        <span className="text-lg font-bold text-[var(--text-muted)]">–</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Finale */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4"
        >
          <Card className="p-4 border-[var(--dls-gold)]/30 bg-[rgba(255,184,0,0.05)]">
            <div className="text-xs font-bold text-[var(--dls-gold)] uppercase tracking-widest text-center mb-3">
              ★ FINALE
            </div>
            <div className="space-y-2 opacity-50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[var(--dls-navy)] flex items-center justify-center text-sm">?</div>
                <span className="flex-1 text-sm text-[var(--text-muted)]">À déterminer</span>
                <span className="text-lg font-bold text-[var(--text-muted)]">–</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[var(--dls-navy)] flex items-center justify-center text-sm">?</div>
                <span className="flex-1 text-sm text-[var(--text-muted)]">À déterminer</span>
                <span className="text-lg font-bold text-[var(--text-muted)]">–</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Legend */}
        <div className="flex gap-4 mt-4 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1">
            <span className="text-[var(--dls-red)]">■</span> Score manuel
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[var(--dls-green)]">■</span> Vainqueur
          </span>
        </div>
      </div>
    </Layout>
  );
}
