
import { Link } from "react-router-dom";
import { BrainCircuit, Database, BarChart3, Upload, Sparkles } from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <nav className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <BrainCircuit size={22} />
          </div>
          <span className="text-xl font-bold">
            Adapt<span className="text-indigo-600">IQ</span>
          </span>
        </Link>

        <Link to="/" className="text-sm font-medium text-slate-500 hover:text-indigo-600">
          Home
        </Link>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm font-semibold text-indigo-600">
          BUSINESS WORKSPACE
        </p>
        <h1 className="mt-3 text-3xl font-semibold">
          Welcome to AdaptIQ
        </h1>
        <p className="mt-3 text-slate-500">
          Your business intelligence workspace starts here.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            [Database, "Datasets", "Upload and manage business data."],
            [BarChart3, "Analytics", "Explore business performance."],
            [Sparkles, "AI Analyst", "Ask questions about your business."]
          ].map(([Icon, title, description]: any) => (
            <div key={title} className="rounded-xl border border-slate-200 bg-white p-6">
              <Icon size={25} className="text-indigo-600" />
              <h2 className="mt-5 font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-slate-500">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-dashed border-indigo-300 bg-white p-10 text-center">
          <Upload className="mx-auto text-indigo-600" size={32} />
          <h2 className="mt-4 text-xl font-semibold">Start with your business data</h2>
          <p className="mt-2 text-sm text-slate-500">
            Your future workspace will let you upload CSV, Excel and other datasets.
          </p>
        </div>
      </div>
    </main>
  );
}
