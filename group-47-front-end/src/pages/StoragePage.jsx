import { useMemo, useRef, useState } from "react";
import { Copy, FileArchive, FileCode2, FileImage, FileText, MoreHorizontal, UploadCloud } from "lucide-react";
import { Button, Card, PageHeader, SearchBar } from "../components/ui";
import { useToast } from "../context/ToastContext";

const initialFiles = [
  { name: "hero-dashboard.png", type: "PNG", size: "2.4 MB", uploaded: "Today, 10:42 AM", icon: FileImage },
  { name: "brand-guidelines.pdf", type: "PDF", size: "8.1 MB", uploaded: "Yesterday", icon: FileText },
  { name: "users-export.json", type: "JSON", size: "624 KB", uploaded: "Apr 16, 2025", icon: FileCode2 },
  { name: "product-assets.zip", type: "ZIP", size: "18.7 MB", uploaded: "Apr 14, 2025", icon: FileArchive },
];

export default function StoragePage() {
  const [files, setFiles] = useState(initialFiles);
  const [search, setSearch] = useState("");
  const [drag, setDrag] = useState(false);
  const inputRef = useRef();
  const { showToast } = useToast();
  const shown = useMemo(() => files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase())), [files, search]);
  const addFiles = (list) => {
    const additions = [...list].map((file) => ({ name: file.name, type: file.name.split(".").pop().toUpperCase(), size: `${(file.size / 1024 / 1024).toFixed(1)} MB`, uploaded: "Just now", icon: FileText }));
    setFiles((old) => [...additions, ...old]); showToast(`${additions.length} file${additions.length === 1 ? "" : "s"} uploaded.`);
  };
  return <>
    <PageHeader eyebrow="Aurora Commerce" title="Storage" description="Upload, organize, and serve files from your project." actions={<Button onClick={() => inputRef.current?.click()}><UploadCloud className="size-4" />Upload files</Button>} />
    <Card className={`mb-5 border-2 border-dashed p-8 text-center transition ${drag ? "border-brand-500 bg-brand-50" : "border-slate-300 shadow-none"}`}><div onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}><span className="mx-auto grid size-12 place-items-center rounded-xl bg-brand-50 text-brand-600"><UploadCloud className="size-6" /></span><p className="mt-4 text-sm font-semibold">Drag and drop files here</p><p className="mt-1 text-xs text-muted">or click upload · Maximum 50 MB per file</p><input ref={inputRef} type="file" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} /></div></Card>
    <Card className="overflow-hidden"><div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-bold">All files</h2><p className="mt-1 text-xs text-muted">{files.length} files · 6.8 GB used</p></div><div className="w-full sm:w-72"><SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search files…" /></div></div><div className="divide-y divide-line">{shown.map(({ name, type, size, uploaded, icon: Icon }) => <div key={name} className="flex items-center gap-4 p-4 hover:bg-slate-50"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500"><Icon className="size-5" /></span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{name}</p><p className="mt-1 text-xs text-muted">{type} · {size}</p></div><p className="hidden text-xs text-muted sm:block">{uploaded}</p><button onClick={() => { navigator.clipboard.writeText(`${location.origin}/files/${name}`); showToast("File URL copied."); }} className="rounded-lg p-2 text-slate-400 hover:bg-brand-50 hover:text-brand-600"><Copy className="size-4" /></button><button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><MoreHorizontal className="size-4" /></button></div>)}</div></Card>
  </>;
}
