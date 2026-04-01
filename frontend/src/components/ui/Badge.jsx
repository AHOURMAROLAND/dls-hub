import { clsx } from 'clsx';

export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-[rgba(91,29,176,0.15)] text-[var(--dls-purple-vivid)] border-[var(--dls-purple-vivid)]',
    blue: 'bg-[rgba(17,85,204,0.15)] text-[var(--dls-blue)] border-[var(--dls-blue)]',
    green: 'bg-[rgba(26,110,62,0.15)] text-[var(--dls-green)] border-[var(--dls-green)]',
    gold: 'bg-[rgba(255,184,0,0.15)] text-[var(--dls-gold)] border-[var(--dls-gold)]',
    red: 'bg-[rgba(168,11,28,0.15)] text-[var(--dls-red)] border-[var(--dls-red)]'
  };
  
  return (
    <span className={clsx(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
