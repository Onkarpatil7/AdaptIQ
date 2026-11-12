
import { useState } from "react";
import {
  LayoutDashboard,
  CloudUpload,
  Database,
  ChartColumn,
  Bot,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Plus,
  Bell,
} from "lucide-react";

import DataUpload from "../components/DataUpload";
import { logoutUser, getCurrentUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Section =
  | "Overview"
  | "Add data"
  | "Datasets"
  | "Analytics"
  | "AI Analyst"
  | "Settings";

const navigation = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Add data", icon: CloudUpload },
  { name: "Datasets", icon: Database },
  { name: "Analytics", icon: ChartColumn },
  { name: "AI Analyst", icon: Bot },
];

export default function DashboardPage() {
  const [activeSection, setActiveSection] =
    useState<Section>("Overview");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => navigate("/login"));
  }, [navigate]);

  async function handleLogout() {
    try {
      await logoutUser();
    } finally {
      navigate("/login");
    }
  }

  const displayName = user?.full_name || "User";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col
        border-r border-slate-200 bg-white transition-transform
        duration-300 lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center
              rounded-xl bg-indigo-600 text-white shadow-lg
              shadow-indigo-200">
              <ChartColumn size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Adapt<span className="text-indigo-600">IQ</span>
              </h1>
              <p className="text-xs text-slate-400">
                {/* Business Intelligence */}
              </p>
            </div>
          </div>

          <button
            className="lg:hidden text-slate-500"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 pt-5">
          <p className="mb-3 px-3 text-xs font-semibold uppercase
            tracking-wider text-slate-400">
            Workspace
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveSection(item.name as Section);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl
                    px-3 py-3 text-sm font-medium transition
                    ${
                      active
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <Icon size={19} />
                  {item.name}

                  {item.name === "Add data" && (
                    <Plus size={15} className="ml-auto" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-8 px-4">
          <p className="mb-3 px-3 text-xs font-semibold uppercase
            tracking-wider text-slate-400">
            Preferences
          </p>

          <button
            onClick={() => setActiveSection("Settings")}
            className={`flex w-full items-center gap-3 rounded-xl
              px-3 py-3 text-sm font-medium transition
              ${
                activeSection === "Settings"
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
          >
            <Settings size={19} />
            Settings
          </button>
{/* 
          <button
            className="mt-1 flex w-full items-center gap-3 rounded-xl
              px-3 py-3 text-sm font-medium text-slate-500
              hover:bg-slate-50"
          >
            <HelpCircle size={19} />
            Help & Support
          </button> */}
        </div>

        <div className="mt-auto border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-xl
            bg-slate-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center
              rounded-full bg-indigo-100 font-semibold text-indigo-700">
              {displayName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {displayName}
              </p>
              <p className="text-xs text-slate-400">
                Workspace member
              </p>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              className="text-slate-400 hover:text-red-500"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <main className="min-h-screen lg:pl-64">

        {/* Top navbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center
          justify-between border-b border-slate-200/80
          bg-white/90 px-5 backdrop-blur-xl sm:px-8">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={21} />
            </button>

            <div>
              <p className="text-xs text-slate-400">
                Workspace / {activeSection}
              </p>
              <h2 className="font-semibold text-slate-800">
                {activeSection}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-xl border border-slate-200
              p-2.5 text-slate-500 hover:bg-slate-50">
              <Bell size={18} />
            </button>

            <div className="hidden h-9 w-9 items-center justify-center
              rounded-full bg-indigo-100 font-semibold text-indigo-700 sm:flex">
              {displayName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="relative mx-auto max-w-7xl overflow-hidden p-5
          sm:p-8">

          <div className="pointer-events-none absolute -right-20 -top-20
            h-72 w-72 rounded-full bg-indigo-100/70 blur-3xl" />

          {activeSection === "Overview" && (
            <div className="relative space-y-8">

              <div className="flex flex-col justify-between gap-4 sm:flex-row
                sm:items-end">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2
                    rounded-full border border-indigo-100 bg-white
                    px-3 py-1.5 text-xs font-medium text-indigo-600">
                    <Sparkles size={14} />
                    Intelligent business workspace
                  </div>

                  <h1 className="text-3xl font-semibold tracking-tight
                    text-slate-900 sm:text-4xl">
                    Welcome back, {displayName.split(" ")[0]}
                  </h1>

                  <p className="mt-2 text-sm text-slate-500 sm:text-base">
                    Bring your business data together and discover
                    meaningful insights.
                  </p>
                </div>

                <button
                  onClick={() => setActiveSection("Add data")}
                  className="inline-flex items-center justify-center gap-2
                    rounded-xl bg-indigo-600 px-5 py-3 text-sm
                    font-semibold text-white shadow-lg shadow-indigo-200
                    transition hover:-translate-y-0.5 hover:bg-indigo-700"
                >
                  <Plus size={17} />
                  Add data
                </button>
              </div>

              {/* Metrics */}
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: "Total datasets", value: "0", icon: Database },
                  { label: "Analyses completed", value: "0", icon: ChartColumn },
                  { label: "Files processed", value: "0", icon: CloudUpload },
                  { label: "AI insights", value: "0", icon: Bot },
                ].map((metric) => {
                  const Icon = metric.icon;

                  return (
                    <div key={metric.label}
                      className="rounded-2xl border border-slate-200
                        bg-white p-5 shadow-sm shadow-slate-200/40">
                      <div className="mb-4 flex h-10 w-10 items-center
                        justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <Icon size={20} />
                      </div>

                      <p className="text-2xl font-bold text-slate-900">
                        {metric.value}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {metric.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Upload section */}
              <div className="grid gap-6 xl:grid-cols-3">

                <div className="xl:col-span-2">
                  <DataUpload />
                </div>

                <div className="rounded-2xl border border-indigo-100
                  bg-gradient-to-br from-indigo-50 to-white p-6">
                  <div className="mb-4 flex h-11 w-11 items-center
                    justify-center rounded-xl bg-indigo-600 text-white">
                    <Sparkles size={21} />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900">
                    Your AI Analyst
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Upload your business data to start exploring
                    trends, patterns and actionable insights.
                  </p>

                  <button
                    onClick={() => setActiveSection("AI Analyst")}
                    className="mt-5 text-sm font-semibold text-indigo-600
                      hover:text-indigo-700"
                  >
                    Explore AI Analyst →
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200
                bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">
                  Recent datasets
                </h3>

                <div className="py-12 text-center">
                  <Database className="mx-auto text-slate-300" size={32} />

                  <p className="mt-3 text-sm font-medium text-slate-600">
                    No datasets uploaded yet
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Your uploaded files will appear here.
                  </p>
                </div>
              </div>

            </div>
          )}

          {activeSection === "Add data" && (
            <div className="relative max-w-3xl space-y-5">
              <div>
                <h1 className="text-3xl font-semibold">Add business data</h1>
                <p className="mt-2 text-slate-500">
                  Upload files to start building your business intelligence.
                </p>
              </div>
              <DataUpload />
            </div>
          )}

          {activeSection === "Datasets" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <Database className="mb-3 text-indigo-600" size={28} />
              <h3 className="text-lg font-semibold">Your datasets</h3>
              <p className="mt-2 text-sm text-slate-500">
                Dataset listing will be connected to PostgreSQL next.
              </p>
            </div>
          )}

          {activeSection === "Analytics" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <ChartColumn className="mb-3 text-indigo-600" size={28} />
              <h3 className="text-lg font-semibold">Business analytics</h3>
              <p className="mt-2 text-sm text-slate-500">
                Your data visualizations and KPIs will appear here.
              </p>
            </div>
          )}

          {activeSection === "AI Analyst" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <Bot className="mb-3 text-indigo-600" size={28} />
              <h3 className="text-lg font-semibold">AI Analyst</h3>
              <p className="mt-2 text-sm text-slate-500">
                Ask questions about your business data here in a future phase.
              </p>
            </div>
          )}

          {activeSection === "Settings" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <Settings className="mb-3 text-indigo-600" size={28} />
              <h3 className="text-lg font-semibold">Workspace settings</h3>
              <p className="mt-2 text-sm text-slate-500">
                Organization and account settings will be added here.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
