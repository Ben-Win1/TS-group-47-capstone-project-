import { useState } from "react";
import { Bell, LockKeyhole, Save, Shield, Trash2, UserRound, Users } from "lucide-react";
import { Button, Card, Input, PageHeader } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function SettingsPage() {
  const [tab, setTab] = useState("Profile");
  const { user } = useAuth();
  const { showToast } = useToast();
  const tabs = [["Profile", UserRound], ["Security", Shield], ["Notifications", Bell], ["Team access", Users]];
  return <>
    <PageHeader eyebrow="Account" title="Settings" description="Manage your profile, security preferences, and access." />
    <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
      <Card className="h-fit p-2">{tabs.map(([name, Icon]) => <button key={name} onClick={() => setTab(name)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${tab === name ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50"}`}><Icon className="size-4" />{name}</button>)}</Card>
      <div className="space-y-5">
        <Card><div className="border-b border-line p-5"><h2 className="font-bold">{tab}</h2><p className="mt-1 text-sm text-muted">Update your {tab.toLowerCase()} information.</p></div><div className="p-5">{tab === "Profile" ? <div className="max-w-xl space-y-4"><div className="flex items-center gap-4"><span className="grid size-16 place-items-center rounded-xl bg-brand-100 text-lg font-bold text-brand-700">{user?.firstName?.[0] || "A"}</span><Button variant="secondary">Change avatar</Button></div><div className="grid gap-4 sm:grid-cols-2"><Input label="First name" defaultValue={user?.firstName || "Alex"} /><Input label="Last name" defaultValue={user?.lastName || "Morgan"} /></div><Input label="Email address" type="email" defaultValue={user?.email || "alex@group47.dev"} /><Input label="Role" defaultValue="Backend Engineer" /><Button onClick={() => showToast("Profile changes saved.")}><Save className="size-4" />Save changes</Button></div> : tab === "Security" ? <div className="max-w-xl space-y-4"><Input label="Current password" type="password" /><Input label="New password" type="password" /><Input label="Confirm password" type="password" /><Button onClick={() => showToast("Password updated.")}><LockKeyhole className="size-4" />Update password</Button><div className="rounded-lg border border-line p-4"><p className="text-sm font-semibold">Two-factor authentication</p><p className="mt-1 text-xs text-muted">Add another layer of protection to your account.</p><Button className="mt-3" variant="secondary">Enable 2FA</Button></div></div> : <div className="grid min-h-48 place-items-center text-center"><div><Users className="mx-auto size-8 text-brand-500" /><p className="mt-3 font-semibold">{tab} controls</p><p className="mt-1 text-sm text-muted">Connect this section to the dedicated settings service.</p></div></div>}</div></Card>
        <Card className="border-red-200"><div className="p-5"><h2 className="font-bold text-red-700">Danger zone</h2><p className="mt-1 text-sm text-muted">Permanently delete this account and all associated resources.</p><Button variant="danger" className="mt-4"><Trash2 className="size-4" />Delete account</Button></div></Card>
      </div>
    </div>
  </>;
}
