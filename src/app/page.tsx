'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Product, Client, ViewMode, ActiveModule, FilterOptions, NewProduct, NewClient } from '@/types';
import { dataService } from '@/services/dataService';
import { OdooHeader } from '@/components/layout/OdooHeader';
import { OdooControlPanel } from '@/components/layout/OdooControlPanel';
import { ProductKanbanCard } from '@/components/products/ProductKanbanCard';
import { ProductListView } from '@/components/products/ProductListView';
import { ProductModal } from '@/components/products/ProductModal';
import { ClientsModule } from '@/components/clients/ClientsModule';
import { ClientModal } from '@/components/clients/ClientModal';
import { SupabaseConfigModal } from '@/components/supabase/SupabaseConfigModal';

export default function Home() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('products');
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');

  // Datos
  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    statusFilter: 'all',
    categoryFilter: 'all',
    sortBy: 'newest'
  });

  // Modales
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);

  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);

  // Cargar Productos
  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await dataService.getProducts(filters);
      setProducts(data);
    } catch (err) {
      console.error('Error cargando productos:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Cargar Clientes
  const loadClients = useCallback(async () => {
    setLoading(true);
    try {
      const data = await dataService.getClients(filters);
      setClients(data);
    } catch (err) {
      console.error('Error cargando clientes:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (activeModule === 'products') {
      loadProducts();
    } else if (activeModule === 'clients') {
      loadClients();
    }
  }, [activeModule, filters, loadProducts, loadClients]);

  // Obtener categorías únicas para los filtros
  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category));
    return Array.from(set);
  }, [products]);

  // Handlers Productos
  const handleSaveProduct = async (data: NewProduct, id?: string) => {
    if (id) {
      await dataService.updateProduct(id, data);
    } else {
      await dataService.createProduct(data);
    }
    loadProducts();
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      await dataService.deleteProduct(id);
      loadProducts();
    }
  };

  const handleEditProductClick = (product: Product) => {
    setProductToEdit(product);
    setIsProductModalOpen(true);
  };

  const handleNewProductClick = () => {
    setProductToEdit(null);
    setIsProductModalOpen(true);
  };

  // Handlers Clientes
  const handleSaveClient = async (data: NewClient, id?: string) => {
    if (id) {
      await dataService.updateClient(id, data);
    } else {
      await dataService.createClient(data);
    }
    loadClients();
  };

  const handleDeleteClient = async (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      await dataService.deleteClient(id);
      loadClients();
    }
  };

  const handleEditClientClick = (client: Client) => {
    setClientToEdit(client);
    setIsClientModalOpen(true);
  };

  const handleNewClientClick = () => {
    setClientToEdit(null);
    setIsClientModalOpen(true);
  };

  // Botón "Nuevo" Dinámico
  const handleNewItemClick = () => {
    if (activeModule === 'products') {
      handleNewProductClick();
    } else {
      handleNewClientClick();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-odoo-bg dark:bg-odoo-bg-dark">
      
      {/* Header Principal Odoo */}
      <OdooHeader
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
      />

      {/* Control Panel Secundario (Omnibar + Controls) */}
      <OdooControlPanel
        activeModule={activeModule}
        viewMode={viewMode}
        setViewMode={setViewMode}
        filters={filters}
        setFilters={setFilters}
        totalCount={activeModule === 'products' ? products.length : clients.length}
        onNewItemClick={handleNewItemClick}
        categories={categories}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-10 h-10 border-4 border-odoo-purple border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cargando datos Odoo ERP...</p>
          </div>
        ) : activeModule === 'products' ? (
          
          /* Módulo de Productos */
          <div>
            {products.length === 0 ? (
              <div className="bg-white dark:bg-odoo-panel-dark rounded-xl p-12 text-center border border-gray-200 dark:border-odoo-border-dark">
                <p className="text-gray-500 dark:text-gray-400 text-sm">No se encontraron productos con la búsqueda o filtro seleccionado.</p>
              </div>
            ) : viewMode === 'kanban' ? (
              
              /* Vista Kanban Tarjetas */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map(product => (
                  <ProductKanbanCard
                    key={product.id}
                    product={product}
                    onEdit={handleEditProductClick}
                    onDelete={handleDeleteProduct}
                  />
                ))}
              </div>

            ) : (

              /* Vista Lista Tabla */
              <ProductListView
                products={products}
                onEdit={handleEditProductClick}
                onDelete={handleDeleteProduct}
              />

            )}
          </div>

        ) : (

          /* Módulo de Clientes CRM */
          <ClientsModule
            clients={clients}
            viewMode={viewMode}
            onEdit={handleEditClientClick}
            onDelete={handleDeleteClient}
          />

        )}

      </main>

      {/* Modales */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
        categories={categories.length > 0 ? categories : ['Hardware', 'Redes', 'Software', 'Periféricos', 'Logística']}
      />

      <ClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onSave={handleSaveClient}
        clientToEdit={clientToEdit}
      />

      <SupabaseConfigModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
      />

    </div>
  );
}
