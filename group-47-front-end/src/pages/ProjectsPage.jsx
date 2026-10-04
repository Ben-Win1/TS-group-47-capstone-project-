import { useMemo, useState } from "react";
import { ArrowRight, MoreHorizontal, Plus, Server, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { Badge, Button, Card, Input, Modal, PageHeader, SearchBar } from "../components/ui";
import { projects as seedProjects } from "../data/demo";
import { useToast } from "../context/ToastContext";

export default function ProjectsPage() {
  const [projects, setProjects] = useState(seedProjects);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", region: "US East" });
  const { showToast } = useToast();
  const filtered = useMemo(() => projects.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())), [projects, search]);
  const create = () => {
    if (!form.name.trim()) return;
    setProjects((old) => [{ id: form.name.toLowerCase().replace(/\s+/g, "-"), ...form, status: "Provisioning", created: "Just now", requests: "0" }, ...old]);
    setOpen(false); setForm({ name: "", description: "", region: "US East" }); showToast("Project created successfully.");
  };
  const remove = (id) => { setProjects((old) => old.filter((p) => p.id !== id)); showToast("Project removed."); };

  return <>
    <PageHeader eyebrow="Workspace" title="Projects" description="Create and manage isolated environments for your applications." actions={<Button onClick={() => setOpen(true)}><Plus className="size-4" />New project</Button>} />
    <div className="mb-5 max-w-md"><SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects…" /></div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((project) => <Card key={project.id} className="group p-5 transition hover:-translate-y-0.5 hover:shadow-lg"><div className="flex items-start justify-between"><span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600"><Server className="size-5" /></span><div className="flex gap-1"><button onClick={() => remove(project.id)} aria-label={`Delete ${project.name}`} className="rounded-lg p-2 text-slate-300 opacity-0 hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"><Trash2 className="size-4" /></button><button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><MoreHorizontal className="size-4" /></button></div></div><div className="mt-5 flex items-center gap-2"><h2 className="font-bold">{project.name}</h2><Badge tone={project.status === "Healthy" ? "success" : "warning"}>{project.status}</Badge></div><p className="mt-2 min-h-10 text-sm leading-5 text-muted">{project.description}</p><div className="mt-5 grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3"><div><p className="text-[11px] uppercase tracking-wider text-muted">Requests</p><p className="mt-1 text-sm font-semibold">{project.requests}</p></div><div><p className="text-[11px] uppercase tracking-wider text-muted">Region</p><p className="mt-1 text-sm font-semibold">{project.region}</p></div></div><div className="mt-5 flex items-center justify-between"><span className="text-xs text-muted">Created {project.created}</span><Link to={`/projects/${project.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">Open <ArrowRight className="size-4" /></Link></div></Card>)}</div>
    <Modal open={open} onClose={() => setOpen(false)} title="Create a new project" description="Projects isolate data, credentials, and usage." footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={create}>Create project</Button></>}><div className="space-y-4"><Input label="Project name" placeholder="e.g. Customer portal" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><label className="block"><span className="mb-2 block text-sm font-medium text-slate-700">Description</span><textarea rows="3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full resize-none rounded-lg border border-line p-3 text-sm outline-none focus:border-brand-500" placeholder="What are you building?" /></label><label className="block"><span className="mb-2 block text-sm font-medium text-slate-700">Region</span><select value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} className="h-11 w-full rounded-lg border border-line bg-white px-3 text-sm"><option>US East</option><option>US West</option><option>EU West</option><option>Asia Pacific</option></select></label></div></Modal>
  </>;
}
