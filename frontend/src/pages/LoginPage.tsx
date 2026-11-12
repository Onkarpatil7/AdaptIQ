
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BrainCircuit, Mail, Lock, Eye, EyeOff,
  ArrowRight, ShieldCheck
} from "lucide-react";
import { loginUser } from "../services/authService";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser({ email, password, remember_me: rememberMe });
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-2">

      {/* Branding */}
      <section className="hidden flex-col justify-between bg-slate-50 px-14 py-12 lg:flex xl:px-24">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <BrainCircuit size={23} />
          </div>
          <span className="text-2xl font-bold">
            Adapt<span className="text-indigo-600">IQ</span>
          </span>
        </Link>

        <div className="max-w-xl">
          <span className="rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
            Adaptive Business Intelligence
          </span>

          <h1 className="mt-8 text-5xl font-semibold leading-tight">
            Understand your business.
            <span className="text-indigo-600"> Unlock its potential.</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-500">
            Transform scattered business data into meaningful insights
            with an intelligent platform that adapts as your business grows.
          </p>

          <div className="mt-12 space-y-4">
            {[
              ["Context-aware intelligence", "Automatically understand your business data."],
              ["Adaptive AI capabilities", "Select analytical capabilities based on context."],
              ["Decision-ready insights", "Explore evidence-backed business insights."]
            ].map(([title, description]) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-slate-400">
          © 2026 AdaptIQ. All rights reserved.
        </p>
      </section>

      {/* Login form */}
      <section className="flex min-h-screen flex-col justify-center px-6 py-10 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-md">

          <Link to="/" className="mb-12 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <BrainCircuit size={23} />
            </div>
            <span className="text-2xl font-bold">
              Adapt<span className="text-indigo-600">IQ</span>
            </span>
          </Link>

          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Welcome back
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Sign in to AdaptIQ
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Access your business intelligence workspace.
          </p>

          <form onSubmit={handleSubmit} className="mt-9 space-y-6">

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Work email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="h-12 w-full rounded-lg border border-slate-200 pl-11 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-lg border border-slate-200 pl-11 pr-12 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 accent-indigo-600"
              />
              Remember me
            </label>

            {error && (
              <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in to workspace"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-indigo-600">
              Create an account
            </Link>
          </p>

          <div className="mt-12 flex justify-center gap-2 border-t border-slate-100 pt-6 text-xs text-slate-400">
            <ShieldCheck size={15} />
            Your business data deserves secure handling.
          </div>
        </div>
      </section>
    </main>
  );
}
