import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Dices, Shield, Zap, Crown, Flame, RefreshCw, Check } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const DRAW_GROUPS = [
  {
    id: 1,
    title: 'Quart de finale 1',
    slots: [
      { 
        num: 1, 
        player: 'RolandDLS26', 
        team: 'FC Lomé Eagles',
        division: 'Élite Div. I · Tête de série',
        icon: Shield,
        color: 'var(--dls-gold)',
        top: true
      },
      { 
        num: 2, 
        player: 'StrikerKofi', 
        team: 'Thunder Accra',
        division: 'Division II',
        icon: Zap,
        color: 'var(--dls-purple-vivid)',
        top: false
      }
    ]
  },
  {
    id: 2,
    title: 'Quart de finale 2',
    slots: [
      { 
        num: 1, 
        player: 'AxelFC', 
        team: 'Lions Cotonou',
        division: 'Élite Div. I · Tête de série',
        icon: Crown,
        color: 'var(--dls-green)',
        top: true
      },
      { 
        num: 2, 
        player: 'MasterDribble', 
        team: 'Inferno FC',
        division: 'Division II',
        icon: Flame,
        color: 'var(--dls-blue)',
        top: false
      }
    ]
  }
];

export default function TirageSort() {
  const [regenerating, setRegenerating] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleRegenerate = () => {
    setRegenerating(true);
    setTimeout(() => setRegenerating(false), 1000);
  };

  const handleValidate = () => {
    setValidated(true);
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
          className="mb-4"
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-[rgba(91,29,176,0.1)] border border-[var(--dls-purple-vivid)]/20 flex items-center justify-center">
              <Dices className="w-5 h-5 text-[var(--dls-purple-vivid)]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Tirage au sort</h1>
              <p className="text-xs text-[var(--text-muted)]">8 joueurs · Élimination simple</p>
            </div>
          </div>
        </motion.div>

        {/* Algo Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[rgba(17,85,204,0.1)] border border-[var(--dls-blue)]/20 mb-4">
            <div className="w-6 h-6 rounded bg-[var(--dls-blue)]/20 flex items-center justify-center">
              <span className="text-xs">⚖</span>
            </div>
            <span className="text-xs text-[var(--text-secondary)]">
              Algorithme <span className="text-[var(--dls-blue)] font-medium">balanced_draw</span> · Trié par division DLL
            </span>
          </div>
        </motion.div>

        {/* Draw Groups */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-6"
        >
          {DRAW_GROUPS.map((group, gi) => (
            <Card key={group.id} className="p-4">
              <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
                {group.title}
              </div>
              <div className="space-y-2">
                {group.slots.map((slot, si) => (
                  <div 
                    key={si}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--dls-navy)] border border-[var(--border-subtle)]"
                  >
                    <div className="w-6 h-6 rounded-full bg-[var(--dls-navy-light)] flex items-center justify-center text-xs font-bold text-[var(--text-muted)]">
                      {slot.num}
                    </div>
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ 
                        background: `${slot.color}15`,
                        border: `1px solid ${slot.color}30`
                      }}
                    >
                      <slot.icon className="w-5 h-5" style={{ color: slot.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white">{slot.player}</div>
                      <div className="text-xs text-[var(--text-muted)]">{slot.division}</div>
                    </div>
                    {slot.top && (
                      <Badge variant="gold" className="text-[10px]">★ Top</Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3"
        >
          <Button 
            variant="secondary" 
            className="flex-1"
            onClick={handleRegenerate}
            disabled={regenerating}
          >
            <RefreshCw className={`w-4 h-4 ${regenerating ? 'animate-spin' : ''}`} />
            Régénérer
          </Button>
          <Button 
            variant="primary" 
            className="flex-1"
            onClick={handleValidate}
            disabled={validated}
          >
            <Check className="w-4 h-4" />
            {validated ? 'Validé!' : 'Valider le tirage'}
          </Button>
        </motion.div>

        <p className="text-xs text-[var(--text-muted)] text-center mt-3">
          Seule la validation lance le tournoi
        </p>
      </div>
    </Layout>
  );
}
