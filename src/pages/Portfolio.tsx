import React from 'react';
import { Wallet, TrendingUp, PieChart, ArrowUpRight } from 'lucide-react';
import { StatGrid } from '@/components/recipes/dashboard/StatCard';
import { PortfolioChart } from '@/components/portfolio/PortfolioChart';
import { AllocationChart } from '@/components/portfolio/AllocationChart';
import { HoldingsTable } from '@/components/portfolio/HoldingsTable';

export default function Portfolio() {
  const stats = [
    {
      title: "Total Balance",
      value: "$124,592.00",
      change: { value: 12.5, isPositive: true, label: "vs last month" },
      icon: Wallet,
    },
    {
      title: "24h Profit/Loss",
      value: "+$1,240.50",
      change: { value: 2.4, isPositive: true },
      icon: TrendingUp,
    },
    {
      title: "Top Performer",
      value: "Bitcoin (BTC)",
      change: { value: 5.2, isPositive: true },
      icon: ArrowUpRight,
    },
    {
      title: "Asset Count",
      value: "12",
      icon: PieChart,
    },
  ];

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground">Track your crypto assets and performance.</p>
        </div>
      </div>

      <StatGrid stats={stats} />

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <PortfolioChart />
        </div>
        <div>
          <AllocationChart />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Current Holdings</h2>
        <HoldingsTable />
      </div>
    </div>
  );
}

