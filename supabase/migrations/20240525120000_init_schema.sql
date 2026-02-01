SET search_path TO proj_99945c47;

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES: Stores user metadata linked to auth.users via user_id
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL, -- References auth.users.id implicitly via JWT
    username TEXT,
    avatar_url TEXT,
    currency_preference TEXT DEFAULT 'USD',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for RLS performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');


-- WALLETS: Crypto wallets or exchange accounts
CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    address TEXT, -- Nullable for manual portfolios
    chain_type TEXT NOT NULL, -- e.g., 'ethereum', 'bitcoin', 'solana', 'manual'
    is_synced BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;

-- Wallets Policies
CREATE POLICY "Users can manage their wallets" ON wallets
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = wallets.profile_id
            AND profiles.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
        )
    );


-- ASSETS: Holdings within a wallet
CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
    symbol TEXT NOT NULL, -- e.g. BTC, ETH
    name TEXT,
    coingecko_id TEXT, -- For price fetching
    balance NUMERIC DEFAULT 0,
    average_buy_price NUMERIC DEFAULT 0,
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

-- Assets Policies
CREATE POLICY "Users can manage their assets" ON assets
    USING (
        EXISTS (
            SELECT 1 FROM wallets
            JOIN profiles ON profiles.id = wallets.profile_id
            WHERE wallets.id = assets.wallet_id
            AND profiles.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
        )
    );


-- TRANSACTIONS: History of movements
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_id UUID NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
    asset_id UUID REFERENCES assets(id) ON DELETE SET NULL,
    type TEXT NOT NULL, -- buy, sell, transfer_in, transfer_out
    amount NUMERIC NOT NULL,
    price_per_unit NUMERIC,
    fee NUMERIC DEFAULT 0,
    transaction_hash TEXT,
    transaction_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Transactions Policies
CREATE POLICY "Users can manage their transactions" ON transactions
    USING (
        EXISTS (
            SELECT 1 FROM wallets
            JOIN profiles ON profiles.id = wallets.profile_id
            WHERE wallets.id = transactions.wallet_id
            AND profiles.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
        )
    );
