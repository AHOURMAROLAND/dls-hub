import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Settings, Trophy, Edit3, Image, Users, 
  Clock, Link2, Share2, Trash2, ChevronRight 
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const PARAM_SECTIONS = [
  {
    title: 'Informations',
    items: [
      { 
        id: 'name', 
        icon: Edit3, 
        name: 'Nom du tournoi', 
        detail: 'Ligue des Champions IAI',
        color: 'var(--dls-green)'
      },
      { 
        id: 'logo', 
        icon: Image, 
        name: 'Logo du tournoi', 
        detail: 'Modifier l\'image',
        color: 'var(--dls-blue)'
      },
      { 
        id: 'teams', 
        icon: Users, 
        name: 'Nombre d\'équipes', 
        detail: '8 · non modifiable',
        color: 'var(--dls-gold)',
        locked: true
      }
    ]
  },
  {
    title: 'Règles',
    items: [
      { 
        id: 'double', 
        icon: Clock, 
        name: 'Double élimination', 
        detail: 'Prolongations si nul (match 2)',
        color: 'var(--dls-green)',
        toggle: true,
        active: false
      },
      { 
        id: 'link', 
        icon: Link2, 
        name: 'Lien d\'invitation', 
        detail: 'Actif · K7F2XQ9A',
        color: 'var(--dls-blue)',
        toggle: true,
        active: true
      }
    ]
  },
  {
    title: 'Lien & partage',
    items: [
      { 
        id: 'share', 
        icon: Share2, 
        name: 'Partager le bracket', 
        detail: 'Vue publique en lecture seule',
        color: 'var(--dls-blue)'
      }
    ]
  }
];

export default function ParametresTournament() {
  const [toggles, setToggles] = useState({ double: false, link: true });

  const toggleSetting = (id) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
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
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-[rgba(91,29,176,0.1)] border border-[var(--dls-purple-vivid)]/20 flex items-center justify-center">
              <Settings className="w-5 h-5 text-[var(--dls-purple-vivid)]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Paramètres</h1>
              <p className="text-xs text-[var(--text-muted)]">Ligue des Champions IAI</p>
            </div>
          </div>
        </motion.div>

        {/* Param Sections */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {PARAM_SECTIONS.map((section, si) => (
            <div key={section.title}>
              <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
                {section.title}
              </div>
              <Card className="p-0 overflow-hidden">
                <div className="divide-y divide-[var(--border-subtle)]">
                  {section.items.map((item, ii) => (
                    <div 
                      key={item.id}
                      className="flex items-center gap-3 p-4 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ 
                          background: `${item.color}15`,
                          border: `1px solid ${item.color}30`
                        }}
                      >
                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">{item.name}</div>
                        <div className="text-xs text-[var(--text-muted)]">{item.detail}</div>
                      </div>
                      {item.locked ? (
                        <Badge variant="red" className="text-[10px]">Verrouillé</Badge>
                      ) : item.toggle ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSetting(item.id);
                          }}
                          className={`w-11 h-6 rounded-full transition-colors relative ${
                            toggles[item.id] ? 'bg-[var(--dls-blue)]' : 'bg-[var(--dls-navy-light)]'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${
                            toggles[item.id] ? 'left-[22px]' : 'left-0.5'
                          }`} />
                        </button>
                      ) : (
                        <ChevronRight className="w-5 h-5 text-[var(--text-muted)]" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <div className="text-xs font-medium text-[var(--dls-red)] uppercase tracking-wider mb-3">
            Zone dangereuse
          </div>
          <Card className="p-4 border-[var(--dls-red)]/30">
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--dls-red)]/10 hover:bg-[var(--dls-red)]/20 text-[var(--dls-red)] font-medium transition-colors">
              <Trash2 className="w-4 h-4" />
              Annuler et supprimer le tournoi
            </button>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
}
