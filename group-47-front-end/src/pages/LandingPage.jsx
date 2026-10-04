import { Link } from "react-router";
import { ArrowRight, Check, Database, Files, Gauge, KeyRound, LockKeyhole, ServerCog, TerminalSquare, Zap } from "lucide-react";
import Brand from "../components/Brand";
import { Button, Card } from "../components/ui";

const features = [
  [Database, "Managed data", "Create collections, validate records, and query your data through a clean REST API."],
  [KeyRound, "Secure API keys", "Issue scoped credentials, rotate secrets, and monitor every key from one place."],
  [Files, "File storage", "Upload, organize, and serve application assets with durable object storage."],
  [Gauge, "Real-time insights", "Understand request volume, latency, failures, database, and storage usage."],
  [LockKeyhole, "Built for security", "JWT authentication, role-based access, and isolated project environments."],
  [ServerCog, "Developer first", "Clear endpoints, predictable responses, and documentation your team can trust."],
];

export default function LandingPage() {
  return <div className="min-h-screen bg-white">
    <nav className="sticky top-0 z-30 border-b border-line/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-17 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Brand />
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex"><a href="#features" className="hover:text-ink">Features</a><a href="#how" className="hover:text-ink">How it works</a><Link to="/docs" className="hover:text-ink">Documentation</Link></div>
        <div className="flex items-center gap-2"><Link to="/login"><Button variant="ghost">Log in</Button></Link><Link to="/register"><Button>Get started <ArrowRight className="size-4" /></Button></Link></div>
      </div>
    </nav>
    <main>
      <section className="relative overflow-hidden border-b border-line">
        <div className="hero-grid absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700"><Zap className="size-3.5" />Built for teams who ship</span>
            <h1 className="mt-7 max-w-3xl text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-ink md:text-6xl">Your backend,<br /><span className="text-brand-500">ready when you are.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">NexusBase gives your team authentication, databases, storage, API keys, and observability—without the infrastructure overhead.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link to="/register"><Button size="lg">Start building free <ArrowRight className="size-4" /></Button></Link><Link to="/docs"><Button size="lg" variant="secondary"><TerminalSquare className="size-4" />View documentation</Button></Link></div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">{["No credit card", "REST API ready", "Production-grade security"].map((item) => <span key={item} className="flex items-center gap-2"><Check className="size-4 text-accent-500" />{item}</span>)}</div>
          </div>
          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-brand-500/10 blur-3xl" />
            <Card className="relative overflow-hidden border-slate-700 bg-slate-950 p-0 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5"><span className="size-2.5 rounded-full bg-red-400" /><span className="size-2.5 rounded-full bg-amber-400" /><span className="size-2.5 rounded-full bg-green-400" /><span className="ml-3 font-mono text-xs text-slate-500">create-user.js</span></div>
              <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-7 text-slate-300"><code><span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> nexus.db<br />  .collection(<span className="text-emerald-400">"users"</span>)<br />  .create({"{"}<br />    name: <span className="text-emerald-400">"Ada Lovelace"</span>,<br />    role: <span className="text-emerald-400">"engineer"</span><br />  {"}"});<br /><br /><span className="text-slate-500">// 201 Created · 82ms</span><br /><span className="text-sky-300">console</span>.log(response.data);</code></pre>
              <div className="grid grid-cols-3 border-t border-white/10 bg-white/[0.03] p-5">{[["99.99%", "Uptime"], ["82ms", "Latency"], ["24/7", "Monitoring"]].map(([value, label]) => <div key={label} className="text-center"><p className="font-mono text-sm font-semibold text-white">{value}</p><p className="mt-1 text-xs text-slate-500">{label}</p></div>)}</div>
            </Card>
          </div>
        </div>
      </section>
      <section id="features" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-widest text-brand-600">Everything you need</p><h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Infrastructure that stays out of your way.</h2><p className="mt-4 text-lg text-muted">A focused toolkit for taking products from the first request to millions of users.</p></div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{features.map(([Icon, title, text]) => <Card key={title} className="p-6 transition hover:-translate-y-1 hover:shadow-lg"><span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600"><Icon className="size-5" /></span><h3 className="mt-5 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{text}</p></Card>)}</div>
      </section>
      <section id="how" className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-12 lg:grid-cols-2 lg:items-center"><div><p className="text-sm font-bold uppercase tracking-widest text-accent-500">From idea to API</p><h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">Create a backend in three clear steps.</h2><p className="mt-4 max-w-lg leading-7 text-slate-400">Create your workspace, model your data, and connect from any client. NexusBase handles the operational layer.</p></div><div className="space-y-3">{[["01", "Create a project", "Choose a region and get an isolated environment."], ["02", "Add your services", "Create collections, storage buckets, and API keys."], ["03", "Connect and ship", "Use documented REST endpoints in your application."]].map(([n, title, text]) => <div key={n} className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-5"><span className="font-mono text-sm text-accent-500">{n}</span><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm text-slate-400">{text}</p></div></div>)}</div></div></div>
      </section>
      <section className="mx-auto max-w-5xl px-5 py-24 text-center"><span className="mx-auto grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600"><LockKeyhole className="size-6" /></span><h2 className="mt-5 text-3xl font-bold tracking-tight">Secure by design. Simple by default.</h2><p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted">Encrypted connections, scoped keys, project isolation, audit-ready activity, and transparent usage—all designed into the platform from day one.</p><Link to="/register"><Button size="lg" className="mt-8">Build your first backend <ArrowRight className="size-4" /></Button></Link></section>
    </main>
    <footer className="border-t border-line bg-canvas"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-8 sm:flex-row lg:px-8"><Brand /><p className="text-sm text-muted">Group 47 Capstone · Developer infrastructure, simplified.</p><div className="flex gap-5 text-sm text-muted"><Link to="/docs">Docs</Link><Link to="/login">Sign in</Link></div></div></footer>
  </div>;
}
