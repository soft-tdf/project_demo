'use client';

import React, { useState } from 'react';
import { isSupabaseConfigured, SUPABASE_SCHEMA_SQL } from '@/lib/supabase';
import { 
  X, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Terminal, 
  ExternalLink,
  Zap
} from 'lucide-react';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const isConfigured = isSupabaseConfigured();

  if (!isOpen) return null;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-odoo-panel-dark rounded-xl max-w-2xl w-full border border-gray-200 dark:border-odoo-border-dark shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-odoo-purple text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5" />
            <h2 className="font-bold text-lg">Conexión a Supabase (PostgreSQL)</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Status Box */}
          <div className={`p-4 rounded-xl border flex items-start space-x-3 ${
            isConfigured 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
          }`}>
            {isConfigured ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <h3 className="font-bold text-sm">
                {isConfigured ? 'Supabase Activo y Conectado' : 'Modo Demo Activo (LocalStorage en memoria)'}
              </h3>
              <p className="text-xs mt-1 leading-relaxed opacity-90">
                {isConfigured 
                  ? 'La aplicación está leyendo y escribiendo directamente en tu base de datos de PostgreSQL en Supabase.'
                  : 'Actualmente el MVP está operando con almacenamiento local reactivo y datos de prueba precargados. Puedes migrarlo a tu proyecto de Supabase en cualquier momento añadiendo tus llaves en `.env.local`.'}
              </p>
            </div>
          </div>

          {/* Instrucciones de Variables de Entorno */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-odoo-purple dark:text-purple-400" />
              Paso 1: Variables de Entorno en `.env.local`
            </h4>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-xs overflow-x-auto select-all">
              <code>
                NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co<br />
                NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
              </code>
            </div>
          </div>

          {/* Script SQL para Supabase SQL Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Paso 2: Ejecutar Script SQL en Supabase Editor
              </h4>
              <button
                onClick={handleCopySql}
                className="flex items-center space-x-1 text-xs bg-odoo-purple hover:bg-odoo-purple-dark text-white font-medium px-3 py-1 rounded transition-colors shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '¡Copiado!' : 'Copiar SQL'}</span>
              </button>
            </div>

            <div className="bg-gray-900 text-emerald-400 p-4 rounded-lg font-mono text-xs overflow-x-auto max-h-52 select-all border border-gray-800">
              <pre>{SUPABASE_SCHEMA_SQL}</pre>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <a
            href="https://supabase.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-xs text-odoo-purple dark:text-purple-300 font-semibold hover:underline"
          >
            <span>Ir a Supabase Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-medium px-4 py-1.5 rounded-lg text-sm transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
