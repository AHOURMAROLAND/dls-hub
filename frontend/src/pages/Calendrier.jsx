import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Calendar, Circle, Shield, Zap, Crown, Flame, Diamond, Swords } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const MATCHES = [
  {
    id: 1,
    day: 'Aujourd\'hui',
    matches: [
      {
        id: 101,
        team1: { name: 'RolandDLS26', avatar: Shield, score: 3 },
        team2: { name: 'StrikerKofi', avatar: Zap, score: 1 },
        status: 'live',
        time: '14h32',
        round: 'QDF 1'
      },
      {
        id: 102,
        team1: { name: 'DiamondStriker', avatar: Diamond, score: null },
        team2: { name: 'WolfFC', avatar: Swords, score: null },
        status: 'upcoming',
        time: null,
        round: 'QDF 3'
      }
    ]
  },
  {
    id: 2,
    day: 'Hier',
    matches: [
      {
        id: 201,
        team1: { name: 'AxelFC', avatar: Crown, score: 2 },
        team2: { name: 'MasterDribble', avatar: Flame, score: 0 },
        status: 'completed',
        time: '11h15',
        round: null
      },
      {
        id: 202,
        team1: { name: 'FoxStriker', avatar: Flame, score: 4 },
        team2: { name: 'DragonGK', avatar: Shield, score: 1 },
        status: 'manual',
        time: '09h00',
        round: null
      }
    ]
  }
];

export default function Calendrier() {
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
              <Calendar className="w-5 h-5 text-[var(--dls-green)]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Calendrier</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="green">● 1 live</Badge>
                <Badge variant="blue">6 matchs</Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Match List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {MATCHES.map((day) => (
            <div key={day.id}>
              <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                {day.day}
              </div>
              <div className="space-y-2">
                {day.matches.map((match) => (
                  <Card 
                    key={match.id} 
                    className={`p-3 ${match.status === 'live' ? 'border-[var(--dls-green)]/30 bg-[rgba(0,214,143,0.04)]' : match.status === 'manual' ? 'border-[var(--dls-red)]/30' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        {/* Team 1 */}
                        <div className="flex items-center gap-2 py-0.5">
                          <div className="w-5 h-5 rounded bg-[var(--dls-navy)] flex items-center justify-center">
                            <match.team1.avatar className="w-3 h-3 text-[var(--text-muted)]" />
                          </div>
                          <span className="flex-1 text-sm font-semibold text-white">{match.team1.name}</span>
                          <span className={`text-base font-bold ${
                            match.status === 'live' && match.team1.score > match.team2.score ? 'text-[var(--dls-green)]' : 
                            match.status === 'upcoming' ? 'text-[var(--text-muted)]' :
                            match.status === 'manual' && match.team1.score > match.team2.score ? 'text-[var(--dls-green)]' :
                            'text-[var(--text-muted)]'
                          }`}>
                            {match.team1.score ?? '–'}
                          </span>
                        </div>
                        
                        {/* VS */}
                        <div className="flex items-center justify-center py-0.5">
                          {match.status === 'live' ? (
                            <span className="text-[10px] text-[var(--dls-green)] flex items-center gap-1">
                              <Circle className="w-2 h-2 fill-current animate-pulse" />
                              en cours
                            </span>
                          ) : match.status === 'upcoming' ? (
                            <span className="text-[10px] text-[var(--text-muted)]">à jouer</span>
                          ) : match.status === 'manual' ? (
                            <span className="text-[10px] text-[var(--dls-red)]">score manuel</span>
                          ) : (
                            <span className="text-[10px] text-[var(--text-muted)]">résultat final</span>
                          )}
                        </div>
                        
                        {/* Team 2 */}
                        <div className="flex items-center gap-2 py-0.5">
                          <div className="w-5 h-5 rounded bg-[var(--dls-navy)] flex items-center justify-center">
                            <match.team2.avatar className="w-3 h-3 text-[var(--text-muted)]" />
                          </div>
                          <span className="flex-1 text-sm font-semibold text-white">{match.team2.name}</span>
                          <span className={`text-base font-bold ${
                            match.status === 'live' && match.team2.score > match.team1.score ? 'text-[var(--dls-green)]' :
                            match.status === 'upcoming' ? 'text-[var(--text-muted)]' :
                            match.status === 'manual' ? 'text-[var(--dls-red)]' :
                            'text-[var(--text-muted)]'
                          }`}>
                            {match.team2.score ?? '–'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Badge */}
                      <div className="flex flex-col items-end gap-1">
                        {match.status === 'live' ? (
                          <Badge variant="green" className="text-[10px]">Live</Badge>
                        ) : match.status === 'completed' ? (
                          <Badge variant="green" className="text-[10px]">Validé</Badge>
                        ) : match.status === 'manual' ? (
                          <Badge variant="red" className="text-[10px]">Manuel</Badge>
                        ) : (
                          <Badge variant="blue" className="text-[10px]">{match.round}</Badge>
                        )}
                        {match.time && (
                          <span className="text-[10px] text-[var(--text-muted)]">{match.time}</span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-4 text-xs text-[var(--text-muted)]">
          <span className="text-[var(--dls-red)] font-bold">■</span>
          <span>Score modifié manuellement</span>
        </div>
      </div>
    </Layout>
  );
}
