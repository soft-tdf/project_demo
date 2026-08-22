export type TicketStatus = 'waiting' | 'in_progress' | 'completed' | 'absent' | 'cancelled';

export type Priority = 'normal' | 'preferential' | 'urgent';

export type ServiceCategory = 'atencion_cliente' | 'caja' | 'soporte' | 'reclamos' | 'consultoria';

export interface Ticket {
  id: string;
  code: string;
  customerName: string;
  customerDni: string;
  serviceCategory: ServiceCategory;
  priority: Priority;
  counterId?: string;
  counterName?: string;
  status: TicketStatus;
  estimatedTimeMinutes: number;
  createdAt: string;
  calledAt?: string;
  completedAt?: string;
  operatorName?: string;
}

export interface Counter {
  id: string;
  name: string;
  operatorName: string;
  status: 'active' | 'busy' | 'offline';
  currentTicketCode?: string;
}

export interface TicketFilterState {
  searchQuery: string;
  statusFilter: TicketStatus | 'all';
  serviceFilter: ServiceCategory | 'all';
  priorityFilter: Priority | 'all';
  viewMode: 'kanban' | 'list';
}

export interface CategoryInfo {
  id: ServiceCategory;
  name: string;
  prefix: string;
  iconName: string;
  colorClass: string;
  avgTimeMinutes: number;
}
