import { useState } from "react";
import { Copy, Eye, EyeOff, KeyRound, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { Badge, Button, Card, Input, Modal, PageHeader } from "../components/ui";
import { useToast } from "../context/ToastContext";

const seed = [
  { id: 1, name: "Production server", key: "nxb_live_7J3xK9mQ2vR8tLp4", created: "Apr 18, 2025", used: "2 minutes ago", status: "Active" },
  { id: 2, name: "Local development", key: "nxb_test_4F6aB1cN8sW3yZd9", created: "Apr 02, 2025", used: "Yesterday", status: "Active" },
  { id: 3, name: "Legacy integration", key: "nxb_live_9R2dM7kP5xT1qHs6", created: "Mar 14, 2025", used: "18 days ago", status: "Revoked" },
];

export default function ApiKeysPage() {
  const [keys, setKeys] = useState(seed);
  const [revealed, setRevealed] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { showToast } = useToast();
  const copy = async (value) => { await navigator.clipboard.writeText(value); showToast("API key copied to clipboard."); };
  const generate = () => {
    setKeys((old) => [{ id: Date.now(), name: name || "New API key", key: `nxb_live_${crypto.randomUUID().replaceAll("-", "").slice(0, 16)}`, created: "Just now", used: "Never", status: "Active" }, ...old]);
    setOpen(false); setName(""); showToast("API key generated. Copy it now and store it safely.");
  };
  return <>
    <PageHeader eyebrow="Aurora Commerce" title="API keys" description="Create and manage credentials used to authenticate API requests." actions={<Button onClick={() => setOpen(true)}><Plus className="size-4" />Generate key</Button>} />
    <div className="mb-5 flex gap-3 rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-700"><ShieldCheck className="mt-0.5 size-5 shrink-0" /><div><p className="font-semibold">Keep your keys secure</p><p className="mt-1 text-brand-700/80">Keys are shown once when generated. Never expose a secret key in client-side code.</p></div></div>
    <Card className="overflow-hidden"><div className="hidden grid-cols-[1fr_1.4fr_.75fr_.75fr_auto] gap-4 border-b border-line bg-slate-50 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted md:grid"><span>Name</span><span>Key</span><span>Created</span><span>Last used</span><span>Status</span></div><div className="divide-y divide-line">{keys.map((item) => { const isShown = revealed.includes(item.id); return <div key={item.id} className="grid gap-3 p-5 md:grid-cols-[1fr_1.4fr_.75fr_.75fr_auto] md:items-center md:gap-4"><div><p className="text-sm font-semibold">{item.name}</p><p className="mt-1 text-xs text-muted md:hidden">{item.created}</p></div><div className="flex min-w-0 items-center gap-2"><code className="min-w-0 flex-1 truncate rounded-md bg-slate-100 px-2.5 py-2 font-mono text-xs text-slate-600">{isShown ? item.key : `${item.key.slice(0, 9)}••••••••••••`}</code><button onClick={() => setRevealed((old) => old.includes(item.id) ? old.filter((id) => id !== item.id) : [...old, item.id])} className="text-slate-400 hover:text-ink">{isShown ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button><button onClick={() => copy(item.key)} className="text-slate-400 hover:text-brand-600"><Copy className="size-4" /></button></div><span className="hidden text-xs text-muted md:block">{item.created}</span><span className="hidden text-xs text-muted md:block">{item.used}</span><div className="flex items-center justify-between gap-2"><Badge tone={item.status === "Active" ? "success" : "error"}>{item.status}</Badge><button onClick={() => setKeys((old) => old.filter((key) => key.id !== item.id))} className="text-slate-300 hover:text-red-600"><Trash2 className="size-4" /></button></div></div>; })}</div></Card>
    <Modal open={open} onClose={() => setOpen(false)} title="Generate API key" description="This key will have access to the Aurora Commerce project." footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={generate}><KeyRound className="size-4" />Generate key</Button></>}><Input label="Key name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Production server" /></Modal>
  </>;
}
