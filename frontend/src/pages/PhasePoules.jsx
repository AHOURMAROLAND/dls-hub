import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Trophy, Circle, Shield, Zap, Crown, Flame } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const GROUPS = ['Groupe A', 'Groupe B', 'Groupe C', 'Groupe D'];

const STANDINGS = [
  { pos: 1, name: 'Roland', avatar: Shield, played: 3, wins: 2, losses: 0, diff: '+5', pts: 7, qualified: true, rank: 'gold' },
  { pos: 2, name: 'Axel', avatar: Crown, played: 3, wins: 2, losses: 1, diff: '+2', pts: 6, qualified: true, rank: 'silver' },
  { pos: 3, name: 'Master', avatar: Flame, played: 3, wins: 1, losses: 2, diff: '-3', pts: 3, qualified: false },
  { pos: 4, name: 'Kofi', avatar: Zap, played: 3, wins: 0, losses: 3, diff: '-4', pts: 0, qualified: false }
];

const RECENT_MATCHES = [
  { id: 1, team1: 'RolandDLS26', avatar1: Shield, score1: 3, team2: 'StrikerKofi', avatar2: Zap, score2: 1, status: 'validé', live: false, time: '14h32' },
  { id: 2, team1: 'AxelFC', avatar1: Crown, score1: 2, team2: 'MasterDribble', avatar2: Flame, score2: 0, status: 'manuel', live: false, time: '11h15', manual: true }
];

export default function PhasePoules() {
  const [activeGroup, setActiveGroup] = useState(0);

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
            <div className="w-10 h-10 rounded-xl bg-[rgba(0,214,143,0.1)] border border-[var(--dls-green)]/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-[var(--dls-green)]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Phase de poules</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="green">● Live</Badge>
                <Badge variant="blue">J3 / J6</Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Group Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto pb-2 mb-4"
        >
          {GROUPS.map((group, i) => (
            <button
              key={group}
              onClick={() => setActiveGroup(i)}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                activeGroup === i
                  ? 'bg-[var(--dls-green)] text-[var(--dls-navy)]'
                  : 'bg-[var(--dls-navy-light)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
              }`}
            >
              {group}
            </button>
          ))}
        </motion.div>

        {/* Standings Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-0 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[1fr_28px_28px_28px_28px_32px] gap-2 px-3 py-2 bg-[rgba(255,255,255,0.04)] text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
              <span>Équipe</span>
              <span className="text-center">J</span>
              <span className="text-center">V</span>
              <span className="text-center">D</span>
              <span className="text-center">DB</span>
              <span className="text-center">Pts</span>
            </div>
            
            {/* Rows */}
            <div className="divide-y divide-[var(--border-subtle)]">
              {STANDINGS.map((team) => (
                <div 
                  key={team.pos} 
                  className={`grid grid-cols-[1fr_28px_28px_28px_28px_32px] gap-2 px-3 py-3 items-center ${team.qualified ? 'bg-[rgba(0,214,143,0.05)]' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold w-4 ${team.rank === 'gold' ? 'text-[var(--dls-gold)]' : team.rank === 'silver' ? 'text-gray-400' : 'text-[var(--text-muted)]'}`}>
                      {team.pos}
                    </span>
                    <div className="w-5 h-5 rounded bg-[var(--dls-navy)] flex items-center justify-center">
                      <team.avatar className="w-3 h-3" style={{ color: team.qualified ? 'var(--dls-green)' : 'var(--text-muted)' }} />
                    </div>
                    <span className={`text-sm font-semibold ${team.qualified ? 'text-[var(--dls-green)]' : 'text-white'}`}>
                      {team.name}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--text-muted)] text-center">{team.played}</span>
                  <span className="text-xs text-[var(--text-muted)] text-center">{team.wins}</span>
                  <span className="text-xs text-[var(--text-muted)] text-center">{team.losses}</span>
                  <span className={`text-xs text-center ${team.diff.startsWith('+') ? 'text-[var(--dls-green)]' : 'text-[var(--dls-red)]'}`}>{team.diff}</span>
                  <span className={`text-sm font-bold text-center ${team.qualified ? 'text-[var(--dls-green)]' : 'text-white'}`}>{team.pts}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-3 text-xs text-[var(--text-muted)]">
          <div className="w-2 h-2 rounded bg-[rgba(0,214,143,0.25)]" />
          <span>Qualifiés pour la phase suivante (top 2)</span>
        </div>

        {/* Recent Matches */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
            Derniers résultats
          </div>
          <div className="space-y-2">
            {RECENT_MATCHES.map((match) => (
              <Card 
                key={match.id} 
                className={`p-3 ${match.manual ? 'border-[var(--dls-red)]/30' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 py-0.5">
                      <div className="w-5 h-5 rounded bg-[var(--dls-navy)] flex items-center justify-center text-xs">
                        <match.avatar1 className="w-3 h-3 text-[var(--text-muted)]" />
                      </div>
                      <span className="flex-1 text-sm font-semibold text-white">{match.team1}</span>
                      <span className={`text-base font-bold ${match.score1 > match.score2 ? 'text-[var(--dls-green)]' : 'text-[var(--text-muted)]'}`}>
                        {match.score1}
                      </span>
                    </div>
                    <div className="flex items-center justify-center py-0.5">
                      <span className="text-[10px] text-[var(--text-muted)]">vs</span>
                    </div>
                    <div className="flex items-center gap-2 py-0.5">
                      <div className="w-5 h-5 rounded bg-[var(--dls-navy)] flex items-center justify-center text-xs">
                        <match.avatar2 className="w-3 h-3 text-[var(--text-muted)]" />
                      </div>
                      <span className="flex-1 text-sm font-semibold text-white">{match.team2}</span>
                      <span className={`text-base font-bold ${match.manual ? 'text-[var(--dls-red)]' : match.score2 > match.score1 ? 'text-[var(--dls-green)]' : 'text-[var(--text-muted)]'}`}>
                        {match.score2}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={match.manual ? 'red' : 'green'} className="text-[10px]">
                      {match.manual ? 'Manuel' : 'Validé'}
                    </Badge>
                    <span className="text-[10px] text-[var(--text-muted)]">{match.time}</span>
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
