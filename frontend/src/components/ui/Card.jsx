import { clsx } from 'clsx';

export function Card({ children, className, hover = true, onClick }) {
  return (
    <div 
      className={clsx(
        'rounded-xl bg-[var(--dls-navy-light)] border border-[var(--border-purple)] overflow-hidden',
        hover && 'transition-all duration-200 hover:border-[var(--dls-purple-vivid)]',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
