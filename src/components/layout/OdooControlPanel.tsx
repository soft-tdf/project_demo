'use client';

import React from 'react';
import { ViewMode, FilterOptions, ActiveModule } from '@/types';
import { 
  Plus, 
  Search, 
  LayoutGrid, 
  List, 
  Filter, 
  ArrowUpDown,
  X
} from 'lucide-react';

interface OdooControlPanelProps {
  activeModule: ActiveModule;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  totalCount: number;
  onNewItemClick: () => void;
  categories: string[];
}

export const OdooControlPanel: React.FC<OdooControlPanelProps> = ({
  activeModule,
  viewMode,
  setViewMode,
  filters,
  setFilters,
  totalCount,
  onNewItemClick,
  categories
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  const clearSearch = () => {
    setFilters(prev => ({ ...prev, searchQuery: '' }));
  };

  return (
    <div className="bg-white dark:bg-odoo-panel-dark border-b border-gray-200 dark:border-odoo-border-dark px-4 sm:px-6 py-3 sticky top-14 z-20 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Lado Izquierdo: Botón Acción "Nuevo" & Título Módulo */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onNewItemClick}
            className="flex items-center space-x-1.5 bg-odoo-purple hover:bg-odoo-purple-dark text-white font-medium px-4 py-2 rounded-lg text-sm transition-all shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo {activeModule === 'products' ? 'Producto' : 'Cliente'}</span>
          </button>

          <div className="h-6 w-[1px] bg-gray-300 dark:bg-gray-700 hidden sm:block" />

          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-tight">
            {activeModule === 'products' ? 'Productos' : 'Directorio de Clientes'}
          </h1>
        </div>

        {/* Centro: Omnibar Odoo con Buscador + Filtros integrados */}
        <div className="flex-1 max-w-xl">
          <div className="relative flex items-center bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-odoo-purple focus-within:border-transparent transition-all">
            <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={handleSearchChange}
              placeholder={
                activeModule === 'products'
                  ? 'Buscar por nombre, SKU o categoría...'
                  : 'Buscar cliente por nombre, empresa o email...'
              }
              className="bg-transparent border-none outline-none w-full text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400"
            />
            {filters.searchQuery && (
              <button
                onClick={clearSearch}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Lado Derecho: Filtros Rápidos, Ordenamiento, Paginación y Switcher Kanban/Lista */}
        <div className="flex items-center flex-wrap sm:flex-nowrap justify-end gap-2 text-xs sm:text-sm">
          
          {/* Filtro por Estado */}
          <div className="flex items-center space-x-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <select
              value={filters.statusFilter}
              onChange={(e) => setFilters(prev => ({ ...prev, statusFilter: e.target.value }))}
              className="bg-transparent border-none outline-none text-xs text-gray-700 dark:text-gray-200 font-medium cursor-pointer"
            >
              <option value="all">Todos los estados</option>
              {activeModule === 'products' ? (
                <>
                  <option value="active">Disponible / Activo</option>
                  <option value="out_of_stock">Agotado</option>
                  <option value="draft">Borrador</option>
                </>
              ) : (
                <>
                  <option value="active">Cliente Activo</option>
                  <option value="lead">Prospecto / Lead</option>
                  <option value="inactive">Inactivo</option>
                </>
              )}
            </select>
          </div>

          {/* Filtro por Categoría (Sólo productos) */}
          {activeModule === 'products' && (
            <div className="hidden lg:flex items-center space-x-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1">
              <select
                value={filters.categoryFilter}
                onChange={(e) => setFilters(prev => ({ ...prev, categoryFilter: e.target.value }))}
                className="bg-transparent border-none outline-none text-xs text-gray-700 dark:text-gray-200 font-medium cursor-pointer"
              >
                <option value="all">Todas las categorías</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}

          {/* Ordenamiento */}
          <div className="flex items-center space-x-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-transparent border-none outline-none text-xs text-gray-700 dark:text-gray-200 font-medium cursor-pointer"
            >
              <option value="newest">Más recientes</option>
              <option value="name">Nombre A-Z</option>
              <option value="price_desc">Mayor Precio / Facturación</option>
              <option value="price_asc">Menor Precio</option>
              {activeModule === 'products' && <option value="stock">Mayor Stock</option>}
            </select>
          </div>

          {/* Contador de Registros Estilo Odoo */}
          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono px-2">
            1-{totalCount} / {totalCount}
          </div>

          {/* Botones de Vista Dual Odoo (Kanban vs List) */}
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-0.5 rounded-lg border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-gray-700 text-odoo-purple dark:text-white shadow-sm font-semibold'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              title="Vista Kanban (Tarjetas con Imágenes)"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>

            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-gray-700 text-odoo-purple dark:text-white shadow-sm font-semibold'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              title="Vista de Lista (Tabla Scannable)"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
