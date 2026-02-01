import { useMemo } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ChartCard } from '@/components/recipes/dashboard/ChartCard'
import { useBrand } from '@/hooks/useBrand'

// Mock data for the chart
const generateData = () => {
  const data = []
  const now = new Date()
  let value = 12500 // Starting value
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    // Random fluctuation
    const change = (Math.random() - 0.45) * 500
    value += change
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.max(0, value),
    })
  }
  return data
}

export function PortfolioChart() {
  const { config } = useBrand()
  const data = useMemo(() => generateData(), [])
  
  // Calculate current value and change
  const currentValue = data[data.length - 1].value
  const startValue = data[0].value
  const percentChange = ((currentValue - startValue) / startValue) * 100
  
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val)
  }

  return (
    <ChartCard
      title="Portfolio Value"
      description="Last 30 days performance"
      value={formatCurrency(currentValue)}
      change={{
        value: Math.abs(Number(percentChange.toFixed(2))),
        isPositive: percentChange >= 0
      }}
      className="h-full"
    >
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              minTickGap={30}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
                color: 'hsl(var(--popover-foreground))',
              }}
              itemStyle={{ color: 'hsl(var(--primary))' }}
              formatter={(value: number) => [formatCurrency(value), 'Value']}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}

