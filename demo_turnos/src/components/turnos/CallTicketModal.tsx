'use client';

import React, { useState } from 'react';
import { Ticket, Counter } from '@/types';
import { Megaphone, X, Building2, UserCheck, ArrowRight } from 'lucide-react';

interface CallTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetTicket?: Ticket | null;
  waitingTickets: Ticket[];
  counters: Counter[];
  onConfirmCall: (ticketId: string, counterId: string) => void;
}

export const CallTicketModal: React.FC<CallTicketModalProps> = ({
  isOpen,
  onClose,
  targetTicket,
  waitingTickets,
  counters,
  onConfirmCall,
}) => {
  const [selectedTicketId, setSelectedTicketId] = useState<string>(
    targetTicket ? targetTicket.id : (waitingTickets[0]?.id || '')
  );
  const [selectedCounterId, setSelectedCounterId] = useState<string>(
    counters[0]?.id || 'v-1'
  );

  if (!isOpen) return null;

  const handleCall = () => {
    const ticketToCall = targetTicket ? targetTicket.id : selectedTicketId;
    if (!ticketToCall || !selectedCounterId) return;

    onConfirmCall(ticketToCall, selectedCounterId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="bg-emerald-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-white/10 rounded-lg">
              <Megaphone className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Consola de Llamada a Ventanilla</h2>
              <p className="text-xs text-white/80">Llamar cliente y asignar puesto de atención</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          
          {/* Selected Ticket Preview */}
          {targetTicket ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-xl p-4 text-center">
              <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold uppercase tracking-wider block mb-1">
                Turno Seleccionado
              </span>
              <div className="text-3xl font-black text-emerald-700 dark:text-emerald-300 font-mono">
                {targetTicket.code}
              </div>
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                {targetTicket.customerName}
              </div>
              <div className="text-xs text-slate-500 font-mono">
                DNI: {targetTicket.customerDni}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Seleccionar Turno en Espera ({waitingTickets.length})
              </label>
              {waitingTickets.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400 border border-dashed rounded-xl">
                  No hay turnos pendientes en espera
                </div>
              ) : (
                <select
                  value={selectedTicketId}
                  onChange={(e) => setSelectedTicketId(e.target.value)}
                  className="w-full text-sm py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  {waitingTickets.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.code} - {t.customerName} ({t.priority.toUpperCase()})
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {/* Counter Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Asignar Ventanilla de Atención *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {counters.map((cnt) => (
                <button
                  key={cnt.id}
                  type="button"
                  onClick={() => setSelectedCounterId(cnt.id)}
                  className={`p-3 text-left rounded-xl border transition-all text-xs font-medium ${
                    selectedCounterId === cnt.id
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 font-bold shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 font-bold mb-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{cnt.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center">
                    <UserCheck className="w-3 h-3 mr-1" />
                    <span className="truncate">{cnt.operatorName}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleCall}
              disabled={!targetTicket && waitingTickets.length === 0}
              className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-5 py-2 rounded-xl font-bold text-xs shadow-md transition-all active:scale-[0.98]"
            >
              <Megaphone className="w-4 h-4" />
              <span>Confirmar Llamado</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
