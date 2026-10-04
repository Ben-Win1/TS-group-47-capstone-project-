import { Boxes } from "lucide-react";
import { Link } from "react-router";

export default function Brand({ compact = false, light = false }) {
  return <Link to="/" className="inline-flex items-center gap-2.5">
    <span className="grid size-9 place-items-center rounded-lg bg-brand-500 text-white shadow-sm shadow-brand-500/20"><Boxes className="size-5" /></span>
    {!compact && <span className={`text-lg font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>NexusBase</span>}
  </Link>;
}
