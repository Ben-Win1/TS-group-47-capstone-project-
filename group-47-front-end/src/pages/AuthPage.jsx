import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import Brand from "../components/Brand";
import { Button, Input } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/auth.service";
import { useToast } from "../context/ToastContext";

const copy = {
  login: ["Welcome back", "Sign in to continue to your workspace."],
  register: ["Create your account", "Start building your backend in minutes."],
  forgot: ["Reset your password", "We’ll send a secure reset link to your inbox."],
  reset: ["Choose a new password", "Use at least 8 characters for your new password."],
};

export default function AuthPage({ mode }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, register, loading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const update = (e) => setForm((old) => ({ ...old, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "login") {
        await login({ email: form.email, password: form.password });
        navigate(location.state?.from?.pathname || "/dashboard");
      } else if (mode === "register") {
        if (form.password !== form.confirmPassword) throw new Error("Passwords do not match.");
        await register(form);
        navigate("/dashboard");
      } else if (mode === "forgot") {
        await authService.forgotPassword(form.email);
        showToast("If an account exists, a reset link has been sent.");
      } else {
        await authService.resetPassword({ token: new URLSearchParams(location.search).get("token"), password: form.password });
        showToast("Password updated. You can now sign in.");
        navigate("/login");
      }
    } catch (err) { setError(err.friendlyMessage || err.message || "Unable to complete your request."); }
  };

  return <div className="grid min-h-screen bg-white lg:grid-cols-2">
    <div className="flex flex-col px-5 py-6 sm:px-10 lg:px-16">
      <Brand />
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink"><ArrowLeft className="size-4" />Back to home</Link>
        <h1 className="text-3xl font-bold tracking-tight">{copy[mode][0]}</h1><p className="mt-2 text-muted">{copy[mode][1]}</p>
        <form className="mt-8 space-y-5" onSubmit={submit}>
          {mode === "register" && <div className="grid grid-cols-2 gap-3"><Input label="First name" name="firstName" required value={form.firstName} onChange={update} icon={UserRound} /><Input label="Last name" name="lastName" required value={form.lastName} onChange={update} /></div>}
          <Input label="Email address" name="email" type="email" required value={form.email} onChange={update} icon={Mail} placeholder="you@company.com" />
          {mode !== "forgot" && <div><Input label={mode === "reset" ? "New password" : "Password"} name="password" type={showPassword ? "text" : "password"} required minLength={8} value={form.password} onChange={update} icon={LockKeyhole} placeholder="At least 8 characters" /><button type="button" onClick={() => setShowPassword((v) => !v)} className="float-right -mt-8 mr-3 text-slate-400 hover:text-slate-700">{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div>}
          {mode === "register" && <Input label="Confirm password" name="confirmPassword" type="password" required value={form.confirmPassword} onChange={update} />}
          {mode === "login" && <div className="flex justify-end"><Link className="text-sm font-semibold text-brand-600" to="/forgot-password">Forgot password?</Link></div>}
          {error && <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
          <Button type="submit" size="lg" className="w-full" disabled={loading}>{loading ? "Please wait…" : mode === "login" ? "Sign in" : mode === "register" ? "Create account" : mode === "forgot" ? "Send reset link" : "Update password"}</Button>
        </form>
        {mode === "login" && <p className="mt-6 text-center text-sm text-muted">New to NexusBase? <Link to="/register" className="font-semibold text-brand-600">Create an account</Link></p>}
        {mode === "register" && <p className="mt-6 text-center text-sm text-muted">Already have an account? <Link to="/login" className="font-semibold text-brand-600">Sign in</Link></p>}
      </div>
    </div>
    <div className="relative hidden overflow-hidden bg-slate-950 lg:flex lg:items-center lg:justify-center"><div className="hero-grid absolute inset-0 opacity-30" /><div className="relative max-w-lg p-12"><span className="font-mono text-sm text-accent-500">{"{ build: better }"}</span><blockquote className="mt-6 text-3xl font-semibold leading-snug text-white">“We stopped maintaining infrastructure and started shipping features.”</blockquote><div className="mt-8 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-brand-500 font-bold text-white">47</span><div><p className="text-sm font-semibold text-white">Group 47 Engineering</p><p className="text-xs text-slate-500">Capstone team</p></div></div></div></div>
  </div>;
}
