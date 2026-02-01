import { DataTable, DataTableColumn } from '@/components/recipes/dashboard/DataTable'
import { ArrowDown, ArrowUp, Bitcoin, Wallet } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export interface Holding {
  id: string
  name: string
  symbol: string
  price: number
  balance: number
  value: number
  change24h: number
  allocation: number
}

const MOCK_HOLDINGS: Holding[] = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 45230.50,
    balance: 0.45,
    value: 20353.72,
    change24h: 2.5,
    allocation: 45
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2890.12,
    balance: 4.2,
    value: 12138.50,
    change24h: -1.2,
    allocation: 25
  },
  {
    id: '3',
    name: 'Solana',
    symbol: 'SOL',
    price: 104.50,
    balance: 150,
    value: 15675.00,
    change24h: 5.8,
    allocation: 15
  },
  {
    id: '4',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.55,
    balance: 5000,
    value: 2750.00,
    change24h: 0.8,
    allocation: 10
  },
  {
    id: '5',
    name: 'Polkadot',
    symbol: 'DOT',
    price: 7.20,
    balance: 500,
    value: 3600.00,
    change24h: -3.4,
    allocation: 5
  }
]

export function HoldingsTable() {
  const columns: DataTableColumn<Holding>[] = [
    {
      header: 'Asset',
      accessorKey: 'name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            {row.original.symbol === 'BTC' ? <Bitcoin className="h-5 w-5" /> : <Wallet className="h-5 w-5" />}
          </div>
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-xs text-muted-foreground">{row.original.symbol}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Price',
      accessorKey: 'price',
      cell: ({ row }) => (
        <div className="font-medium">
          ${row.original.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      )
    },
    {
      header: 'Balance',
      accessorKey: 'balance',
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.balance.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">{row.original.symbol}</div>
        </div>
      )
    },
    {
      header: 'Value',
      accessorKey: 'value',
      cell: ({ row }) => (
        <div className="font-bold">
          ${row.original.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      )
    },
    {
      header: '24h Change',
      accessorKey: 'change24h',
      cell: ({ row }) => {
        const isPositive = row.original.change24h >= 0
        return (
          <Badge 
            variant={isPositive ? 'default' : 'destructive'}
            className={isPositive ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'}
          >
            <div className="flex items-center gap-1">
              {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {Math.abs(row.original.change24h)}%
            </div>
          </Badge>
        )
      }
    }
  ]

  return (
    <DataTable
      title="Your Assets"
      description="Current holdings across all connected wallets"
      columns={columns}
      data={MOCK_HOLDINGS}
      searchable
      searchPlaceholder="Search assets..."
      className="h-full"
    />
  )
}

