'use client';

import React from 'react';
import { Ticket } from '@/types';
import { SERVICE_CATEGORIES } from '@/services/dataService';
import { 
  Megaphone, 
  CheckCircle2, 
  UserX, 
  Clock, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

interface TicketListProps {
  tickets: Ticket[];
  onCallTicket: (ticket: Ticket) => void;
  onCompleteTicket: (ticketId: string) => void;
  onAbsentTicket: (ticketId: string) => void;
}

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  onCallTicket,
  onCompleteTicket,
  onAbsentTicket,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Código Turno</th>
              <th className="py-3 px-4">Cliente / DNI</th>
              <th className="py-3 px-4">Área de Servicio</th>
              <th className="py-3 px-4">Prioridad</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4">Ventanilla & Operador</th>
              <th className="py-3 px-4">Hora Emisión</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12 text-slate-400">
                  No se encontraron turnos con los filtros seleccionados
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => {
                const catInfo = SERVICE_CATEGORIES.find(c => c.id === ticket.serviceCategory);

                return (
                  <tr key={ticket.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                    
                    {/* Código */}
                    <td className="py-3 px-4 font-mono font-bold text-[#714B67] dark:text-purple-300 text-sm">
                      {ticket.code}
                    </td>

                    {/* Cliente */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{ticket.customerName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">DNI: {ticket.customerDni}</div>
                    </td>

                    {/* Servicio */}
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-white text-[11px] ${catInfo?.colorClass || 'bg-slate-600'}`}>
                        {catInfo?.name || ticket.serviceCategory}
                      </span>
                    </td>

                    {/* Prioridad */}
                    <td className="py-3 px-4">
                      {ticket.priority === 'urgent' && (
                        <span className="inline-flex items-center text-rose-600 dark:text-rose-400 font-bold">
                          <AlertCircle className="w-3.5 h-3.5 mr-1" /> URGENTE
                        </span>
                      )}
                      {ticket.priority === 'preferential' && (
                        <span className="inline-flex items-center text-amber-600 dark:text-amber-400 font-bold">
                          <Sparkles className="w-3.5 h-3.5 mr-1" /> PREFERENCIAL
                        </span>
                      )}
                      {ticket.priority === 'normal' && (
                        <span className="text-slate-500">NORMAL</span>
                      )}
                    </td>

                    {/* Estado */}
                    <td className="py-3 px-4">
                      {ticket.status === 'waiting' && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold">
                          Esperando
                        </span>
                      )}
                      {ticket.status === 'in_progress' && (
                        <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold animate-pulse">
                          En Atención
                        </span>
                      )}
                      {ticket.status === 'completed' && (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                          Completado
                        </span>
                      )}
                      {ticket.status === 'absent' && (
                        <span className="px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold">
                          Ausente
                        </span>
                      )}
                    </td>

                    {/* Ventanilla */}
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                      {ticket.counterName ? (
                        <div>
                          <div className="font-semibold">{ticket.counterName}</div>
                          <div className="text-[10px] text-slate-400">{ticket.operatorName}</div>
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">No asignada</span>
                      )}
                    </td>

                    {/* Hora */}
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1 text-slate-400" />
                        {new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    {/* Acciones */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {ticket.status === 'waiting' && (
                          <button
                            onClick={() => onCallTicket(ticket)}
                            className="flex items-center space-x-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
                          >
                            <Megaphone className="w-3.5 h-3.5" />
                            <span>Llamar</span>
                          </button>
                        )}
                        {ticket.status === 'in_progress' && (
                          <>
                            <button
                              onClick={() => onCompleteTicket(ticket.id)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" /> OK
                            </button>
                            <button
                              onClick={() => onAbsentTicket(ticket.id)}
                              className="px-2 py-1 bg-rose-100 hover:bg-rose-200 dark:bg-rose-950 text-rose-700 dark:text-rose-300 rounded-lg"
                            >
                              <UserX className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
