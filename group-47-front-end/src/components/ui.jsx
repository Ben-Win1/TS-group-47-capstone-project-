import { AlertTriangle, Inbox, LoaderCircle, Search, X } from "lucide-react";

export function Button({ children, variant = "primary", size = "md", className = "", type = "button", ...props }) {
  const variants = {
    primary: "bg-brand-500 text-white shadow-sm hover:bg-brand-700",
    secondary: "border border-line bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-ink",
    danger: "bg-red-50 text-red-700 hover:bg-red-100",
    dark: "bg-ink text-white hover:bg-slate-800",
  };
  const sizes = { sm: "h-9 px-3 text-sm", md: "h-10 px-4 text-sm", lg: "h-12 px-5 text-base" };
  return <button type={type} className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-500/30 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
}

export function Input({ label, error, icon: Icon, className = "", ...props }) {
  return <label className="block">
    {label && <span className="mb-2 block text-sm font-medium text-slate-700">{label}</span>}
    <span className="relative block">
      {Icon && <Icon className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />}
      <input className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 ${Icon ? "pl-10" : ""} ${error ? "border-red-400" : "border-line"} ${className}`} {...props} />
    </span>
    {error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}
  </label>;
}

export function Card({ children, className = "" }) {
  return <div className={`rounded-xl border border-line bg-white shadow-card ${className}`}>{children}</div>;
}

export function Badge({ children, tone = "neutral" }) {
  const tones = {
    neutral: "bg-slate-100 text-slate-600",
    success: "bg-green-50 text-green-700 ring-green-600/10",
    warning: "bg-amber-50 text-amber-700 ring-amber-600/10",
    brand: "bg-brand-50 text-brand-700 ring-brand-600/10",
    error: "bg-red-50 text-red-700 ring-red-600/10",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${tones[tone]}`}>{children}</span>;
}

export function PageHeader({ eyebrow, title, description, actions }) {
  return <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
    <div>
      {eyebrow && <p className="mb-1 text-xs font-bold uppercase tracking-widest text-brand-600">{eyebrow}</p>}
      <h1 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">{title}</h1>
      {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{description}</p>}
    </div>
    {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
  </div>;
}

export function Modal({ open, onClose, title, description, children, footer }) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <Card className="w-full max-w-lg shadow-2xl">
      <div className="flex items-start justify-between border-b border-line p-5">
        <div><h2 className="font-bold text-ink">{title}</h2>{description && <p className="mt-1 text-sm text-muted">{description}</p>}</div>
        <button onClick={onClose} aria-label="Close modal" className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"><X className="size-5" /></button>
      </div>
      <div className="p-5">{children}</div>
      {footer && <div className="flex justify-end gap-2 border-t border-line bg-slate-50/70 p-4">{footer}</div>}
    </Card>
  </div>;
}

export function SearchBar({ value, onChange, placeholder = "Search…" }) {
  return <Input icon={Search} value={value} onChange={onChange} placeholder={placeholder} aria-label={placeholder} />;
}

export function LoadingState({ label = "Loading data…" }) {
  return <div className="grid min-h-52 place-items-center text-center"><div><LoaderCircle className="mx-auto size-7 animate-spin text-brand-500" /><p className="mt-3 text-sm text-muted">{label}</p></div></div>;
}

export function EmptyState({ title = "Nothing here yet", description, action }) {
  return <div className="grid min-h-64 place-items-center p-8 text-center"><div><span className="mx-auto grid size-12 place-items-center rounded-xl bg-slate-100"><Inbox className="size-5 text-slate-500" /></span><h3 className="mt-4 font-semibold">{title}</h3>{description && <p className="mx-auto mt-2 max-w-sm text-sm text-muted">{description}</p>}{action && <div className="mt-5">{action}</div>}</div></div>;
}

export function ErrorState({ message, onRetry }) {
  return <div className="grid min-h-64 place-items-center p-8 text-center"><div><AlertTriangle className="mx-auto size-8 text-amber-500" /><h3 className="mt-3 font-semibold">Something went wrong</h3><p className="mt-2 text-sm text-muted">{message}</p>{onRetry && <Button className="mt-5" variant="secondary" onClick={onRetry}>Try again</Button>}</div></div>;
}
