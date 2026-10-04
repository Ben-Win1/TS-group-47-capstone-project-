import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Database, Filter, Plus, Rows3, Trash2 } from "lucide-react";
import { Badge, Button, Card, Modal, PageHeader, SearchBar } from "../components/ui";
import { useToast } from "../context/ToastContext";

const seed = [
  { id: "usr_7f3a91", name: "Olivia Martin", email: "olivia@example.com", plan: "Pro", status: "Active", created: "2025-04-18" },
  { id: "usr_8c2b14", name: "Jackson Lee", email: "jackson@example.com", plan: "Free", status: "Active", created: "2025-04-17" },
  { id: "usr_1d9e72", name: "Sophia Brown", email: "sophia@example.com", plan: "Team", status: "Invited", created: "2025-04-16" },
  { id: "usr_3a6f88", name: "Noah Williams", email: "noah@example.com", plan: "Pro", status: "Active", created: "2025-04-15" },
  { id: "usr_5b4c21", name: "Mia Davis", email: "mia@example.com", plan: "Free", status: "Suspended", created: "2025-04-14" },
];

export default function DatabasePage() {
  const [records, setRecords] = useState(seed);
  const [collection, setCollection] = useState("users");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('{\n  "name": "",\n  "email": "",\n  "plan": "Free"\n}');
  const { showToast } = useToast();
  const shown = useMemo(() => records.filter((r) => Object.values(r).join(" ").toLowerCase().includes(search.toLowerCase())), [records, search]);
  const add = () => {
    try {
      const value = JSON.parse(draft);
      setRecords((old) => [{ id: `usr_${Date.now().toString(36)}`, status: "Active", created: new Date().toISOString().slice(0, 10), ...value }, ...old]);
      setOpen(false); showToast("Record added.");
    } catch { showToast("Enter valid JSON.", "error"); }
  };

  return <>
    <PageHeader eyebrow="Aurora Commerce" title="Database" description="Browse collections and manage records in your project." actions={<Button onClick={() => setOpen(true)}><Plus className="size-4" />Add record</Button>} />
    <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
      <Card className="h-fit p-3"><div className="flex items-center gap-2 px-2 py-2"><Database className="size-4 text-brand-600" /><p className="text-xs font-bold uppercase tracking-wider text-muted">Collections</p></div>{[["users", "28.4K"], ["orders", "12.1K"], ["products", "846"], ["events", "92.6K"]].map(([name, count]) => <button key={name} onClick={() => setCollection(name)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm ${collection === name ? "bg-brand-50 font-semibold text-brand-700" : "text-slate-600 hover:bg-slate-50"}`}><span className="flex items-center gap-2"><Rows3 className="size-4" />{name}</span><span className="text-xs text-muted">{count}</span></button>)}</Card>
      <Card className="min-w-0 overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-line p-4 md:flex-row md:items-center md:justify-between"><div><h2 className="font-mono text-sm font-semibold">{collection}</h2><p className="mt-1 text-xs text-muted">28,421 records</p></div><div className="flex gap-2"><div className="w-full md:w-64"><SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search records…" /></div><Button variant="secondary"><Filter className="size-4" /><span className="hidden sm:inline">Filter</span></Button></div></div>
        <div className="overflow-x-auto scrollbar-thin"><table className="w-full min-w-[800px] text-left"><thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-muted"><tr>{["ID", "Name", "Email", "Plan", "Status", "Created", ""].map((h) => <th key={h} className="border-b border-line px-4 py-3 font-semibold">{h}</th>)}</tr></thead><tbody className="divide-y divide-line">{shown.map((row) => <tr key={row.id} className="text-sm hover:bg-slate-50/70"><td className="px-4 py-3 font-mono text-xs text-brand-600">{row.id}</td><td className="px-4 py-3 font-medium">{row.name}</td><td className="px-4 py-3 text-slate-600">{row.email}</td><td className="px-4 py-3">{row.plan}</td><td className="px-4 py-3"><Badge tone={row.status === "Active" ? "success" : row.status === "Invited" ? "warning" : "error"}>{row.status}</Badge></td><td className="px-4 py-3 font-mono text-xs text-muted">{row.created}</td><td className="px-4 py-3"><button onClick={() => setRecords((old) => old.filter((r) => r.id !== row.id))} className="text-slate-300 hover:text-red-600"><Trash2 className="size-4" /></button></td></tr>)}</tbody></table></div>
        <div className="flex items-center justify-between border-t border-line p-4"><p className="text-xs text-muted">Showing 1–{shown.length} of 28,421</p><div className="flex gap-1"><Button variant="secondary" size="sm"><ChevronLeft className="size-4" /></Button><Button variant="secondary" size="sm">1</Button><Button variant="ghost" size="sm">2</Button><Button variant="secondary" size="sm"><ChevronRight className="size-4" /></Button></div></div>
      </Card>
    </div>
    <Modal open={open} onClose={() => setOpen(false)} title={`Add record to ${collection}`} description="Provide a valid JSON object. Schema validation runs on the server." footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={add}>Add record</Button></>}><label className="block"><span className="mb-2 block text-sm font-medium text-slate-700">Record JSON</span><textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows="10" spellCheck="false" className="w-full rounded-lg border border-line bg-slate-950 p-4 font-mono text-sm leading-6 text-slate-200 outline-none focus:border-brand-500" /></label></Modal>
  </>;
}
