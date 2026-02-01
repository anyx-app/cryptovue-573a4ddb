# Schema Plan - CryptoVue

## Overview
CryptoVue requires a schema that supports multi-wallet tracking, asset management, and transaction history for calculating Profit/Loss (P&L). We will leverage Supabase's `auth.users` for authentication and extend it with a `profiles` table.

## Tables

### 1. `profiles`
Extends the default Supabase authentication user.
- `id` (uuid, PK): References `auth.users.id`.
- `username` (text): Display name for the user.
- `avatar_url` (text): URL to profile image.
- `currency_preference` (text): Default currency for display (e.g., 'USD', 'EUR'). Default 'USD'.
- `created_at` (timestamptz): Timestamp of creation.
- `updated_at` (timestamptz): Timestamp of last update.

### 2. `wallets`
Represents a source of funds (exchange account, on-chain wallet, or manual portfolio).
- `id` (uuid, PK): Unique identifier.
- `user_id` (uuid, FK): References `profiles.id`.
- `name` (text): User-defined name (e.g., "Main Metamask", "Binance").
- `address` (text): Public address for on-chain wallets (nullable).
- `chain_type` (text): Type of wallet (e.g., 'manual', 'ethereum', 'solana', 'bitcoin').
- `is_synced` (boolean): Whether this wallet is auto-synced via API/Blockchain.
- `created_at` (timestamptz): Timestamp of creation.

### 3. `assets`
Represents the current holding of a specific coin/token within a wallet.
- `id` (uuid, PK): Unique identifier.
- `wallet_id` (uuid, FK): References `wallets.id`.
- `symbol` (text): Ticker symbol (e.g., "BTC", "ETH").
- `name` (text): Full name (e.g., "Bitcoin").
- `coingecko_id` (text): ID for fetching price data (optional).
- `balance` (numeric): Current quantity held.
- `average_buy_price` (numeric): Calculated average cost basis per unit (for P&L).
- `last_updated` (timestamptz): When the balance was last updated.

### 4. `transactions`
Records historical movements to calculate performance and history.
- `id` (uuid, PK): Unique identifier.
- `wallet_id` (uuid, FK): References `wallets.id`.
- `asset_id` (uuid, FK): References `assets.id` (optional, or store symbol directly if asset record deleted).
- `type` (text): Enum ('buy', 'sell', 'transfer_in', 'transfer_out').
- `amount` (numeric): Quantity of assets moved.
- `price_per_unit` (numeric): Price at the time of transaction (in user's preferred currency or USD).
- `fee` (numeric): Transaction fee paid.
- `transaction_hash` (text): On-chain tx hash (nullable).
- `transaction_date` (timestamptz): Date of the transaction.
- `created_at` (timestamptz): Record creation time.

## Relationships
- `profiles` 1:N `wallets`
- `wallets` 1:N `assets`
- `wallets` 1:N `transactions`

## Security (RLS)
- All tables will have Row Level Security enabled.
- Users can only `SELECT`, `INSERT`, `UPDATE`, `DELETE` their own data (`user_id = auth.uid()`).
