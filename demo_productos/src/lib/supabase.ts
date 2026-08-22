import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    supabaseAnonKey.length > 20
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const SUPABASE_SCHEMA_SQL = `-- SCRIPT DE CREACIÓN DE TABLAS PARA SUPABASE (POSTGRESQL)
-- Copia y ejecuta este script en el SQL Editor de tu Dashboard de Supabase

-- 1. Tabla de Productos
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    stock INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'out_of_stock', 'draft')),
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabla de Clientes
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    company TEXT,
    total_purchases NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'lead', 'inactive')),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar Row Level Security (RLS) para lectura/escritura pública en demo
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read access on products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert/update on products" ON public.products FOR ALL USING (true);

CREATE POLICY "Allow anonymous read access on clients" ON public.clients FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert/update on clients" ON public.clients FOR ALL USING (true);
`;
