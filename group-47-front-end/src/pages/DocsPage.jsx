import { useState } from "react";
import { BookOpen, Copy, Menu, Search, TerminalSquare } from "lucide-react";
import { Link } from "react-router";
import Brand from "../components/Brand";
import { Badge, Button } from "../components/ui";
import { useToast } from "../context/ToastContext";

const sections = ["Getting started", "Authentication", "API keys", "Projects", "Database API", "Storage API", "API usage", "Error responses"];
const snippets = {
  Fetch: `const response = await fetch(
  "https://api.nexusbase.dev/v1/users",
  {
    headers: {
      Authorization: "Bearer YOUR_API_KEY"
    }
  }
);

const users = await response.json();`,
  Axios: `const { data } = await axios.get(
  "https://api.nexusbase.dev/v1/users",
  {
    headers: {
      Authorization: "Bearer YOUR_API_KEY"
    }
  }
);`,
};

export default function DocsPage() {
  const [tab, setTab] = useState("Fetch");
  const [menu, setMenu] = useState(false);
  const { showToast } = useToast();
  const copy = (text) => { navigator.clipboard.writeText(text); showToast("Copied to clipboard."); };
  return <div className="min-h-screen bg-white">
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-line bg-white/95 px-4 backdrop-blur lg:px-6"><Brand /><div className="mx-auto hidden w-full max-w-md md:block"><label className="relative block"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><input className="h-9 w-full rounded-lg border border-line bg-slate-50 pl-9 pr-3 text-sm outline-none focus:border-brand-500" placeholder="Search documentation…" /></label></div><div className="ml-auto flex items-center gap-2"><Link to="/login"><Button variant="ghost">Sign in</Button></Link><Link to="/register"><Button>Get started</Button></Link><button onClick={() => setMenu((v) => !v)} className="p-2 lg:hidden"><Menu className="size-5" /></button></div></header>
    <div className="mx-auto flex max-w-[1440px]">
      <aside className={`${menu ? "block" : "hidden"} fixed inset-y-16 left-0 z-20 w-64 overflow-y-auto border-r border-line bg-white p-5 lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-4rem)]`}><p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted">Documentation</p>{sections.map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className={`block rounded-lg px-3 py-2 text-sm ${item === "Getting started" ? "bg-brand-50 font-semibold text-brand-700" : "text-slate-600 hover:bg-slate-50"}`}>{item}</a>)}</aside>
      <main className="min-w-0 flex-1 px-5 py-12 lg:px-12 xl:px-16"><div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-muted"><BookOpen className="size-4" />Docs <span>/</span> Getting started</div>
        <h1 className="mt-5 text-4xl font-bold tracking-tight">Build with the NexusBase API</h1><p className="mt-5 text-lg leading-8 text-muted">Use a predictable REST API to add authentication, data, and file storage to any client. This guide takes you from your first project to your first request.</p>
        <div className="my-10 border-t border-line" />
        <section id="getting-started"><h2 className="text-2xl font-bold">1. Create a project</h2><p className="mt-3 leading-7 text-slate-600">Projects provide isolated resources, credentials, usage limits, and team access. Create one from the dashboard, then choose the region closest to your users.</p><div className="mt-5 rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-700"><strong>Tip:</strong> Use separate projects for development, staging, and production.</div></section>
        <section className="mt-12" id="authentication"><h2 className="text-2xl font-bold">2. Authenticate your requests</h2><p className="mt-3 leading-7 text-slate-600">Send your project API key in the Authorization header. Keep live keys on a trusted server.</p><div className="mt-5 overflow-hidden rounded-xl border border-slate-700 bg-slate-950"><div className="flex items-center justify-between border-b border-white/10 px-4 py-3"><span className="font-mono text-xs text-slate-400">HTTP header</span><button onClick={() => copy("Authorization: Bearer YOUR_API_KEY")} className="text-slate-400 hover:text-white"><Copy className="size-4" /></button></div><pre className="overflow-x-auto p-5 font-mono text-sm text-slate-200">Authorization: Bearer <span className="text-emerald-400">YOUR_API_KEY</span></pre></div></section>
        <section className="mt-12" id="database-api"><h2 className="text-2xl font-bold">3. Make your first request</h2><p className="mt-3 leading-7 text-slate-600">Retrieve records from the <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm">users</code> collection.</p><div className="mt-5 flex items-center gap-2"><Badge tone="success">GET</Badge><code className="font-mono text-sm">/v1/database/users</code><button onClick={() => copy("/v1/database/users")} className="text-slate-400 hover:text-brand-600"><Copy className="size-4" /></button></div><div className="mt-5 overflow-hidden rounded-xl border border-slate-700 bg-slate-950"><div className="flex items-center justify-between border-b border-white/10 px-4"><div className="flex">{Object.keys(snippets).map((item) => <button key={item} onClick={() => setTab(item)} className={`border-b-2 px-4 py-3 text-xs font-semibold ${tab === item ? "border-brand-500 text-white" : "border-transparent text-slate-500"}`}>{item}</button>)}</div><button onClick={() => copy(snippets[tab])} className="text-slate-400 hover:text-white"><Copy className="size-4" /></button></div><pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-slate-300">{snippets[tab]}</pre></div></section>
        <section className="mt-12" id="error-responses"><h2 className="text-2xl font-bold">Error responses</h2><p className="mt-3 leading-7 text-slate-600">NexusBase uses standard HTTP status codes and consistent JSON error objects.</p><div className="mt-5 overflow-hidden rounded-xl border border-line"><div className="grid grid-cols-[80px_1fr] border-b border-line bg-slate-50 px-4 py-3 text-xs font-semibold text-muted"><span>Code</span><span>Meaning</span></div>{[["400", "Invalid request or validation failed"], ["401", "Missing or invalid credentials"], ["403", "Insufficient project permissions"], ["404", "Resource not found"], ["409", "Resource conflict"], ["500", "Unexpected server error"]].map(([code, meaning]) => <div key={code} className="grid grid-cols-[80px_1fr] border-b border-line px-4 py-3 text-sm last:border-0"><code className="font-mono font-semibold">{code}</code><span className="text-slate-600">{meaning}</span></div>)}</div></section>
        <div className="mt-12 flex items-center gap-3 rounded-xl bg-slate-950 p-6 text-white"><TerminalSquare className="size-6 text-accent-500" /><div><p className="font-semibold">Ready to build?</p><p className="mt-1 text-sm text-slate-400">Create a project and make your first request.</p></div><Link to="/register" className="ml-auto"><Button>Get started</Button></Link></div>
      </div></main>
    </div>
  </div>;
}
