import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, ArrowLeft, Upload, Swords, Users, BarChart3, Check, ChevronDown } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { tournamentAPI } from '../lib/api';
import toast from 'react-hot-toast';

const TOURNAMENT_TYPES = [
  { 
    value: 'elimination', 
    icon: Swords, 
    title: 'Élimination', 
    desc: 'Le perdant est éliminé',
    color: 'var(--dls-red)'
  },
  { 
    value: 'groups', 
    icon: Users, 
    title: 'Poules', 
    desc: 'Groupes puis élimination',
    color: 'var(--dls-blue)'
  },
  { 
    value: 'championship', 
    icon: BarChart3, 
    title: 'Championnat', 
    desc: 'Tous contre tous',
    color: 'var(--dls-gold)'
  }
];

export default function CreateTournament() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    tournament_type: '',
    elimination_type: 'single',
    max_teams: 8,
    logo: null
  });

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const canNext = () => {
    if (step === 1) return form.name.trim().length >= 3;
    if (step === 2) return !!form.tournament_type;
    return true;
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('tournament_type', form.tournament_type);
      formData.append('elimination_type', form.elimination_type);
      formData.append('max_teams', form.max_teams.toString());
      formData.append('championship_legs', 'single');
      formData.append('group_count', form.tournament_type === 'groups' ? '4' : '0');
      formData.append('qualified_per_group', '2');
      if (form.logo) {
        formData.append('logo', form.logo);
      }
      
      const response = await tournamentAPI.create(formData);
      toast.success('Tournoi créé avec succès !');
      
      // Store creator session in localStorage for dashboard access
      localStorage.setItem(`tournament_${response.slug}_creator`, response.creator_session);
      
      navigate(`/tournoi/${response.slug}`);
    } catch (error) {
      toast.error(error.message || 'Erreur lors de la création du tournoi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto py-8">
        {/* Header */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Retour</span>
        </button>

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--dls-blue)] to-[var(--dls-purple-vivid)] flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Nouveau tournoi</h1>
          <p className="text-sm text-[var(--text-muted)]">En quelques étapes simples</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step >= s 
                  ? 'bg-[var(--dls-blue)] text-white' 
                  : 'bg-[var(--dls-navy-light)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
              }`}>
                {s}
              </div>
              {s < 3 && (
                <div className={`w-8 h-0.5 rounded ${step > s ? 'bg-[var(--dls-blue)]' : 'bg-[var(--border-subtle)]'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          {step === 1 && (
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-[rgba(17,85,204,0.1)] border border-[var(--dls-blue)]/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-[var(--dls-blue)]" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Informations générales</h2>
                  <p className="text-xs text-[var(--text-muted)]">Nommez votre tournoi</p>
                </div>
              </div>
              
              <Input
                label="Nom du tournoi"
                placeholder="Ex: Ligue des Champions IAI"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
              />
              
              {/* Logo Upload */}
              <div className="mt-4">
                <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                  Logo (optionnel)
                </label>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--dls-navy)] border border-dashed border-[var(--border-subtle)] hover:border-[var(--dls-purple-vivid)] transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-lg bg-[var(--dls-navy-light)] flex items-center justify-center">
                    <Upload className="w-5 h-5 text-[var(--text-muted)]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Ajouter un logo</div>
                    <div className="text-xs text-[var(--text-muted)]">JPG, PNG — max 5MB</div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card className="p-6">
              <h2 className="text-sm font-bold text-white mb-1">Type de tournoi</h2>
              <p className="text-xs text-[var(--text-muted)] mb-4">Choisissez le format</p>
              
              <div className="space-y-3">
                {TOURNAMENT_TYPES.map((type) => {
                  const selected = form.tournament_type === type.value;
                  return (
                    <div
                      key={type.value}
                      onClick={() => update('tournament_type', type.value)}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                        selected
                          ? 'bg-[rgba(17,85,204,0.1)] border-[var(--dls-blue)]'
                          : 'bg-[var(--dls-navy)] border-[var(--border-subtle)] hover:border-[var(--dls-purple-vivid)]'
                      }`}
                    >
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                        style={{ 
                          background: `${type.color}15`, 
                          border: `1px solid ${type.color}30` 
                        }}
                      >
                        <type.icon className="w-6 h-6" style={{ color: type.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-white">{type.title}</h3>
                        <p className="text-xs text-[var(--text-muted)]">{type.desc}</p>
                      </div>
                      {selected && (
                        <div className="w-6 h-6 rounded-full bg-[var(--dls-blue)] flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Card className="p-6 space-y-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(17,85,204,0.1)] border border-[var(--dls-blue)]/20 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-[var(--dls-blue)]" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Configuration</h2>
                    <p className="text-xs text-[var(--text-muted)]">Paramètres détaillés</p>
                  </div>
                </div>

                {/* Teams Count */}
                <div>
                  <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    Nombre d'équipes
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[4, 8, 16, 32].map((n) => (
                      <button
                        key={n}
                        onClick={() => update('max_teams', n)}
                        className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                          form.max_teams === n
                            ? 'bg-[var(--dls-blue)] border-[var(--dls-blue)] text-white'
                            : 'bg-[var(--dls-navy)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--dls-purple-vivid)]'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {form.tournament_type === 'elimination' && (
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
                      Type d'élimination
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['single', 'double'].map((t) => (
                        <button
                          key={t}
                          onClick={() => update('elimination_type', t)}
                          className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all ${
                            form.elimination_type === t
                              ? 'bg-[rgba(17,85,204,0.15)] border-[var(--dls-blue)] text-[var(--dls-blue)]'
                              : 'bg-[var(--dls-navy)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--dls-purple-vivid)]'
                          }`}
                        >
                          {t === 'single' ? 'Simple' : 'Double'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </Card>

              {/* Summary */}
              <div className="rounded-xl bg-[rgba(17,85,204,0.05)] border border-[var(--dls-blue)]/20 p-5">
                <h3 className="text-sm font-semibold text-white mb-3">Résumé</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Nom</span>
                    <span className="text-white font-medium">{form.name || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Type</span>
                    <span className="text-white font-medium capitalize">{form.tournament_type || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Équipes</span>
                    <span className="text-white font-medium">{form.max_teams}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          {step > 1 ? (
            <Button variant="ghost" onClick={() => setStep(s => s - 1)}>
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
          ) : <div />}
          
          {step < 3 ? (
            <Button variant="primary" disabled={!canNext()} onClick={() => setStep(s => s + 1)}>
              Suivant
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </Button>
          ) : (
            <Button variant="primary" size="lg" loading={loading} onClick={handleCreate}>
              <Trophy className="w-5 h-5" />
              Créer le tournoi
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
}
