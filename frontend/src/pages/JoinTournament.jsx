import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link2, ArrowRight, Trophy, Users, Clock, CheckCircle2 } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const RECENT_TOURNAMENTS = [
  {
    id: 1,
    name: 'Ligue des Champions IAI',
    players: 8,
    type: 'Élimination simple',
    status: 'En cours',
    statusColor: 'green',
    icon: Trophy
  },
  {
    id: 2,
    name: 'Weekend Warriors Cup',
    players: 16,
    type: 'Poules + élim.',
    status: 'Inscriptions',
    statusColor: 'gold',
    icon: Users
  }
];

export default function JoinTournament() {
  const navigate = useNavigate();
  const [slug, setSlug] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [checking, setChecking] = useState(false);

  const checkSlug = (value) => {
    setSlug(value.toUpperCase());
    if (value.length === 8) {
      setChecking(true);
      setTimeout(() => {
        setIsValid(true);
        setChecking(false);
      }, 500);
    } else {
      setIsValid(null);
    }
  };

  const handleJoin = () => {
    if (isValid) {
      navigate(`/inscription/${slug}`);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--dls-blue)] to-[var(--dls-purple-vivid)] flex items-center justify-center mx-auto mb-4">
            <Link2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Rejoindre un tournoi</h1>
          <p className="text-sm text-[var(--text-muted)]">
            Entre le code à 8 caractères reçu par le créateur du tournoi.
          </p>
        </motion.div>

        {/* Slug Input */}
        <Card className="p-6 mb-6">
          <div className="relative">
            <input
              type="text"
              value={slug}
              onChange={(e) => checkSlug(e.target.value)}
              placeholder="K7F2XQ9A"
              maxLength={8}
              className="w-full bg-[var(--dls-navy)] border-2 border-[var(--border-subtle)] rounded-xl px-4 py-4 text-center text-2xl font-bold text-white tracking-widest uppercase placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--dls-blue)] transition-all"
            />
            {checking && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 border-2 border-[var(--dls-blue)] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {isValid && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <CheckCircle2 className="w-6 h-6 text-[var(--dls-green)]" />
              </div>
            )}
          </div>
          
          <div className="mt-3 text-center">
            {isValid ? (
              <span className="text-sm text-[var(--dls-green)] flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Code valide · Tournoi trouvé
              </span>
            ) : slug.length > 0 && slug.length < 8 ? (
              <span className="text-sm text-[var(--text-muted)]">
                {8 - slug.length} caractères restants
              </span>
            ) : null}
          </div>

          <Button 
            variant="primary" 
            className="w-full mt-4" 
            disabled={!isValid}
            onClick={handleJoin}
          >
            Rejoindre ce tournoi
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Card>

        {/* Recent Tournaments */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
            <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
              Tournois récents
            </span>
            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
          </div>

          {RECENT_TOURNAMENTS.map((tournament) => (
            <Link key={tournament.id} to={`/inscription/${tournament.id}`}>
              <Card className="p-4 group" hover>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ 
                      background: tournament.statusColor === 'green' ? 'rgba(26,110,62,0.1)' : 'rgba(255,184,0,0.1)',
                      border: `1px solid ${tournament.statusColor === 'green' ? 'rgba(26,110,62,0.2)' : 'rgba(255,184,0,0.2)'}`
                    }}
                  >
                    <tournament.icon 
                      className="w-6 h-6" 
                      style={{ color: tournament.statusColor === 'green' ? 'var(--dls-green)' : 'var(--dls-gold)' }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white truncate">{tournament.name}</h3>
                    <p className="text-xs text-[var(--text-muted)]">
                      {tournament.players} joueurs · {tournament.type}
                    </p>
                  </div>
                  <Badge variant={tournament.statusColor === 'green' ? 'green' : 'gold'}>
                    {tournament.status}
                  </Badge>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
