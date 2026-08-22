'use client';

import React, { useState } from 'react';
import { ServiceCategory, Priority } from '@/types';
import { SERVICE_CATEGORIES } from '@/services/dataService';
import { X, Ticket as TicketIcon, CheckCircle2, User, CreditCard, Sparkles } from 'lucide-react';

interface NewTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (params: {
    customerName: string;
    customerDni: string;
    serviceCategory: ServiceCategory;
    priority: Priority;
  }) => void;
}

export const NewTicketModal: React.FC<NewTicketModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerDni, setCustomerDni] = useState('');
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>('atencion_cliente');
  const [priority, setPriority] = useState<Priority>('normal');
  const [generatedTicketCode, setGeneratedTicketCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerDni.trim()) return;

    onSubmit({
      customerName,
      customerDni,
      serviceCategory,
      priority,
    });

    // Reset form
    setCustomerName('');
    setCustomerDni('');
    setServiceCategory('atencion_cliente');
    setPriority('normal');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#714B67] text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-white/10 rounded-lg">
              <TicketIcon className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Kiosco de Emisión de Turno</h2>
              <p className="text-xs text-white/80">Seleccione el servicio e ingrese sus datos</p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Customer Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Nombre Completo / Razón Social *
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ej. María Fernanda López"
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#714B67]"
              />
            </div>
          </div>

          {/* DNI / Identification */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              DNI / RUT / Pasaporte *
            </label>
            <div className="relative">
              <CreditCard className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={customerDni}
                onChange={(e) => setCustomerDni(e.target.value)}
                placeholder="Ej. 42.981.340"
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#714B67]"
              />
            </div>
          </div>

          {/* Service Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Área de Servicio *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setServiceCategory(cat.id as ServiceCategory)}
                  className={`p-3 text-left rounded-xl border transition-all text-xs font-medium ${
                    serviceCategory === cat.id
                      ? 'border-[#714B67] bg-[#714B67]/10 dark:bg-[#714B67]/20 text-[#714B67] dark:text-purple-300 font-bold shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span>{cat.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">~{cat.avgTimeMinutes}m</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Prefijo: {cat.prefix}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Priority Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Tipo de Atención / Prioridad
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPriority('normal')}
                className={`py-2 px-3 text-xs rounded-lg border font-medium transition-all ${
                  priority === 'normal'
                    ? 'bg-slate-800 text-white border-slate-800'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                Normal
              </button>

              <button
                type="button"
                onClick={() => setPriority('preferential')}
                className={`py-2 px-3 text-xs rounded-lg border font-semibold transition-all flex items-center justify-center space-x-1 ${
                  priority === 'preferential'
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-300'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Preferencial</span>
              </button>

              <button
                type="button"
                onClick={() => setPriority('urgent')}
                className={`py-2 px-3 text-xs rounded-lg border font-semibold transition-all flex items-center justify-center space-x-1 ${
                  priority === 'urgent'
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300'
                }`}
              >
                <span>Urgente</span>
              </button>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1.5 bg-[#714B67] hover:bg-[#54374D] text-white px-5 py-2 rounded-xl font-semibold text-xs shadow-md transition-all active:scale-[0.98]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Generar Ticket de Turno</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
