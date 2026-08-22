'use client';

import React, { useEffect, useState } from 'react';
import { Ticket } from '@/types';
import { Tv, Volume2, X, ArrowRight, Building2, Sparkles } from 'lucide-react';

interface TVDisplayModalProps {
  isOpen: boolean;
  onClose: () => void;
  calledTickets: Ticket[];
  waitingTicketsCount: number;
}

export const TVDisplayModal: React.FC<TVDisplayModalProps> = ({
  isOpen,
  onClose,
  calledTickets,
  waitingTicketsCount,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Play audio chime effect using Web Audio API when modal opens or calledTickets update
  useEffect(() => {
    if (!isOpen || !soundEnabled) return;

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const now = ctx.currentTime;
      
      // Chime note 1 (E5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.5);

      // Chime note 2 (A5)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.2);
      gain2.gain.setValueAtTime(0.3, now + 0.2);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.2);
      osc2.stop(now + 0.9);

    } catch {
      // Ignore audio autoplay restrictions
    }
  }, [isOpen, calledTickets.length, soundEnabled]);

  if (!isOpen) return null;

  const currentCall = calledTickets[0]; // Most recent called ticket
  const previousCalls = calledTickets.slice(1, 5);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white overflow-hidden animate-fadeIn select-none">
      
      {/* Top Banner */}
      <div className="bg-[#714B67] px-6 py-4 flex items-center justify-between shadow-xl border-b border-purple-900/50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-400 text-slate-950 rounded-xl shadow-lg animate-pulse">
            <Tv className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider uppercase text-white">
              SISTEMA DE LLAMADO DE TURNOS EN VIVO
            </h1>
            <p className="text-xs text-amber-200 font-medium">
              Por favor diríjase a la ventanilla al escuchar su código
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg transition-colors border ${
              soundEnabled 
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/30' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Activar/Desactivar sonido"
          >
            <Volume2 className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700"
            title="Cerrar pantalla TV"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Screen Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 overflow-hidden">
        
        {/* Left 2 Columns: Main Highlight Banner */}
        <div className="lg:col-span-2 flex flex-col justify-between bg-slate-900/90 rounded-3xl p-8 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between z-10">
            <span className="flex items-center space-x-2 text-amber-400 font-extrabold text-sm uppercase tracking-widest bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/30">
              <Sparkles className="w-4 h-4" />
              <span>TURNO ACTUAL LLAMADO</span>
            </span>
            <span className="text-xs font-mono text-slate-400">
              {new Date().toLocaleTimeString()}
            </span>
          </div>

          {/* Huge Main Ticket Code */}
          {currentCall ? (
            <div className="my-auto py-8 text-center z-10">
              <div className="text-7xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-purple-200 font-mono drop-shadow-2xl animate-pulse-ring rounded-2xl py-2">
                {currentCall.code}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center space-x-3 bg-slate-800/90 px-6 py-3 rounded-2xl border border-slate-700">
                  <span className="text-slate-400 text-xs font-semibold uppercase">Diríjase a:</span>
                  <div className="flex items-center text-emerald-400 font-black text-2xl sm:text-3xl">
                    <Building2 className="w-7 h-7 mr-2" />
                    {currentCall.counterName || 'Ventanilla 1'}
                  </div>
                </div>

                <div className="bg-slate-800/90 px-6 py-3 rounded-2xl border border-slate-700 text-slate-300 font-medium text-sm">
                  Cliente: <span className="text-white font-bold">{currentCall.customerName}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-auto text-center text-slate-500 py-16 z-10">
              <p className="text-xl font-bold">Sin llamados activos en este momento</p>
              <p className="text-xs text-slate-600 mt-2">Los nuevos turnos llamados aparecerán en esta pantalla automáticamente</p>
            </div>
          )}

          {/* Footer Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-4 z-10">
            <span>Personas en fila de espera: <strong className="text-amber-400 font-mono text-base ml-1">{waitingTicketsCount}</strong></span>
            <span>Sistema Odoo ERP Turnos v1.0</span>
          </div>

        </div>

        {/* Right Column: History List of Recent Calls */}
        <div className="bg-slate-900/60 rounded-3xl p-6 border border-slate-800 flex flex-col">
          <h2 className="text-sm font-extrabold tracking-wider text-slate-400 uppercase mb-4 flex items-center">
            <ArrowRight className="w-4 h-4 mr-2 text-amber-400" />
            Llamados Recientes
          </h2>

          <div className="flex-1 space-y-3 overflow-y-auto pr-1">
            {previousCalls.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-500">
                Sin historial de llamados previos
              </div>
            ) : (
              previousCalls.map((t) => (
                <div key={t.id} className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/70 flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-2xl font-black text-amber-300 font-mono block leading-none">
                      {t.code}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium truncate block max-w-[150px] mt-1">
                      {t.customerName}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/50 block">
                      {t.counterName || 'Ventanilla'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                      {t.calledAt ? new Date(t.calledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
