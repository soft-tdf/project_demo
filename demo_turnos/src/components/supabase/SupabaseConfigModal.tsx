'use client';

import React, { useState } from 'react';
import { X, Database, Copy, Check, Terminal, ExternalLink } from 'lucide-react';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  isConfigured: boolean;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose,
  isConfigured,
}) => {
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sqlScript = `-- 1. Tabla de Turnos (Tickets)
CREATE TABLE IF NOT EXISTS public.tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_dni TEXT NOT NULL,
    service_category TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'normal',
    counter_id TEXT,
    counter_name TEXT,
    operator_name TEXT,
    status TEXT NOT NULL DEFAULT 'waiting',
    estimated_time_minutes INTEGER DEFAULT 10,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    called_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 2. Tabla de Ventanillas (Counters)
CREATE TABLE IF NOT EXISTS public.counters (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    operator_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    current_ticket_code TEXT
);

-- Habilitar RLS para la Demo
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura anonima turnos" ON public.tickets FOR SELECT USING (true);
CREATE POLICY "Permitir escritura anonima turnos" ON public.tickets FOR ALL USING (true);

CREATE POLICY "Permitir lectura anonima ventanillas" ON public.counters FOR SELECT USING (true);
CREATE POLICY "Permitir escritura anonima ventanillas" ON public.counters FOR ALL USING (true);
`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (supabaseUrl && supabaseKey) {
      localStorage.setItem('demo_turnos_supabase_url', supabaseUrl);
      localStorage.setItem('demo_turnos_supabase_key', supabaseKey);
      window.location.reload();
    }
  };

  const handleClearCredentials = () => {
    localStorage.removeItem('demo_turnos_supabase_url');
    localStorage.removeItem('demo_turnos_supabase_key');
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Conexión a Base de Datos Supabase (PostgreSQL)</h2>
              <p className="text-xs text-slate-400">Modo Demo Local vs Producción Supabase</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Status Alert */}
          <div className={`p-4 rounded-xl border flex items-start space-x-3 text-xs ${
            isConfigured 
              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300' 
              : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300'
          }`}>
            <Database className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-sm mb-0.5">
                {isConfigured ? 'Supabase Conectado Correctamente' : 'Modo Mock (LocalStorage) Activo'}
              </div>
              <p>
                {isConfigured 
                  ? 'Los cambios se están sincronizando en tiempo real con tu base de datos PostgreSQL en Supabase.'
                  : 'Actualmente la demo funciona al 100% de manera local sin necesidad de base de datos externa. Ingresa tus credenciales a continuación si deseas conectarla.'}
              </p>
            </div>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleSaveCredentials} className="space-y-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Credenciales de Conexión
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Supabase Project URL
              </label>
              <input
                type="url"
                placeholder="https://xxx.supabase.co"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                className="w-full text-xs py-2 px-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Supabase Anon Key
              </label>
              <input
                type="password"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                className="w-full text-xs py-2 px-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {isConfigured ? (
                <button
                  type="button"
                  onClick={handleClearCredentials}
                  className="text-xs text-rose-600 hover:text-rose-700 font-medium underline"
                >
                  Desconectar y Volver a Modo Mock
                </button>
              ) : <span />}

              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-sm transition-all"
              >
                Guardar y Conectar
              </button>
            </div>
          </form>

          {/* SQL Script Box */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center">
                <Terminal className="w-4 h-4 mr-1.5 text-emerald-500" />
                Script SQL de Creación de Tablas
              </span>
              <button
                onClick={handleCopySql}
                className="flex items-center space-x-1 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '¡Copiado!' : 'Copiar SQL'}</span>
              </button>
            </div>

            <div className="relative">
              <pre className="bg-slate-950 text-emerald-400 font-mono text-[11px] p-4 rounded-xl overflow-x-auto max-h-60 border border-slate-800">
                {sqlScript}
              </pre>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
