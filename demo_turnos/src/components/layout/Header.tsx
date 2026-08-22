'use client';

import React from 'react';
import { 
  LayoutGrid, 
  Database, 
  Sun, 
  Moon, 
  Ticket as TicketIcon,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  isSupabaseConnected: boolean;
  onOpenSupabaseModal: () => void;
  onResetSeedData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isSupabaseConnected,
  onOpenSupabaseModal,
  onResetSeedData,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="bg-[#714B67] text-white shadow-md select-none sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Left: App Switcher & Navigation */}
          <div className="flex items-center space-x-3">
            <button 
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-white/90 hover:text-white"
              title="Odoo App Switcher"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>

            <div className="h-4 w-px bg-white/20" />

            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center font-bold text-white shadow-sm">
                <TicketIcon className="w-4 h-4 text-amber-300" />
              </div>
              <div className="flex items-center text-sm font-semibold tracking-wide">
                <span>Gestión de Turnos</span>
                <ChevronRight className="w-4 h-4 text-white/50 mx-1" />
                <span className="text-amber-200 font-medium">Control de Filas & Ventanillas</span>
              </div>
            </div>
          </div>

          {/* Right: Actions, Database Mode & Profile */}
          <div className="flex items-center space-x-3">
            
            {/* Reset Data Button */}
            <button
              onClick={onResetSeedData}
              className="hidden sm:flex items-center space-x-1.5 text-xs bg-white/10 hover:bg-white/20 text-white px-2.5 py-1.5 rounded-md transition-all border border-white/10"
              title="Restablecer datos semilla demo"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Demo</span>
            </button>

            {/* Supabase Status Indicator */}
            <button
              onClick={onOpenSupabaseModal}
              className={`flex items-center space-x-1.5 text-xs px-2.5 py-1 rounded-full font-medium transition-all shadow-sm ${
                isSupabaseConnected 
                  ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 hover:bg-emerald-500/30' 
                  : 'bg-amber-500/20 text-amber-200 border border-amber-400/40 hover:bg-amber-500/30'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>{isSupabaseConnected ? 'Supabase Activo' : 'Modo Mock (Local)'}</span>
              <SlidersHorizontal className="w-3 h-3 ml-0.5 opacity-70" />
            </button>

            <div className="h-4 w-px bg-white/20" />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-white/80 hover:text-white"
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Profile */}
            <div className="flex items-center space-x-2 pl-2 border-l border-white/20">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full ring-2 ring-white/30 object-cover"
              />
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold leading-tight">{user.name}</span>
                <span className="text-[10px] text-white/70 leading-tight">{user.activeCounterName}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
