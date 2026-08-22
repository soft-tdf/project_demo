'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Ticket, Counter, TicketFilterState, ServiceCategory, Priority } from '@/types';
import { DataService } from '@/services/dataService';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Header } from '@/components/layout/Header';
import { ControlPanel } from '@/components/layout/ControlPanel';
import { TicketKanban } from '@/components/turnos/TicketKanban';
import { TicketList } from '@/components/turnos/TicketList';
import { NewTicketModal } from '@/components/turnos/NewTicketModal';
import { CallTicketModal } from '@/components/turnos/CallTicketModal';
import { TVDisplayModal } from '@/components/turnos/TVDisplayModal';
import { SupabaseConfigModal } from '@/components/supabase/SupabaseConfigModal';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [counters, setCounters] = useState<Counter[]>([]);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);

  // Filters State
  const [filters, setFilters] = useState<TicketFilterState>({
    searchQuery: '',
    statusFilter: 'all',
    serviceFilter: 'all',
    priorityFilter: 'all',
    viewMode: 'kanban',
  });

  // Modals State
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isTVDisplayModalOpen, setIsTVDisplayModalOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  
  const [targetTicketToCall, setTargetTicketToCall] = useState<Ticket | null>(null);

  // Initial Load
  useEffect(() => {
    setTickets(DataService.getTickets());
    setCounters(DataService.getCounters());
    setIsSupabaseConnected(isSupabaseConfigured());
  }, []);

  const handleFilterChange = (updated: Partial<TicketFilterState>) => {
    setFilters(prev => ({ ...prev, ...updated }));
  };

  // Filtered Tickets Computation
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      // Search Query Filter
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchCode = ticket.code.toLowerCase().includes(query);
        const matchName = ticket.customerName.toLowerCase().includes(query);
        const matchDni = ticket.customerDni.toLowerCase().includes(query);
        if (!matchCode && !matchName && !matchDni) return false;
      }

      // Status Filter
      if (filters.statusFilter !== 'all' && ticket.status !== filters.statusFilter) {
        return false;
      }

      // Service Filter
      if (filters.serviceFilter !== 'all' && ticket.serviceCategory !== filters.serviceFilter) {
        return false;
      }

      // Priority Filter
      if (filters.priorityFilter !== 'all' && ticket.priority !== filters.priorityFilter) {
        return false;
      }

      return true;
    });
  }, [tickets, filters]);

  // Status Counters
  const waitingTickets = useMemo(() => tickets.filter(t => t.status === 'waiting'), [tickets]);
  const inProgressTickets = useMemo(() => tickets.filter(t => t.status === 'in_progress'), [tickets]);
  const completedTickets = useMemo(() => tickets.filter(t => t.status === 'completed'), [tickets]);

  // Handlers
  const handleCreateTicket = (params: {
    customerName: string;
    customerDni: string;
    serviceCategory: ServiceCategory;
    priority: Priority;
  }) => {
    const newTicket = DataService.createTicket(params);
    setTickets(DataService.getTickets());
  };

  const handleOpenCallForTicket = (ticket: Ticket) => {
    setTargetTicketToCall(ticket);
    setIsCallModalOpen(true);
  };

  const handleConfirmCallTicket = (ticketId: string, counterId: string) => {
    DataService.callTicket(ticketId, counterId, user.name);
    setTickets(DataService.getTickets());
    setCounters(DataService.getCounters());
    setTargetTicketToCall(null);
  };

  const handleCompleteTicket = (ticketId: string) => {
    DataService.updateTicketStatus(ticketId, 'completed');
    setTickets(DataService.getTickets());
    setCounters(DataService.getCounters());
  };

  const handleAbsentTicket = (ticketId: string) => {
    DataService.updateTicketStatus(ticketId, 'absent');
    setTickets(DataService.getTickets());
    setCounters(DataService.getCounters());
  };

  const handleResetSeedData = () => {
    if (confirm('¿Deseas restablecer todos los turnos y ventanillas a sus datos semilla originales?')) {
      DataService.resetToSeedData();
      setTickets(DataService.getTickets());
      setCounters(DataService.getCounters());
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans">
      
      {/* Header */}
      <Header
        isSupabaseConnected={isSupabaseConnected}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
        onResetSeedData={handleResetSeedData}
      />

      {/* Control Panel */}
      <ControlPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onOpenNewTicketModal={() => setIsNewTicketModalOpen(true)}
        onOpenCallModal={() => {
          setTargetTicketToCall(null);
          setIsCallModalOpen(true);
        }}
        onOpenTVDisplayModal={() => setIsTVDisplayModalOpen(true)}
        waitingCount={waitingTickets.length}
        inProgressCount={inProgressTickets.length}
        completedCount={completedTickets.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filters.viewMode === 'kanban' ? (
          <TicketKanban
            tickets={filteredTickets}
            onCallTicket={handleOpenCallForTicket}
            onCompleteTicket={handleCompleteTicket}
            onAbsentTicket={handleAbsentTicket}
          />
        ) : (
          <TicketList
            tickets={filteredTickets}
            onCallTicket={handleOpenCallForTicket}
            onCompleteTicket={handleCompleteTicket}
            onAbsentTicket={handleAbsentTicket}
          />
        )}
      </main>

      {/* Modals */}
      <NewTicketModal
        isOpen={isNewTicketModalOpen}
        onClose={() => setIsNewTicketModalOpen(false)}
        onSubmit={handleCreateTicket}
      />

      <CallTicketModal
        isOpen={isCallModalOpen}
        onClose={() => {
          setIsCallModalOpen(false);
          setTargetTicketToCall(null);
        }}
        targetTicket={targetTicketToCall}
        waitingTickets={waitingTickets}
        counters={counters}
        onConfirmCall={handleConfirmCallTicket}
      />

      <TVDisplayModal
        isOpen={isTVDisplayModalOpen}
        onClose={() => setIsTVDisplayModalOpen(false)}
        calledTickets={inProgressTickets}
        waitingTicketsCount={waitingTickets.length}
      />

      <SupabaseConfigModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        isConfigured={isSupabaseConnected}
      />

    </div>
  );
}
