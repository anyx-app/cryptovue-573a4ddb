import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wallet, ArrowRightLeft, Settings, Bell, User, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export default function AppShell() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Portfolio', path: '/portfolio', icon: Wallet },
    { name: 'Transactions', path: '/transactions', icon: ArrowRightLeft },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 flex font-sans selection:bg-emerald-500/30">
      {/* Sidebar */}
      <aside className="w-64 fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">CryptoVue</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-4">Menu</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                  isActive 
                    ? "text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/10 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]" 
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className={cn("w-5 h-5 transition-colors", isActive ? "text-emerald-400" : "text-slate-400 group-hover:text-white")} />
                <span>{item.name}</span>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-400 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
           <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
              <p className="text-xs text-emerald-300 font-medium mb-1">Pro Plan</p>
              <p className="text-[10px] text-slate-400 mb-3">Get advanced analytics</p>
              <Button size="sm" variant="glass" className="w-full text-xs h-8 bg-emerald-500/20 border-emerald-500/30 hover:bg-emerald-500/30">Upgrade</Button>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col relative overflow-hidden">
        {/* Ambient Background Glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <header className="h-20 sticky top-0 z-40 px-8 flex items-center justify-between border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
           <div className="flex items-center gap-4 text-slate-400 text-sm">
             <span className="text-emerald-400 font-medium">{location.pathname === '/' ? 'Dashboard' : location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2)}</span>
             <span className="text-slate-600">/</span>
             <span>Overview</span>
           </div>

           <div className="flex items-center gap-4">
             <Button size="icon" variant="ghost" className="relative">
               <Bell className="w-5 h-5 text-slate-400" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0a0a]" />
             </Button>
             <div className="h-8 w-[1px] bg-white/10 mx-2" />
             <Button variant="ghost" className="flex items-center gap-3 pl-2 pr-4 py-1 h-auto hover:bg-white/5 rounded-full border border-transparent hover:border-white/10">
               <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 flex items-center justify-center text-xs font-medium text-white ring-2 ring-[#0a0a0a]">
                 JD
               </div>
               <span className="text-sm font-medium text-slate-200">John Doe</span>
               <ChevronDown className="w-4 h-4 text-slate-500" />
             </Button>
           </div>
        </header>

        {/* Page Content */}
        <div className="p-8 relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
