import { Link } from 'react-router-dom';
import { Trophy, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  return (
    <nav className="sticky top-0 z-50 bg-[var(--dls-navy)]/95 backdrop-blur-md border-b border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--dls-blue)] to-[var(--dls-purple-vivid)] flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg">DLS<span className="text-[var(--dls-blue)]">Hub</span></span>
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">Accueil</Link>
            <Link to="/creer" className="text-sm text-white/70 hover:text-white transition-colors">Créer</Link>
            <Link to="/historique" className="text-sm text-white/70 hover:text-white transition-colors">Mes tournois</Link>
            <Button size="sm" onClick={() => window.location.href = '/creer'}>
              <Trophy className="w-3 h-3" />
              Nouveau
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--dls-navy-light)]">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" className="block py-2 text-sm text-white/70 hover:text-white">Accueil</Link>
            <Link to="/creer" className="block py-2 text-sm text-white/70 hover:text-white">Créer un tournoi</Link>
            <Link to="/historique" className="block py-2 text-sm text-white/70 hover:text-white">Mes tournois</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--dls-navy)]">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </div>
      </main>
      <footer className="border-t border-[var(--border-subtle)] py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <span>© 2026 DLS Hub — Gestion de tournois DLS 26</span>
          <span className="flex items-center gap-1">
            Propulsé par
            <span className="text-[var(--dls-blue)] font-medium">FTGames Tracker</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
