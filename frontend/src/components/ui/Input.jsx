import { clsx } from 'clsx';

export function Input({ 
  label, 
  error, 
  className,
  icon: Icon,
  ...props 
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          className={clsx(
            'w-full bg-[var(--dls-navy)] border border-[var(--border-subtle)] rounded-xl px-4 py-3',
            'text-white placeholder:text-[var(--text-muted)]',
            'focus:outline-none focus:border-[var(--dls-blue)] transition-colors',
            Icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-[var(--dls-red)]">{error}</p>
      )}
    </div>
  );
}
