'use client';

import React from 'react';
import { ActiveModule } from '@/types';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';
import { 
  Package, 
  Users, 
  Database, 
  Sun, 
  Moon, 
  Grid, 
  CheckCircle2, 
  AlertCircle,
  LogOut
} from 'lucide-react';

interface OdooHeaderProps {
  activeModule: ActiveModule;
  setActiveModule: (module: ActiveModule) => void;
  onOpenSupabaseModal: () => void;
}

export const OdooHeader: React.FC<OdooHeaderProps> = ({
  activeModule,
  setActiveModule,
  onOpenSupabaseModal
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const supabaseActive = isSupabaseConfigured();

  return (
    <header className="bg-odoo-purple text-white shadow-md select-none sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between h-14">
        
        {/* Lado Izquierdo: App Switcher Odoo & Modulo Activo */}
        <div className="flex items-center space-x-3">
          <button 
            title="Odoo App Switcher"
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center text-white"
          >
            <Grid className="w-5 h-5" />
          </button>

          <div className="h-5 w-[1px] bg-white/20 hidden sm:block" />

          {/* Odoo Logo / Brand */}
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg tracking-wide text-white">odoo</span>
            <span className="bg-white/20 text-white text-xs font-semibold px-2 py-0.5 rounded-md">
              Enterprise 17.0
            </span>
          </div>

          {/* Breadcrumbs de Navegación */}
          <div className="hidden md:flex items-center space-x-1 text-sm text-purple-100 font-medium">
            <span>/</span>
            <span className="text-white font-semibold">
              {activeModule === 'products' && 'Inventario / Productos'}
              {activeModule === 'clients' && 'CRM / Clientes'}
              {activeModule === 'supabase_setup' && 'Ajustes / Conector Supabase'}
            </span>
          </div>
        </div>

        {/* Centro: Modulos Tabs (Productos / Clientes / Supabase) */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => setActiveModule('products')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
              activeModule === 'products'
                ? 'bg-white/25 text-white font-bold shadow-inner'
                : 'text-purple-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Catálogo</span>
          </button>

          <button
            onClick={() => setActiveModule('clients')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${
              activeModule === 'clients'
                ? 'bg-white/25 text-white font-bold shadow-inner'
                : 'text-purple-100 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Clientes</span>
          </button>
        </nav>

        {/* Lado Derecho: Estado Supabase + DarkMode + User Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Badge de Estado Supabase */}
          <button
            onClick={onOpenSupabaseModal}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
              supabaseActive
                ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200 hover:bg-emerald-500/30'
                : 'bg-amber-500/20 border-amber-400/40 text-amber-200 hover:bg-amber-500/30'
            }`}
            title="Haga clic para ver el estado de la conexión a Supabase y el script SQL"
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">
              {supabaseActive ? 'Supabase Conectado' : 'Modo Mock (LocalStorage)'}
            </span>
            {supabaseActive ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            ) : (
              <AlertCircle className="w-3.5 h-3.5 text-amber-300" />
            )}
          </button>

          {/* Toggle Modo Oscuro / Claro */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-purple-100 hover:text-white"
            title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Usuario Mitchell Admin */}
          {user && (
            <div className="flex items-center space-x-2 pl-2 border-l border-white/20">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-white/30"
              />
              <span className="hidden sm:inline text-xs font-medium text-white max-w-[100px] truncate">
                {user.name}
              </span>
              <button
                onClick={logout}
                title="Cerrar sesión simulada"
                className="p-1 hover:bg-white/10 rounded text-purple-200 hover:text-white"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
