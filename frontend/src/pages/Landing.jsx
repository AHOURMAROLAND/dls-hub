import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Zap, Wifi, ArrowRight, Sparkles, Link2 } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';

export default function Landing() {
  return (
    <Layout>
      {/* Hero Section with Gradient Background */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradient - DLS Split Effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #07080F 0%, #1A0A35 35%, #3D0D5C 50%, #5C0A18 65%, #07080F 100%)`
          }}
        />
        
        {/* Animated Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[var(--dls-blue)]/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[var(--dls-crimson)]/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(17,85,204,0.15)] border border-[var(--dls-blue)]/30 mb-6">
              <Sparkles className="w-4 h-4 text-[var(--dls-blue)]" />
              <span className="text-sm font-medium text-[var(--dls-blue)]">Dream League Soccer 26</span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-4">
              Gérez vos tournois
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--dls-blue)] to-[var(--dls-purple-vivid)]">
                comme un pro
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-8 leading-relaxed">
              Brackets, classements, stats automatiques.
              <br />
              Créez ou rejoignez en 30 secondes.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/creer">
                <Button variant="primary" size="lg">
                  <Trophy className="w-5 h-5" />
                  Créer un tournoi
                </Button>
              </Link>
              <Link to="/rejoindre">
                <Button variant="secondary" size="lg">
                  <Link2 className="w-5 h-5" />
                  Rejoindre avec un lien
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Join Link Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-12"
          >
            <Link 
              to="/rejoindre"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[var(--dls-navy-light)] border border-[var(--border-purple)] hover:border-[var(--dls-purple-vivid)] transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-[rgba(17,85,204,0.1)] border border-[var(--dls-blue)]/20 flex items-center justify-center">
                <Link2 className="w-5 h-5 text-[var(--dls-blue)]" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-white">Tu as un lien d'invitation ?</div>
                <div className="text-xs text-[var(--text-muted)]">Colle le code ou ouvre directement depuis le lien.</div>
              </div>
              <ArrowRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--dls-blue)] transition-colors" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 border-t border-[var(--border-subtle)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-2">Pourquoi DLS Hub ?</h2>
            <p className="text-[var(--text-muted)]">Tout ce qu'il faut pour gérer tes tournois DLS 26</p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { 
                icon: Trophy, 
                title: 'Tournois sur mesure', 
                desc: 'Élimination, poules ou championnat — choisis ton format.',
                color: 'var(--dls-gold)'
              },
              { 
                icon: Zap, 
                title: 'Scores automatiques', 
                desc: 'Récupération via le tracker FTGames. Fini les disputes !',
                color: 'var(--dls-blue)'
              },
              { 
                icon: Wifi, 
                title: 'Mises à jour live', 
                desc: 'Bracket et classements en temps réel via WebSocket.',
                color: 'var(--dls-green)'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl bg-[var(--dls-navy-light)] border border-[var(--border-purple)] p-6 hover:border-[var(--dls-purple-vivid)] transition-colors"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}30` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
