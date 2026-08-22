export type ProductStatus = 'active' | 'out_of_stock' | 'draft';
export type ClientStatus = 'active' | 'lead' | 'inactive';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  image_url: string;
  description?: string;
  created_at: string;
}

export type NewProduct = Omit<Product, 'id' | 'created_at'>;

export interface Client {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company: string;
  total_purchases: number;
  status: ClientStatus;
  avatar_url?: string;
  created_at: string;
}

export type NewClient = Omit<Client, 'id' | 'created_at'>;

export type ViewMode = 'kanban' | 'list';
export type ActiveModule = 'products' | 'clients' | 'supabase_setup';

export interface FilterOptions {
  searchQuery: string;
  statusFilter: string;
  categoryFilter: string;
  sortBy: 'name' | 'price_asc' | 'price_desc' | 'stock' | 'newest';
}

export interface DataService {
  getProducts(filters?: FilterOptions): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  createProduct(data: NewProduct): Promise<Product>;
  updateProduct(id: string, data: Partial<NewProduct>): Promise<Product>;
  deleteProduct(id: string): Promise<boolean>;

  getClients(filters?: FilterOptions): Promise<Client[]>;
  getClientById(id: string): Promise<Client | null>;
  createClient(data: NewClient): Promise<Client>;
  updateClient(id: string, data: Partial<NewClient>): Promise<Client>;
  deleteClient(id: string): Promise<boolean>;
}
