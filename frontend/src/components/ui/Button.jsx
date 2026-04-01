import { clsx } from 'clsx';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className,
  disabled,
  loading,
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[var(--dls-blue)] hover:bg-[var(--dls-blue-light)] text-white shadow-lg shadow-blue-500/20',
    secondary: 'bg-[rgba(91,29,176,0.2)] hover:bg-[rgba(91,29,176,0.3)] border border-[var(--dls-purple-vivid)] text-white',
    outline: 'bg-transparent border border-[var(--border-subtle)] hover:border-[var(--dls-purple-vivid)] text-white',
    ghost: 'bg-transparent hover:bg-white/5 text-white/70 hover:text-white'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button 
      className={clsx(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      )}
      {children}
    </button>
  );
}
