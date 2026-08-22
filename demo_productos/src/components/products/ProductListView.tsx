'use client';

import React from 'react';
import { Product } from '@/types';
import { Edit3, Trash2 } from 'lucide-react';

interface ProductListViewProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductListView: React.FC<ProductListViewProps> = ({
  products,
  onEdit,
  onDelete
}) => {
  if (products.length === 0) {
    return (
      <div className="bg-white dark:bg-odoo-panel-dark rounded-xl p-12 text-center border border-gray-200 dark:border-odoo-border-dark">
        <p className="text-gray-500 dark:text-gray-400 text-sm">No se encontraron productos con los filtros aplicados.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-odoo-panel-dark rounded-xl border border-gray-200 dark:border-odoo-border-dark overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 uppercase text-[11px] font-semibold tracking-wider border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="py-3 px-4 w-10 text-center">
                <input type="checkbox" className="rounded text-odoo-purple focus:ring-odoo-purple" />
              </th>
              <th className="py-3 px-4">Producto</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Categoría</th>
              <th className="py-3 px-4 text-right">Precio</th>
              <th className="py-3 px-4 text-center">Stock</th>
              <th className="py-3 px-4 text-center">Estado</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {products.map((p) => (
              <tr 
                key={p.id} 
                className="hover:bg-purple-50/50 dark:hover:bg-gray-800/50 transition-colors group"
              >
                <td className="py-3 px-4 text-center">
                  <input type="checkbox" className="rounded text-odoo-purple focus:ring-odoo-purple" />
                </td>
                
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={p.image_url || 'https://via.placeholder.com/80'}
                      alt={p.name}
                      className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-gray-700 flex-shrink-0"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-odoo-purple dark:group-hover:text-purple-300">
                        {p.name}
                      </div>
                      {p.description && (
                        <div className="text-xs text-gray-400 line-clamp-1 max-w-md">
                          {p.description}
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                <td className="py-3 px-4 font-mono text-xs text-gray-600 dark:text-gray-400">
                  {p.sku}
                </td>

                <td className="py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                    {p.category}
                  </span>
                </td>

                <td className="py-3 px-4 text-right font-bold text-gray-900 dark:text-gray-100">
                  ${p.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>

                <td className="py-3 px-4 text-center font-semibold">
                  <span className={p.stock > 5 ? 'text-emerald-600 dark:text-emerald-400' : p.stock > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'}>
                    {p.stock} un.
                  </span>
                </td>

                <td className="py-3 px-4 text-center">
                  {p.status === 'active' && (
                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Disponible
                    </span>
                  )}
                  {p.status === 'out_of_stock' && (
                    <span className="bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Agotado
                    </span>
                  )}
                  {p.status === 'draft' && (
                    <span className="bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Borrador
                    </span>
                  )}
                </td>

                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <button
                      onClick={() => onEdit(p)}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"
                      title="Editar producto"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(p.id)}
                      className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded text-rose-600 dark:text-rose-400"
                      title="Eliminar producto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
