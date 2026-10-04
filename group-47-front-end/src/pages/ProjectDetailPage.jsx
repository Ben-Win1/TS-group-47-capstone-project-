import { Link, useParams } from "react-router";
import { ArrowRight, ChartNoAxesCombined, Database, HardDrive, KeyRound, Settings, Users } from "lucide-react";
import { Badge, Button, Card, PageHeader } from "../components/ui";
import { projects } from "../data/demo";

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId) || projects[0];
  const modules = [
    ["Database", "4 collections · 28.4K records", Database, "database", "bg-brand-50 text-brand-600"],
    ["API keys", "3 active credentials", KeyRound, "api-keys", "bg-amber-50 text-amber-600"],
    ["Storage", "6.8 GB · 1,248 files", HardDrive, "storage", "bg-teal-50 text-teal-600"],
    ["API usage", "284.6K requests this month", ChartNoAxesCombined, "usage", "bg-sky-50 text-sky-600"],
  ];
  return <>
    <PageHeader eyebrow={`${project.region} · ${project.id}`} title={project.name} description={project.description} actions={<><Badge tone="success">Operational</Badge><Link to="settings"><Button variant="secondary"><Settings className="size-4" />Settings</Button></Link></>} />
    <Card className="mb-5 grid gap-px overflow-hidden bg-line sm:grid-cols-2 xl:grid-cols-4">{[["API requests", project.requests], ["Database rows", "28.4K"], ["Storage", "6.8 GB"], ["Average latency", "118 ms"]].map(([label, value]) => <div key={label} className="bg-white p-5"><p className="text-xs font-medium text-muted">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></div>)}</Card>
    <div className="grid gap-4 md:grid-cols-2">{modules.map(([title, text, Icon, to, color]) => <Link key={title} to={to}><Card className="group flex items-center gap-4 p-5 transition hover:border-brand-200 hover:shadow-md"><span className={`grid size-12 place-items-center rounded-xl ${color}`}><Icon className="size-5" /></span><div className="flex-1"><h2 className="font-bold">{title}</h2><p className="mt-1 text-sm text-muted">{text}</p></div><ArrowRight className="size-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand-500" /></Card></Link>)}</div>
    <Card className="mt-5 p-5"><div className="flex items-center justify-between"><div><h2 className="font-bold">Team access</h2><p className="mt-1 text-sm text-muted">People who can access this project</p></div><Button variant="secondary"><Users className="size-4" />Manage team</Button></div><div className="mt-5 flex -space-x-2">{["AD", "MK", "SJ", "47"].map((item, i) => <span key={item} className={`grid size-10 place-items-center rounded-full border-2 border-white text-xs font-bold ${i === 3 ? "bg-brand-500 text-white" : "bg-slate-200 text-slate-600"}`}>{item}</span>)}</div></Card>
  </>;
}
