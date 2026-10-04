import { ArrowUpRight, ChartNoAxesCombined, Database, FolderKanban, HardDrive, KeyRound, Plus, Terminal } from "lucide-react";
import { Link } from "react-router";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAuth } from "../context/AuthContext";
import { Badge, Button, Card, PageHeader } from "../components/ui";
import { activity, chartData, projects } from "../data/demo";

const stats = [
  ["Total projects", "6", "+2 this month", FolderKanban, "bg-brand-50 text-brand-600"],
  ["API requests", "482.6K", "+12.4%", ChartNoAxesCombined, "bg-teal-50 text-teal-600"],
  ["Active API keys", "14", "Across 6 projects", KeyRound, "bg-amber-50 text-amber-600"],
  ["Storage used", "6.8 GB", "of 10 GB", HardDrive, "bg-sky-50 text-sky-600"],
];

export default function DashboardPage() {
  const { user } = useAuth();
  return <>
    <PageHeader eyebrow="Overview" title={`Good morning, ${user?.firstName || user?.name?.split(" ")[0] || "developer"}.`} description="Here’s what’s happening across your backend infrastructure." actions={<Link to="/projects"><Button><Plus className="size-4" />New project</Button></Link>} />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([label, value, change, Icon, tone]) => <Card key={label} className="p-5"><div className="flex items-center justify-between"><span className={`grid size-10 place-items-center rounded-lg ${tone}`}><Icon className="size-5" /></span><ArrowUpRight className="size-4 text-slate-300" /></div><p className="mt-5 text-2xl font-bold tracking-tight">{value}</p><p className="mt-1 text-xs text-muted"><span className="font-medium text-slate-600">{label}</span> · {change}</p></Card>)}</div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
      <Card className="p-5"><div className="flex items-center justify-between"><div><h2 className="font-bold">Request volume</h2><p className="mt-1 text-xs text-muted">Total requests over the last 7 days</p></div><select className="rounded-lg border border-line bg-white px-3 py-2 text-xs font-medium text-slate-600"><option>Last 7 days</option><option>Last 30 days</option></select></div><div className="mt-5 h-72"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><defs><linearGradient id="dashboardFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6c63ff" stopOpacity={0.22}/><stop offset="95%" stopColor="#6c63ff" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false}/><XAxis dataKey="day" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} /><Tooltip/><Area type="monotone" dataKey="requests" stroke="#6c63ff" strokeWidth={2.5} fill="url(#dashboardFill)" /></AreaChart></ResponsiveContainer></div></Card>
      <Card className="p-5"><h2 className="font-bold">Quick actions</h2><p className="mt-1 text-xs text-muted">Jump back into your workflow</p><div className="mt-5 space-y-2">{[[Plus, "Create a new project", "/projects"], [Database, "Browse database", "/projects/aurora/database"], [KeyRound, "Generate API key", "/projects/aurora/api-keys"], [Terminal, "Read API docs", "/docs"]].map(([Icon, text, to]) => <Link key={text} to={to} className="group flex items-center gap-3 rounded-lg border border-line p-3 hover:border-brand-200 hover:bg-brand-50/40"><span className="grid size-9 place-items-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-white group-hover:text-brand-600"><Icon className="size-4" /></span><span className="text-sm font-semibold">{text}</span><ArrowUpRight className="ml-auto size-4 text-slate-300" /></Link>)}</div></Card>
    </div>
    <div className="mt-5 grid gap-5 xl:grid-cols-2">
      <Card><div className="flex items-center justify-between border-b border-line p-5"><div><h2 className="font-bold">Recent projects</h2><p className="mt-1 text-xs text-muted">Your latest environments</p></div><Link to="/projects" className="text-xs font-semibold text-brand-600">View all</Link></div><div className="divide-y divide-line">{projects.map((project) => <Link to={`/projects/${project.id}`} key={project.id} className="flex items-center gap-3 p-4 hover:bg-slate-50"><span className="grid size-10 place-items-center rounded-lg bg-brand-50 text-sm font-bold text-brand-600">{project.name[0]}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{project.name}</p><p className="mt-0.5 text-xs text-muted">{project.region} · {project.requests} requests</p></div><Badge tone={project.status === "Healthy" ? "success" : "warning"}>{project.status}</Badge></Link>)}</div></Card>
      <Card><div className="border-b border-line p-5"><h2 className="font-bold">Recent API activity</h2><p className="mt-1 text-xs text-muted">Latest requests across projects</p></div><div className="divide-y divide-line">{activity.map((item, index) => <div key={`${item.endpoint}-${index}`} className="flex items-center gap-3 px-5 py-3.5"><span className="w-12 font-mono text-xs font-bold text-brand-600">{item.method}</span><code className="min-w-0 flex-1 truncate font-mono text-xs text-slate-600">{item.endpoint}</code><span className={`font-mono text-xs ${item.status < 300 ? "text-green-600" : "text-red-600"}`}>{item.status}</span><span className="hidden text-xs text-muted sm:block">{item.when}</span></div>)}</div></Card>
    </div>
  </>;
}
