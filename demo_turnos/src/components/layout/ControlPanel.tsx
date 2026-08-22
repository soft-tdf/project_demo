'use client';

import React from 'react';
import { 
  Plus, 
  Megaphone, 
  Tv, 
  Search, 
  Kanban, 
  List, 
  Filter,
  Users,
  CheckCircle2,
  Clock,
  UserX
} from 'lucide-react';
import { TicketFilterState, TicketStatus, ServiceCategory } from '@/types';
import { SERVICE_CATEGORIES } from '@/services/dataService';

interface ControlPanelProps {
  filters: TicketFilterState;
  onFilterChange: (filters: Partial<TicketFilterState>) => void;
  onOpenNewTicketModal: () => void;
  onOpenCallModal: () => void;
  onOpenTVDisplayModal: () => void;
  waitingCount: number;
  inProgressCount: number;
  completedCount: number;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  filters,
  onFilterChange,
  onOpenNewTicketModal,
  onOpenCallModal,
  onOpenTVDisplayModal,
  waitingCount,
  inProgressCount,
  completedCount,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-14 z-30 px-4 py-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Top / Left: Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenNewTicketModal}
            className="flex items-center space-x-1.5 bg-[#714B67] hover:bg-[#54374D] text-white px-3.5 py-2 rounded-lg font-medium text-sm shadow-sm transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Emitir Turno (Kiosco)</span>
          </button>

          <button
            onClick={onOpenCallModal}
            className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-lg font-medium text-sm shadow-sm transition-all active:scale-[0.98]"
          >
            <Megaphone className="w-4 h-4" />
            <span>Llamar a Ventanilla</span>
          </button>

          <button
            onClick={onOpenTVDisplayModal}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 text-amber-300 px-3.5 py-2 rounded-lg font-medium text-sm shadow-sm transition-all border border-slate-700"
          >
            <Tv className="w-4 h-4 text-amber-400" />
            <span>Pantalla TV Display</span>
          </button>
        </div>

        {/* Middle / Right: Omnibar Search & Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-grow max-w-2xl">
          
          {/* Omnibar Search */}
          <div className="relative flex-grow">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Buscar por código (ATC-001), cliente o DNI..."
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#714B67] dark:focus:ring-purple-500 transition-colors"
            />
          </div>

          {/* Service Category Dropdown */}
          <div className="relative min-w-[150px]">
            <select
              value={filters.serviceFilter}
              onChange={(e) => onFilterChange({ serviceFilter: e.target.value as ServiceCategory | 'all' })}
              className="w-full text-xs py-2 px-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#714B67] text-slate-700 dark:text-slate-300 font-medium"
            >
              <option value="all">Todas las Áreas</option>
              {SERVICE_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 self-end sm:self-auto">
            <button
              onClick={() => onFilterChange({ viewMode: 'kanban' })}
              className={`p-1.5 rounded-md transition-all ${
                filters.viewMode === 'kanban' 
                  ? 'bg-white dark:bg-slate-700 text-[#714B67] dark:text-purple-300 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Vista Tablero Kanban"
            >
              <Kanban className="w-4 h-4" />
            </button>
            <button
              onClick={() => onFilterChange({ viewMode: 'list' })}
              className={`p-1.5 rounded-md transition-all ${
                filters.viewMode === 'list' 
                  ? 'bg-white dark:bg-slate-700 text-[#714B67] dark:text-purple-300 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Vista Lista de Tabla"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Filter Status Chips Bar */}
      <div className="max-w-7xl mx-auto mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-medium flex items-center mr-1">
          <Filter className="w-3 h-3 mr-1" /> Estado:
        </span>

        <button
          onClick={() => onFilterChange({ statusFilter: 'all' })}
          className={`px-2.5 py-1 rounded-full font-medium transition-all ${
            filters.statusFilter === 'all'
              ? 'bg-[#714B67] text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          Todos los Turnos
        </button>

        <button
          onClick={() => onFilterChange({ statusFilter: 'waiting' })}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full font-medium transition-all ${
            filters.statusFilter === 'waiting'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 hover:bg-amber-100'
          }`}
        >
          <Clock className="w-3 h-3" />
          <span>En Espera ({waitingCount})</span>
        </button>

        <button
          onClick={() => onFilterChange({ statusFilter: 'in_progress' })}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full font-medium transition-all ${
            filters.statusFilter === 'in_progress'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50 hover:bg-blue-100'
          }`}
        >
          <Users className="w-3 h-3" />
          <span>En Atención ({inProgressCount})</span>
        </button>

        <button
          onClick={() => onFilterChange({ statusFilter: 'completed' })}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full font-medium transition-all ${
            filters.statusFilter === 'completed'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-100'
          }`}
        >
          <CheckCircle2 className="w-3 h-3" />
          <span>Completados ({completedCount})</span>
        </button>

        <button
          onClick={() => onFilterChange({ statusFilter: 'absent' })}
          className={`flex items-center space-x-1 px-2.5 py-1 rounded-full font-medium transition-all ${
            filters.statusFilter === 'absent'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100'
          }`}
        >
          <UserX className="w-3 h-3" />
          <span>Ausentes</span>
        </button>
      </div>
    </div>
  );
};
