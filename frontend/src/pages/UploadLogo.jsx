import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Shield, Check, FileImage, Cloud } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const EMOJI_OPTIONS = [
  { id: 'eagle', icon: Shield, label: 'Aigle' },
  { id: 'lion', icon: Shield, label: 'Lion' },
  { id: 'dragon', icon: Shield, label: 'Dragon' },
  { id: 'bolt', icon: Shield, label: 'Foudre' },
  { id: 'fire', icon: Shield, label: 'Feu' },
  { id: 'diamond', icon: Shield, label: 'Diamant' }
];

export default function UploadLogo() {
  const navigate = useNavigate();
  const [selectedEmoji, setSelectedEmoji] = useState('eagle');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = () => {
    setUploading(true);
    setTimeout(() => {
      setUploadedFile({ name: 'eagles_logo.png', size: '1.2 MB' });
      setUploading(false);
    }, 1000);
  };

  const handleSubmit = () => {
    navigate('/attente');
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto py-6">
        {/* Back */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Retour</span>
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold text-white mb-1">Logo de ton équipe</h1>
          <p className="text-sm text-[var(--text-muted)]">Personnalise ton apparence dans le tournoi</p>
        </motion.div>

        {/* Upload Hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card 
            className="p-8 mb-4 cursor-pointer"
            onClick={handleFileSelect}
          >
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--dls-blue)] to-[var(--dls-purple-vivid)] flex items-center justify-center mx-auto mb-4">
                {uploadedFile ? (
                  <FileImage className="w-10 h-10 text-white" />
                ) : (
                  <Shield className="w-10 h-10 text-white" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {uploading ? 'Upload en cours...' : uploadedFile ? uploadedFile.name : 'Appuie pour uploader'}
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                JPG, PNG, WEBP — Max 5MB
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Emoji Options */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-3">
            Ou choisis un icône
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji.id}
                onClick={() => setSelectedEmoji(emoji.id)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all min-w-[70px] ${
                  selectedEmoji === emoji.id
                    ? 'bg-[rgba(17,85,204,0.15)] border-[var(--dls-blue)]'
                    : 'bg-[var(--dls-navy)] border-[var(--border-subtle)] hover:border-[var(--dls-purple-vivid)]'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedEmoji === emoji.id 
                    ? 'bg-[var(--dls-blue)]' 
                    : 'bg-[var(--dls-navy-light)]'
                }`}>
                  <emoji.icon className={`w-5 h-5 ${
                    selectedEmoji === emoji.id ? 'text-white' : 'text-[var(--text-muted)]'
                  }`} />
                </div>
                <span className="text-[10px] text-[var(--text-muted)]">{emoji.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Upload Info */}
        {uploadedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4"
          >
            <Card className="p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-muted)]">Fichier</span>
                <span className="text-[var(--dls-green)] flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  {uploadedFile.name}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-muted)]">Taille</span>
                <span className="text-white">{uploadedFile.size}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-muted)]">Stockage</span>
                <span className="text-white flex items-center gap-1">
                  <Cloud className="w-3 h-3" />
                  Cloudinary CDN
                </span>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Confirmation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--dls-blue)] to-[var(--dls-purple-vivid)] flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">FC Lomé Eagles</div>
                <div className="text-xs text-[var(--text-muted)]">
                  Logo prêt · idx: k5dfr5xx
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-[var(--dls-green)]/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-[var(--dls-green)]" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Submit Button */}
        <Button variant="primary" className="w-full" onClick={handleSubmit}>
          Envoyer ma demande
          <ArrowLeft className="w-4 h-4 rotate-180" />
        </Button>
      </div>
    </Layout>
  );
}
