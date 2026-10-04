import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { Bell, BookOpen, ChartNoAxesCombined, ChevronDown, Database, FolderKanban, HardDrive, KeyRound, LayoutDashboard, LogOut, Menu, Settings, X } from "lucide-react";
import Brand from "../components/Brand";
import { useAuth } from "../context/AuthContext";

const items = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", to: "/projects", icon: FolderKanban },
  { label: "Database", to: "/projects/aurora/database", icon: Database },
  { label: "API Keys", to: "/projects/aurora/api-keys", icon: KeyRound },
  { label: "Storage", to: "/projects/aurora/storage", icon: HardDrive },
  { label: "API Usage", to: "/projects/aurora/usage", icon: ChartNoAxesCombined },
  { label: "Documentation", to: "/docs", icon: BookOpen },
  { label: "Settings", to: "/settings", icon: Settings },
];

export default function AppShell() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const title = items.find((item) => location.pathname.startsWith(item.to))?.label || "Workspace";
  const initials = `${user?.firstName?.[0] || user?.name?.[0] || "A"}${user?.lastName?.[0] || ""}`;
  const signOut = async () => { await logout(); navigate("/"); };

  return <div className="min-h-screen bg-canvas">
    {open && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden" onClick={() => setOpen(false)} />}
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-white transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex h-16 items-center justify-between border-b border-line px-5"><Brand /><button className="text-slate-500 lg:hidden" onClick={() => setOpen(false)}><X className="size-5" /></button></div>
      <div className="border-b border-line p-4"><button className="flex w-full items-center justify-between rounded-lg border border-line bg-slate-50 px-3 py-2.5 text-left hover:border-slate-300"><span><span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Workspace</span><span className="mt-0.5 block text-sm font-semibold text-ink">Group 47</span></span><ChevronDown className="size-4 text-slate-400" /></button></div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        <p className="px-3 pb-2 pt-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">Platform</p>
        {items.map(({ label, to, icon: Icon }) => <NavLink key={label} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50 hover:text-ink"}`}><Icon className="size-[18px]" />{label}</NavLink>)}
      </nav>
      <div className="border-t border-line p-4"><div className="rounded-xl bg-slate-950 p-4 text-white"><p className="text-xs font-semibold">Developer plan</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full w-[68%] rounded-full bg-accent-500" /></div><p className="mt-2 text-[11px] text-slate-400">6.8 GB of 10 GB used</p></div></div>
    </aside>
    <div className="lg:pl-64">
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-white/90 px-4 backdrop-blur md:px-7">
        <div className="flex items-center gap-3"><button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden" onClick={() => setOpen(true)}><Menu className="size-5" /></button><p className="font-semibold text-ink">{title}</p></div>
        <div className="relative flex items-center gap-2">
          <button aria-label="Notifications" className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"><Bell className="size-5" /><span className="absolute right-1.5 top-1.5 size-2 rounded-full border-2 border-white bg-brand-500" /></button>
          <button onClick={() => setProfileOpen((v) => !v)} className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-100"><span className="grid size-8 place-items-center rounded-lg bg-brand-100 text-xs font-bold text-brand-700">{initials}</span><ChevronDown className="hidden size-4 text-slate-400 sm:block" /></button>
          {profileOpen && <div className="absolute right-0 top-12 w-52 rounded-xl border border-line bg-white p-2 shadow-xl"><p className="px-3 py-2 text-xs text-muted">{user?.email || "account@nexusbase.dev"}</p><button onClick={signOut} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"><LogOut className="size-4" />Sign out</button></div>}
        </div>
      </header>
      <main className="mx-auto max-w-[1500px] p-4 md:p-7 lg:p-8"><Outlet /></main>
    </div>
  </div>;
}
