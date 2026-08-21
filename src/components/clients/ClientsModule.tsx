'use client';

import React from 'react';
import { Client, ViewMode } from '@/types';
import { 
  Users, 
  Building2, 
  Mail, 
  Phone, 
  DollarSign, 
  UserCheck, 
  TrendingUp,
  Edit3,
  Trash2
} from 'lucide-react';

interface ClientsModuleProps {
  clients: Client[];
  viewMode: ViewMode;
  onEdit: (client: Client) => void;
  onDelete: (id: string) => void;
}

export const ClientsModule: React.FC<ClientsModuleProps> = ({
  clients,
  viewMode,
  onEdit,
  onDelete
}) => {
  // Métricas rápidas
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const totalBilling = clients.reduce((acc, c) => acc + (c.total_purchases || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* 3 Tarjetas Métricas KPI estilo Odoo CRM */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* KPI 1: Total Clientes */}
        <div className="bg-white dark:bg-odoo-panel-dark p-5 rounded-xl border border-gray-200 dark:border-odoo-border-dark flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wider">
              Total Clientes CRM
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
              {totalClients}
            </div>
          </div>
          <div className="p-3 bg-purple-100 dark:bg-purple-950/60 text-odoo-purple dark:text-purple-300 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 2: Clientes Activos */}
        <div className="bg-white dark:bg-odoo-panel-dark p-5 rounded-xl border border-gray-200 dark:border-odoo-border-dark flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wider">
              Clientes Activos
            </div>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              {activeClients}
            </div>
          </div>
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 rounded-xl">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        {/* KPI 3: Facturación Acumulada */}
        <div className="bg-white dark:bg-odoo-panel-dark p-5 rounded-xl border border-gray-200 dark:border-odoo-border-dark flex items-center justify-between shadow-sm">
          <div>
            <div className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wider">
              Facturación Acumulada
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
              ${totalBilling.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

      </div>

      {clients.length === 0 ? (
        <div className="bg-white dark:bg-odoo-panel-dark rounded-xl p-12 text-center border border-gray-200 dark:border-odoo-border-dark">
          <p className="text-gray-500 dark:text-gray-400 text-sm">No hay clientes que coincidan con la búsqueda.</p>
        </div>
      ) : viewMode === 'kanban' ? (
        
        /* Vista Kanban Tarjetas Clientes */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((c) => (
            <div 
              key={c.id} 
              className="bg-white dark:bg-odoo-panel-dark p-5 rounded-xl border border-gray-200 dark:border-odoo-border-dark hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={c.avatar_url || 'https://via.placeholder.com/150'}
                      alt={c.full_name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-odoo-purple/20"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base group-hover:text-odoo-purple dark:group-hover:text-purple-300 transition-colors">
                        {c.full_name}
                      </h3>
                      <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{c.company}</span>
                      </div>
                    </div>
                  </div>

                  {c.status === 'active' && (
                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Activo
                    </span>
                  )}
                  {c.status === 'lead' && (
                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Lead
                    </span>
                  )}
                  {c.status === 'inactive' && (
                    <span className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Inactivo
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-2 text-xs text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span className="truncate">{c.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>{c.phone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Facturación Acumulada</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    ${c.total_purchases.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onEdit(c)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-odoo-purple dark:text-purple-300"
                    title="Editar cliente"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(c.id)}
                    className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded text-rose-600 dark:text-rose-400"
                    title="Borrar cliente"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (

        /* Vista Lista Tabla Clientes */
        <div className="bg-white dark:bg-odoo-panel-dark rounded-xl border border-gray-200 dark:border-odoo-border-dark overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 uppercase text-[11px] font-semibold tracking-wider border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="py-3 px-4">Cliente</th>
                  <th className="py-3 px-4">Empresa</th>
                  <th className="py-3 px-4">Contacto</th>
                  <th className="py-3 px-4 text-right">Facturado ($)</th>
                  <th className="py-3 px-4 text-center">Estado</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {clients.map((c) => (
                  <tr key={c.id} className="hover:bg-purple-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={c.avatar_url || 'https://via.placeholder.com/150'}
                          alt={c.full_name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="font-bold text-gray-900 dark:text-gray-100">{c.full_name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-700 dark:text-gray-300">{c.company}</td>
                    <td className="py-3 px-4 text-xs text-gray-500 dark:text-gray-400">
                      <div>{c.email}</div>
                      <div>{c.phone}</div>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-gray-900 dark:text-gray-100">
                      ${c.total_purchases.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {c.status === 'active' && (
                        <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Activo
                        </span>
                      )}
                      {c.status === 'lead' && (
                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Lead
                        </span>
                      )}
                      {c.status === 'inactive' && (
                        <span className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => onEdit(c)}
                          className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(c.id)}
                          className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded text-rose-600 dark:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      )}
    </div>
  );
};
