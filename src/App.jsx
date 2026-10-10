import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import { ArrowUpRight, Languages, Shuffle, Route as RouteIcon, LayoutDashboard, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Translator from "./pages/Translator";
import Generator from "./pages/Generator";
import About from "./pages/About";

const links = [
  { to: "/", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/translator", label: "Text Translator", icon: Languages },
  { to: "/generator", label: "String Generator", icon: Shuffle },
  { to: "/about", label: "Task Details", icon: RouteIcon }
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  return <div className="min-h-screen bg-ink text-slate-100">
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-blue-500 text-ink shadow-glow"><Sparkles size={21}/></div>
          <div><p className="font-bold tracking-tight">Frontend <span className="text-cyan-300">Lab</span></p><p className="text-[11px] text-slate-400">QSkill • Slab 1</p></div>
        </NavLink>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(({to,label,icon:Icon,end}) => <NavLink key={to} to={to} end={end} className={({isActive}) => `nav-link ${isActive ? "nav-link-active" : ""}`}><Icon size={16}/>{label}</NavLink>)}
        </nav>
        <a href="https://www.qskill.in/" target="_blank" rel="noreferrer" className="hidden items-center gap-1 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-200 sm:flex">QSkill <ArrowUpRight size={14}/></a>
        <button className="rounded-lg p-2 text-slate-300 md:hidden" aria-label="Toggle navigation" onClick={() => setMobileOpen(v=>!v)}>{mobileOpen?<X/>:<Menu/>}</button>
      </div>
      {mobileOpen && <nav className="grid gap-1 border-t border-white/10 px-4 py-3 md:hidden">{links.map(({to,label,icon:Icon,end})=><NavLink key={to} to={to} end={end} onClick={()=>setMobileOpen(false)} className={({isActive})=>`nav-link ${isActive?"nav-link-active":""}`}><Icon size={17}/>{label}</NavLink>)}</nav>}
    </header>
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/translator" element={<Translator/>}/>
        <Route path="/generator" element={<Generator/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<div className="panel mx-auto max-w-xl py-16 text-center"><p className="text-5xl font-black text-cyan-300">404</p><h1 className="mt-3 text-xl font-bold">Page not found</h1><p className="mt-2 text-sm text-slate-400">The route <code>{location.pathname}</code> does not exist.</p><NavLink className="primary-btn mt-6 inline-flex" to="/">Back to overview</NavLink></div>}/>
      </Routes>
    </main>
    <footer className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-500">Built with React, Tailwind CSS and React Router • QSkill Internship Slab 1</footer>
  </div>;
}