import { Product, Client, NewProduct, NewClient, DataService, FilterOptions } from '@/types';
import { INITIAL_PRODUCTS, INITIAL_CLIENTS } from './seedData';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const PRODUCTS_KEY = 'odoo_demo_products_v1';
const CLIENTS_KEY = 'odoo_demo_clients_v1';

class UnifiedDataService implements DataService {
  private getLocalProducts(): Product[] {
    if (typeof window === 'undefined') return INITIAL_PRODUCTS;
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (!stored) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_PRODUCTS;
    }
  }

  private saveLocalProducts(products: Product[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    }
  }

  private getLocalClients(): Client[] {
    if (typeof window === 'undefined') return INITIAL_CLIENTS;
    const stored = localStorage.getItem(CLIENTS_KEY);
    if (!stored) {
      localStorage.setItem(CLIENTS_KEY, JSON.stringify(INITIAL_CLIENTS));
      return INITIAL_CLIENTS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_CLIENTS;
    }
  }

  private saveLocalClients(clients: Client[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
    }
  }

  // === PRODUCTOS ===
  async getProducts(filters?: FilterOptions): Promise<Product[]> {
    let products: Product[] = [];

    if (isSupabaseConfigured() && supabase) {
      try {
        let query = supabase.from('products').select('*');

        if (filters?.statusFilter && filters.statusFilter !== 'all') {
          query = query.eq('status', filters.statusFilter);
        }
        if (filters?.categoryFilter && filters.categoryFilter !== 'all') {
          query = query.eq('category', filters.categoryFilter);
        }
        
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          products = data.map(item => ({
            ...item,
            price: Number(item.price),
            stock: Number(item.stock)
          }));
        } else {
          products = this.getLocalProducts();
        }
      } catch {
        products = this.getLocalProducts();
      }
    } else {
      products = this.getLocalProducts();
    }

    // Filtrado local omnibar
    if (filters) {
      if (filters.searchQuery?.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        products = products.filter(
          p =>
            p.name.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            (p.description && p.description.toLowerCase().includes(q))
        );
      }

      if (filters.statusFilter && filters.statusFilter !== 'all') {
        products = products.filter(p => p.status === filters.statusFilter);
      }

      if (filters.categoryFilter && filters.categoryFilter !== 'all') {
        products = products.filter(p => p.category === filters.categoryFilter);
      }

      // Ordenamiento
      if (filters.sortBy === 'price_asc') {
        products.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === 'price_desc') {
        products.sort((a, b) => b.price - a.price);
      } else if (filters.sortBy === 'stock') {
        products.sort((a, b) => b.stock - a.stock);
      } else if (filters.sortBy === 'name') {
        products.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
    }

    return products;
  }

  async getProductById(id: string): Promise<Product | null> {
    const products = await this.getProducts();
    return products.find(p => p.id === id) || null;
  }

  async createProduct(data: NewProduct): Promise<Product> {
    const newProduct: Product = {
      ...data,
      id: isSupabaseConfigured() ? crypto.randomUUID() : `prod-${Date.now()}`,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('products').insert([newProduct]);
      } catch (e) {
        console.warn('Error guardando en Supabase, guardando en local:', e);
      }
    }

    const current = this.getLocalProducts();
    const updated = [newProduct, ...current];
    this.saveLocalProducts(updated);
    return newProduct;
  }

  async updateProduct(id: string, data: Partial<NewProduct>): Promise<Product> {
    let updatedProduct: Product | null = null;
    const current = this.getLocalProducts();
    const index = current.findIndex(p => p.id === id);

    if (index !== -1) {
      updatedProduct = { ...current[index], ...data };
      current[index] = updatedProduct;
      this.saveLocalProducts(current);
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('products').update(data).eq('id', id);
      } catch (e) {
        console.warn('Error actualizando en Supabase:', e);
      }
    }

    if (!updatedProduct) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }

    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const current = this.getLocalProducts();
    const updated = current.filter(p => p.id !== id);
    this.saveLocalProducts(updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('products').delete().eq('id', id);
      } catch (e) {
        console.warn('Error eliminando de Supabase:', e);
      }
    }
    return true;
  }

  // === CLIENTES ===
  async getClients(filters?: FilterOptions): Promise<Client[]> {
    let clients: Client[] = [];

    if (isSupabaseConfigured() && supabase) {
      try {
        let query = supabase.from('clients').select('*');
        if (filters?.statusFilter && filters.statusFilter !== 'all') {
          query = query.eq('status', filters.statusFilter);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          clients = data.map(item => ({
            ...item,
            total_purchases: Number(item.total_purchases)
          }));
        } else {
          clients = this.getLocalClients();
        }
      } catch {
        clients = this.getLocalClients();
      }
    } else {
      clients = this.getLocalClients();
    }

    if (filters) {
      if (filters.searchQuery?.trim()) {
        const q = filters.searchQuery.toLowerCase().trim();
        clients = clients.filter(
          c =>
            c.full_name.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q) ||
            c.company.toLowerCase().includes(q) ||
            c.phone.toLowerCase().includes(q)
        );
      }

      if (filters.statusFilter && filters.statusFilter !== 'all') {
        clients = clients.filter(c => c.status === filters.statusFilter);
      }

      if (filters.sortBy === 'price_desc') {
        clients.sort((a, b) => b.total_purchases - a.total_purchases);
      } else if (filters.sortBy === 'name') {
        clients.sort((a, b) => a.full_name.localeCompare(b.full_name));
      } else {
        clients.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      }
    }

    return clients;
  }

  async getClientById(id: string): Promise<Client | null> {
    const clients = await this.getClients();
    return clients.find(c => c.id === id) || null;
  }

  async createClient(data: NewClient): Promise<Client> {
    const newClient: Client = {
      ...data,
      id: isSupabaseConfigured() ? crypto.randomUUID() : `cli-${Date.now()}`,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('clients').insert([newClient]);
      } catch (e) {
        console.warn('Error guardando cliente en Supabase:', e);
      }
    }

    const current = this.getLocalClients();
    const updated = [newClient, ...current];
    this.saveLocalClients(updated);
    return newClient;
  }

  async updateClient(id: string, data: Partial<NewClient>): Promise<Client> {
    let updatedClient: Client | null = null;
    const current = this.getLocalClients();
    const index = current.findIndex(c => c.id === id);

    if (index !== -1) {
      updatedClient = { ...current[index], ...data };
      current[index] = updatedClient;
      this.saveLocalClients(current);
    }

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('clients').update(data).eq('id', id);
      } catch (e) {
        console.warn('Error actualizando cliente en Supabase:', e);
      }
    }

    if (!updatedClient) {
      throw new Error(`Cliente con ID ${id} no encontrado`);
    }

    return updatedClient;
  }

  async deleteClient(id: string): Promise<boolean> {
    const current = this.getLocalClients();
    const updated = current.filter(c => c.id !== id);
    this.saveLocalClients(updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('clients').delete().eq('id', id);
      } catch (e) {
        console.warn('Error eliminando cliente de Supabase:', e);
      }
    }
    return true;
  }
}

export const dataService = new UnifiedDataService();
