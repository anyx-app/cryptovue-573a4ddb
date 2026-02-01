import React from 'react';
import { Button } from '../components/ui/Button';
import { TrendingUp, TrendingDown, DollarSign, Activity, Wallet } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">John</span>
          </h1>
          <p className="text-slate-400 text-lg">Here's what's happening with your portfolio today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Wallet className="w-4 h-4" />
            Connect Wallet
          </Button>
          <Button className="gap-2 shadow-lg shadow-emerald-500/20">
            <Activity className="w-4 h-4" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Balance', value: '$42,593.00', change: '+12.5%', isPositive: true, icon: DollarSign },
          { label: '24h Profit', value: '$1,294.20', change: '+5.2%', isPositive: true, icon: TrendingUp },
          { label: 'Top Performer', value: 'Bitcoin', sub: '+3.1%', change: 'BTC', isPositive: true, icon: Activity },
          { label: 'Active Wallets', value: '4', change: 'Synced', isPositive: null, icon: Wallet },
        ].map((stat, i) => (
          <div key={i} className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 hover:border-white/20">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-white/5 text-slate-300 group-hover:scale-110 transition-transform duration-300 group-hover:bg-emerald-500/20 group-hover:text-emerald-400">
                <stat.icon className="w-5 h-5" />
              </div>
              {stat.isPositive !== null && (
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${stat.isPositive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {stat.change}
                </span>
              )}
            </div>
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
              {stat.sub && <p className="text-sm text-slate-500 mt-1">{stat.sub}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Area */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden min-h-[400px]">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-50" />
           <div className="flex justify-between items-center mb-8">
             <h3 className="text-xl font-bold text-white">Portfolio Performance</h3>
             <div className="flex gap-2 p-1 bg-white/5 rounded-lg border border-white/5">
                {['1H', '1D', '1W', '1M', '1Y', 'ALL'].map((tf) => (
                  <button key={tf} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${tf === '1M' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                    {tf}
                  </button>
                ))}
             </div>
           </div>
           
           {/* Visual Placeholder for Chart */}
           <div className="w-full h-[300px] flex items-end justify-between px-4 gap-2 opacity-50">
              {[40, 60, 45, 70, 50, 80, 65, 85, 75, 90, 60, 70, 80, 100, 90].map((h, i) => (
                <div key={i} className="w-full bg-gradient-to-t from-emerald-500/10 to-emerald-500/50 rounded-t-sm hover:from-emerald-500/30 hover:to-emerald-500/80 transition-all duration-300" style={{ height: `${h}%` }} />
              ))}
           </div>
        </div>

        {/* Asset List */}
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold text-white">Your Assets</h3>
             <Button variant="link" className="text-emerald-400 p-0 h-auto">View All</Button>
           </div>
           <div className="space-y-4">
             {[
               { name: 'Bitcoin', symbol: 'BTC', price: '$64,230.50', amount: '0.45 BTC', color: 'bg-orange-500' },
               { name: 'Ethereum', symbol: 'ETH', price: '$3,450.20', amount: '4.20 ETH', color: 'bg-indigo-500' },
               { name: 'Solana', symbol: 'SOL', price: '$145.80', amount: '120.5 SOL', color: 'bg-purple-500' },
               { name: 'USDC', symbol: 'USDC', price: '$1.00', amount: '5,400 USDC', color: 'bg-blue-500' },
             ].map((coin, i) => (
               <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                 <div className="flex items-center gap-3">
                   <div className={`w-10 h-10 rounded-full ${coin.color} flex items-center justify-center text-white font-bold text-xs shadow-lg`}>
                     {coin.symbol[0]}
                   </div>
                   <div>
                     <p className="font-medium text-slate-200 group-hover:text-white transition-colors">{coin.name}</p>
                     <p className="text-xs text-slate-500">{coin.symbol}</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="font-medium text-white">{coin.price}</p>
                   <p className="text-xs text-slate-500">{coin.amount}</p>
                 </div>
               </div>
             ))}
           </div>
           <Button className="w-full mt-6 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10">
             + Add New Asset
           </Button>
        </div>
      </div>
    </div>
  );
}
