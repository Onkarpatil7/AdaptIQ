
import { Link } from "react-router-dom";
import {
  BrainCircuit,
  ArrowRight,
  BarChart3,
  Database,
  Network,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Menu
} from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Universal Data Understanding",
    description:
      "Upload business datasets and automatically discover their structure, quality and meaning."
  },
  {
    icon: BrainCircuit,
    title: "Context-Aware Intelligence",
    description:
      "Understand business entities, relationships, KPIs and industry-specific terminology."
  },
  {
    icon: Network,
    title: "Adaptive Multi-Agent Analytics",
    description:
      "Dynamically select analytical capabilities based on business context and user questions."
  }
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* Navigation */}
      <nav className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <BrainCircuit size={23} />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Adapt<span className="text-indigo-600">IQ</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#features" className="hover:text-indigo-600">Features</a>
            <a href="#workflow" className="hover:text-indigo-600">How it works</a>
            <a href="#about" className="hover:text-indigo-600">About</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden text-sm font-semibold text-slate-700 hover:text-indigo-600 sm:block"
            >
              Sign in
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Get started <ArrowRight className="ml-1 inline" size={15} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-50">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-100 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:py-32">

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm">
              <Sparkles size={15} />
              Adaptive Business Intelligence
            </div>

            <h1 className="mt-8 text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
              Your business data.
              <span className="block text-indigo-600">
                One intelligent platform.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-500">
              Transform scattered business data into meaningful insights.
              AdaptIQ learns your business context and delivers intelligent
              analytics to support better decisions.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="rounded-lg bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                Start with AdaptIQ <ArrowRight className="ml-2 inline" size={17} />
              </Link>

              <a
                href="#workflow"
                className="rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Explore platform
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-5 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-indigo-600" />
                Secure data handling
              </span>
              <span className="flex items-center gap-2">
                <BrainCircuit size={17} className="text-indigo-600" />
                Context-aware AI
              </span>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="font-semibold">Business overview</p>
                <p className="mt-1 text-xs text-slate-400">
                  Illustrative dashboard preview
                </p>
              </div>
              <BarChart3 className="text-indigo-600" />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                ["Revenue", "₹12.8L", "+12.4%"],
                ["Growth", "18.6%", "+4.2%"],
                ["Orders", "2,450", "+8.7%"],
                ["Efficiency", "92.4%", "+5.1%"]
              ].map(([title, value, trend]) => (
                <div key={title} className="rounded-xl border border-slate-100 p-4">
                  <p className="text-xs text-slate-400">{title}</p>
                  <p className="mt-2 text-xl font-semibold">{value}</p>
                  <p className="mt-1 text-xs font-medium text-emerald-600">
                    {trend}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Business performance</p>
                <TrendingUp size={18} className="text-indigo-600" />
              </div>

              <div className="mt-5 flex h-32 items-end gap-3">
                {[35, 55, 42, 72, 58, 85, 68, 96, 78, 100, 83, 92].map(
                  (height, index) => (
                    <div
                      key={index}
                      style={{ height: `${height}%` }}
                      className="flex-1 rounded-t-md bg-indigo-500/80"
                    />
                  )
                )}
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
              <Sparkles size={18} className="mt-0.5 shrink-0 text-indigo-600" />
              <div>
                <p className="text-sm font-semibold text-indigo-900">
                  AI business insight
                </p>
                <p className="mt-1 text-xs leading-5 text-indigo-800">
                  Example insight: Revenue increased this quarter. Explore
                  sales trends and product performance to investigate the drivers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Platform capabilities
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Intelligence that adapts to your business
          </h2>
          <p className="mt-4 leading-7 text-slate-500">
            One shared intelligence engine for businesses across industries.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icon size={22} />
                </div>
                <h3 className="mt-6 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              Simple workflow
            </p>
            <h2 className="mt-4 text-3xl font-semibold">
              From raw data to better decisions
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {[
              ["01", "Connect data", "Upload CSV, Excel and other business datasets."],
              ["02", "Understand context", "Discover data meanings and business relationships."],
              ["03", "Analyze intelligently", "Ask questions and activate relevant capabilities."],
              ["04", "Make decisions", "Explore evidence-backed insights and recommendations."]
            ].map(([number, title, description]) => (
              <div key={number} className="rounded-xl border border-slate-200 bg-white p-6">
                <p className="text-sm font-bold text-indigo-600">{number}</p>
                <h3 className="mt-5 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / CTA */}
      <section id="about" className="px-6 py-24 text-center">
        <h2 className="text-3xl font-semibold">
          Make your business data work smarter.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-500">
          Bring your data together, discover your business context and
          explore what's possible with AdaptIQ.
        </p>
        <Link
          to="/register"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Create your account <ArrowRight size={17} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 px-6 py-7">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
          <span>© 2026 AdaptIQ. All rights reserved.</span>
          <div className="flex gap-5">
            <Link to="/login" className="hover:text-indigo-600">Login</Link>
            <Link to="/register" className="hover:text-indigo-600">Register</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
