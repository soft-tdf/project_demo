import { Ticket, Counter, ServiceCategory, Priority, TicketStatus } from '@/types';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';

export const SERVICE_CATEGORIES = [
  { id: 'atencion_cliente', name: 'Atención al Cliente', prefix: 'ATC', colorClass: 'bg-blue-500', avgTimeMinutes: 10 },
  { id: 'caja', name: 'Caja & Pagos', prefix: 'CAJ', colorClass: 'bg-emerald-500', avgTimeMinutes: 5 },
  { id: 'soporte', name: 'Soporte Técnico', prefix: 'SOP', colorClass: 'bg-purple-500', avgTimeMinutes: 15 },
  { id: 'reclamos', name: 'Reclamos & Gestiones', prefix: 'REC', colorClass: 'bg-amber-500', avgTimeMinutes: 12 },
  { id: 'consultoria', name: 'Consultoría ERP', prefix: 'ERP', colorClass: 'bg-indigo-500', avgTimeMinutes: 20 },
] as const;

export const INITIAL_COUNTERS: Counter[] = [
  { id: 'v-1', name: 'Ventanilla 1', operatorName: 'Carlos Mendoza', status: 'active', currentTicketCode: 'ATC-002' },
  { id: 'v-2', name: 'Ventanilla 2', operatorName: 'Ana María Gómez', status: 'busy', currentTicketCode: 'CAJ-004' },
  { id: 'v-3', name: 'Ventanilla 3', operatorName: 'Mitchell Admin', status: 'active' },
  { id: 'v-4', name: 'Ventanilla 4 (Preferencial)', operatorName: 'Roberto Silva', status: 'active', currentTicketCode: 'SOP-001' },
];

export const INITIAL_TICKETS: Ticket[] = [
  {
    id: 't-1',
    code: 'ATC-001',
    customerName: 'María Fernanda López',
    customerDni: '42.981.340',
    serviceCategory: 'atencion_cliente',
    priority: 'preferential',
    status: 'in_progress',
    counterId: 'v-1',
    counterName: 'Ventanilla 1',
    operatorName: 'Carlos Mendoza',
    estimatedTimeMinutes: 10,
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    calledAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: 't-2',
    code: 'CAJ-004',
    customerName: 'Empresa TechSud S.A.',
    customerDni: '30-71829340-9',
    serviceCategory: 'caja',
    priority: 'normal',
    status: 'in_progress',
    counterId: 'v-2',
    counterName: 'Ventanilla 2',
    operatorName: 'Ana María Gómez',
    estimatedTimeMinutes: 5,
    createdAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    calledAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
  },
  {
    id: 't-3',
    code: 'SOP-001',
    customerName: 'Jorge Ramírez',
    customerDni: '38.102.554',
    serviceCategory: 'soporte',
    priority: 'urgent',
    status: 'in_progress',
    counterId: 'v-4',
    counterName: 'Ventanilla 4 (Preferencial)',
    operatorName: 'Roberto Silva',
    estimatedTimeMinutes: 15,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    calledAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
  },
  {
    id: 't-4',
    code: 'ATC-002',
    customerName: 'Lucía Benítez',
    customerDni: '35.441.982',
    serviceCategory: 'atencion_cliente',
    priority: 'preferential',
    status: 'waiting',
    estimatedTimeMinutes: 10,
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
  },
  {
    id: 't-5',
    code: 'REC-001',
    customerName: 'Global Logistics SRL',
    customerDni: '30-65432190-2',
    serviceCategory: 'reclamos',
    priority: 'urgent',
    status: 'waiting',
    estimatedTimeMinutes: 12,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    id: 't-6',
    code: 'ERP-003',
    customerName: 'Distribuidora Austral',
    customerDni: '33-88991122-4',
    serviceCategory: 'consultoria',
    priority: 'normal',
    status: 'waiting',
    estimatedTimeMinutes: 20,
    createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
  },
  {
    id: 't-7',
    code: 'CAJ-005',
    customerName: 'Gabriel Rossi',
    customerDni: '40.112.339',
    serviceCategory: 'caja',
    priority: 'normal',
    status: 'waiting',
    estimatedTimeMinutes: 5,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: 't-8',
    code: 'SOP-002',
    customerName: 'Carolina Mendez',
    customerDni: '39.876.543',
    serviceCategory: 'soporte',
    priority: 'normal',
    status: 'waiting',
    estimatedTimeMinutes: 15,
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
  {
    id: 't-9',
    code: 'ATC-003',
    customerName: 'Santiago Morales',
    customerDni: '41.223.344',
    serviceCategory: 'atencion_cliente',
    priority: 'normal',
    status: 'completed',
    counterId: 'v-1',
    counterName: 'Ventanilla 1',
    operatorName: 'Carlos Mendoza',
    estimatedTimeMinutes: 10,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    calledAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: 't-10',
    code: 'CAJ-001',
    customerName: 'Valeria Castro',
    customerDni: '37.890.123',
    serviceCategory: 'caja',
    priority: 'normal',
    status: 'completed',
    counterId: 'v-2',
    counterName: 'Ventanilla 2',
    operatorName: 'Ana María Gómez',
    estimatedTimeMinutes: 5,
    createdAt: new Date(Date.now() - 55 * 60 * 1000).toISOString(),
    calledAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 38 * 60 * 1000).toISOString(),
  },
  {
    id: 't-11',
    code: 'REC-002',
    customerName: 'Martín Peralta',
    customerDni: '36.554.433',
    serviceCategory: 'reclamos',
    priority: 'normal',
    status: 'absent',
    counterId: 'v-3',
    counterName: 'Ventanilla 3',
    operatorName: 'Mitchell Admin',
    estimatedTimeMinutes: 12,
    createdAt: new Date(Date.now() - 70 * 60 * 1000).toISOString(),
    calledAt: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
  },
];

const LOCAL_STORAGE_KEY_TICKETS = 'demo_turnos_tickets_v1';
const LOCAL_STORAGE_KEY_COUNTERS = 'demo_turnos_counters_v1';

export class DataService {
  static getTickets(): Ticket[] {
    if (typeof window === 'undefined') return INITIAL_TICKETS;
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_TICKETS);
    if (!stored) {
      localStorage.setItem(LOCAL_STORAGE_KEY_TICKETS, JSON.stringify(INITIAL_TICKETS));
      return INITIAL_TICKETS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_TICKETS;
    }
  }

  static getCounters(): Counter[] {
    if (typeof window === 'undefined') return INITIAL_COUNTERS;
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY_COUNTERS);
    if (!stored) {
      localStorage.setItem(LOCAL_STORAGE_KEY_COUNTERS, JSON.stringify(INITIAL_COUNTERS));
      return INITIAL_COUNTERS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_COUNTERS;
    }
  }

  static saveTickets(tickets: Ticket[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY_TICKETS, JSON.stringify(tickets));
    }
  }

  static saveCounters(counters: Counter[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY_COUNTERS, JSON.stringify(counters));
    }
  }

  static createTicket(params: {
    customerName: string;
    customerDni: string;
    serviceCategory: ServiceCategory;
    priority: Priority;
  }): Ticket {
    const tickets = this.getTickets();
    const catInfo = SERVICE_CATEGORIES.find(c => c.id === params.serviceCategory);
    const prefix = catInfo ? catInfo.prefix : 'TUR';
    
    // Calculate ticket index number for prefix
    const catTicketsCount = tickets.filter(t => t.serviceCategory === params.serviceCategory).length + 1;
    const code = `${prefix}-${String(catTicketsCount).padStart(3, '0')}`;

    const newTicket: Ticket = {
      id: `t-${Date.now()}`,
      code,
      customerName: params.customerName,
      customerDni: params.customerDni,
      serviceCategory: params.serviceCategory,
      priority: params.priority,
      status: 'waiting',
      estimatedTimeMinutes: catInfo ? catInfo.avgTimeMinutes : 10,
      createdAt: new Date().toISOString(),
    };

    const updated = [newTicket, ...tickets];
    this.saveTickets(updated);
    return newTicket;
  }

  static callTicket(ticketId: string, counterId: string, operatorName: string): Ticket | null {
    const tickets = this.getTickets();
    const counters = this.getCounters();
    
    const counter = counters.find(c => c.id === counterId);
    const counterName = counter ? counter.name : counterId;

    const ticketIndex = tickets.findIndex(t => t.id === ticketId);
    if (ticketIndex === -1) return null;

    const updatedTicket: Ticket = {
      ...tickets[ticketIndex],
      status: 'in_progress',
      counterId,
      counterName,
      operatorName,
      calledAt: new Date().toISOString(),
    };

    tickets[ticketIndex] = updatedTicket;
    this.saveTickets(tickets);

    // Update Counter status
    const updatedCounters = counters.map(c => 
      c.id === counterId ? { ...c, status: 'busy' as const, currentTicketCode: updatedTicket.code } : c
    );
    this.saveCounters(updatedCounters);

    return updatedTicket;
  }

  static updateTicketStatus(ticketId: string, status: TicketStatus): Ticket | null {
    const tickets = this.getTickets();
    const ticketIndex = tickets.findIndex(t => t.id === ticketId);
    if (ticketIndex === -1) return null;

    const currentTicket = tickets[ticketIndex];
    const updatedTicket: Ticket = {
      ...currentTicket,
      status,
      ...(status === 'completed' ? { completedAt: new Date().toISOString() } : {}),
    };

    tickets[ticketIndex] = updatedTicket;
    this.saveTickets(tickets);

    // Free up counter if ticket is completed or marked absent
    if (currentTicket.counterId && (status === 'completed' || status === 'absent' || status === 'cancelled')) {
      const counters = this.getCounters();
      const updatedCounters = counters.map(c => 
        c.id === currentTicket.counterId ? { ...c, status: 'active' as const, currentTicketCode: undefined } : c
      );
      this.saveCounters(updatedCounters);
    }

    return updatedTicket;
  }

  static resetToSeedData(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY_TICKETS, JSON.stringify(INITIAL_TICKETS));
      localStorage.setItem(LOCAL_STORAGE_KEY_COUNTERS, JSON.stringify(INITIAL_COUNTERS));
    }
  }
}
