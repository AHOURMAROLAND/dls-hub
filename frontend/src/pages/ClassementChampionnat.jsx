import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, BarChart3, Shield, Zap, Crown, Flame, Diamond, Swords } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const STANDINGS = [
  { 
    pos: 1, 
    name: 'RolandDLS26', 
    avatar: Shield,
    form: ['V', 'V', 'N', 'V', 'V'],
    pts: 10, 
    diff: '+8',
    rank: 'gold'
  },
  { 
    pos: 2, 
    name: 'AxelFC', 
    avatar: Crown,
    form: ['V', 'V', 'V', 'D', 'V'],
    pts: 9, 
    diff: '+5',
    rank: 'silver'
  },
  { 
    pos: 3, 
    name: 'DiamondStriker', 
    avatar: Diamond,
    form: ['V', 'N', 'V', 'D', 'N'],
    pts: 7, 
    diff: '+2',
    rank: 'bronze'
  },
  { 
    pos: 4, 
    name: 'MasterDribble', 
    avatar: Flame,
    form: ['V', 'D', 'D', 'V', 'D'],
    pts: 6, 
    diff: '-1'
  },
  { 
    pos: 5, 
    name: 'StrikerKofi', 
    avatar: Zap,
    form: ['D', 'V', 'D', 'N', 'D'],
    pts: 4, 
    diff: '-3'
  },
  { 
    pos: 6, 
    name: 'WolfFC', 
    avatar: Swords,
    form: ['D', 'D', 'N', 'D', 'D'],
    pts: 1, 
    diff: '-11'
  }
];

const FormBadge = ({ result }) => {
  const colors = {
    V: 'bg-[rgba(0,214,143,0.2)] text-[var(--dls-green)]',
    D: 'bg-[rgba(255,79,94,0.15)] text-[var(--dls-red)]',
    N: 'bg-[rgba(255,255,255,0.08)] text-[var(--text-muted)]'
  };
  return (
    <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${colors[result]}`}>
      {result}
    </span>
  );
};

export default function ClassementChampionnat() {
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
              <BarChart3 className="w-5 h-5 text-[var(--dls-green)]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Classement</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="green">Championnat</Badge>
                <Badge variant="blue">J4 / J14</Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Standings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-0 overflow-hidden">
            <div className="divide-y divide-[var(--border-subtle)]">
              {STANDINGS.map((team) => (
                <div 
                  key={team.pos} 
                  className="flex items-center gap-3 px-4 py-3"
                >
                  {/* Position */}
                  <div className={`w-5 text-center text-sm font-bold ${
                    team.rank === 'gold' ? 'text-[var(--dls-gold)]' : 
                    team.rank === 'silver' ? 'text-gray-400' : 
                    team.rank === 'bronze' ? 'text-[#CD7F32]' : 
                    'text-[var(--text-muted)]'
                  }`}>
                    {team.pos}
                  </div>

                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-lg bg-[var(--dls-navy)] flex items-center justify-center">
                    <team.avatar className="w-5 h-5 text-[var(--text-muted)]" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white truncate">{team.name}</div>
                    <div className="flex gap-1 mt-1">
                      {team.form.map((r, i) => <FormBadge key={i} result={r} />)}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className={`text-xl font-bold ${team.pos === 1 ? 'text-[var(--dls-green)]' : 'text-white'}`}>
                      {team.pts}
                    </div>
                    <div className={`text-xs ${team.diff.startsWith('+') ? 'text-[var(--dls-green)]' : 'text-[var(--text-muted)]'}`}>
                      {team.diff}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Legend */}
        <div className="flex gap-4 mt-4 text-xs text-[var(--text-muted)]">
          <span><b className="text-white">Pts</b> = points</span>
          <span><b className="text-white">DB</b> = diff. buts</span>
          <span>
            <span className="text-[var(--dls-green)]">V</span>{' '}
            <span className="text-[var(--text-muted)]">N</span>{' '}
            <span className="text-[var(--dls-red)]">D</span> = forme
          </span>
        </div>
      </div>
    </Layout>
  );
}
