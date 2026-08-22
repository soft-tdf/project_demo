'use client';

import React from 'react';
import { Ticket, TicketStatus, Priority } from '@/types';
import { SERVICE_CATEGORIES } from '@/services/dataService';
import { 
  Clock, 
  User, 
  Building2, 
  CheckCircle2, 
  UserX, 
  Megaphone,
  AlertCircle,
  Sparkles
} from 'lucide-react';

interface TicketKanbanProps {
  tickets: Ticket[];
  onCallTicket: (ticket: Ticket) => void;
  onCompleteTicket: (ticketId: string) => void;
  onAbsentTicket: (ticketId: string) => void;
}

const getPriorityBadge = (priority: Priority) => {
  switch (priority) {
    case 'urgent':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
          <AlertCircle className="w-3 h-3 mr-0.5" /> URGENTE
        </span>
      );
    case 'preferential':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
          <Sparkles className="w-3 h-3 mr-0.5" /> PREFERENCIAL
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          NORMAL
        </span>
      );
  }
};

export const TicketKanban: React.FC<TicketKanbanProps> = ({
  tickets,
  onCallTicket,
  onCompleteTicket,
  onAbsentTicket,
}) => {
  const columns: { id: TicketStatus; title: string; color: string; border: string; bg: string }[] = [
    { id: 'waiting', title: 'En Espera', color: 'text-amber-700 dark:text-amber-300', border: 'border-amber-300 dark:border-amber-800', bg: 'bg-amber-500/10' },
    { id: 'in_progress', title: 'En Atención', color: 'text-blue-700 dark:text-blue-300', border: 'border-blue-300 dark:border-blue-800', bg: 'bg-blue-500/10' },
    { id: 'completed', title: 'Completados', color: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-300 dark:border-emerald-800', bg: 'bg-emerald-500/10' },
    { id: 'absent', title: 'Ausentes / Cancelados', color: 'text-slate-600 dark:text-slate-400', border: 'border-slate-300 dark:border-slate-800', bg: 'bg-slate-500/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[500px]">
      {columns.map((col) => {
        const colTickets = tickets.filter(t => t.status === col.id || (col.id === 'absent' && t.status === 'cancelled'));

        return (
          <div 
            key={col.id}
            className="flex flex-col bg-slate-100/70 dark:bg-slate-900/60 rounded-xl p-3 border border-slate-200 dark:border-slate-800"
          >
            {/* Column Header */}
            <div className={`flex items-center justify-between p-3 rounded-lg border mb-3 ${col.bg} ${col.border}`}>
              <h3 className={`font-semibold text-sm ${col.color}`}>{col.title}</h3>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-800 shadow-sm ${col.color}`}>
                {colTickets.length}
              </span>
            </div>

            {/* Column Content */}
            <div className="flex-1 space-y-3 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
              {colTickets.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                  Sin turnos en este estado
                </div>
              ) : (
                colTickets.map((ticket) => {
                  const catInfo = SERVICE_CATEGORIES.find(c => c.id === ticket.serviceCategory);

                  return (
                    <div
                      key={ticket.id}
                      className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group"
                    >
                      {/* Ticket Code & Priority */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-black tracking-tight text-[#714B67] dark:text-purple-300 font-mono">
                          {ticket.code}
                        </span>
                        {getPriorityBadge(ticket.priority)}
                      </div>

                      {/* Customer Info */}
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center text-xs font-semibold text-slate-800 dark:text-slate-200">
                          <User className="w-3.5 h-3.5 mr-1.5 text-slate-400 shrink-0" />
                          <span className="truncate">{ticket.customerName}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono pl-5">
                          DNI/RUT: {ticket.customerDni}
                        </div>
                      </div>

                      {/* Category Pill & Counter info */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-3 text-[11px]">
                        <span className={`px-2 py-0.5 rounded-full font-medium text-white ${catInfo?.colorClass || 'bg-slate-600'}`}>
                          {catInfo?.name || ticket.serviceCategory}
                        </span>
                        {ticket.counterName && (
                          <span className="flex items-center px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                            <Building2 className="w-3 h-3 mr-1 text-slate-500" />
                            {ticket.counterName}
                          </span>
                        )}
                      </div>

                      {/* Time Details */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 dark:border-slate-700/60 pt-2 mb-3">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {ticket.operatorName && (
                          <span className="truncate max-w-[120px]">
                            Op: {ticket.operatorName}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-end space-x-1.5 pt-1">
                        {ticket.status === 'waiting' && (
                          <button
                            onClick={() => onCallTicket(ticket)}
                            className="w-full flex items-center justify-center space-x-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors shadow-sm"
                          >
                            <Megaphone className="w-3.5 h-3.5" />
                            <span>Llamar</span>
                          </button>
                        )}

                        {ticket.status === 'in_progress' && (
                          <>
                            <button
                              onClick={() => onCompleteTicket(ticket.id)}
                              className="flex-1 flex items-center justify-center space-x-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors"
                              title="Marcar atención como completada"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Completar</span>
                            </button>
                            <button
                              onClick={() => onAbsentTicket(ticket.id)}
                              className="p-1.5 bg-rose-100 hover:bg-rose-200 dark:bg-rose-950 text-rose-700 dark:text-rose-300 rounded-lg text-xs transition-colors"
                              title="Marcar como ausente"
                            >
                              <UserX className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}

                        {(ticket.status === 'completed' || ticket.status === 'absent') && (
                          <button
                            onClick={() => onCallTicket(ticket)}
                            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline"
                          >
                            Re-llamar
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
