'use client';

import React from 'react';
import { Product } from '@/types';
import { Tag, Edit3, Trash2, Box } from 'lucide-react';

interface ProductKanbanCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductKanbanCard: React.FC<ProductKanbanCardProps> = ({
  product,
  onEdit,
  onDelete
}) => {
  const getStatusBadge = () => {
    switch (product.status) {
      case 'active':
        return (
          <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-300/40">
            Disponible
          </span>
        );
      case 'out_of_stock':
        return (
          <span className="bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-rose-300/40">
            Sin Stock
          </span>
        );
      case 'draft':
        return (
          <span className="bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-300/40">
            Borrador
          </span>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-odoo-panel-dark rounded-xl border border-gray-200 dark:border-odoo-border-dark overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col justify-between">
      
      {/* Imagen & Ribbon de Categoría */}
      <div className="relative h-44 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img
          src={product.image_url || 'https://via.placeholder.com/400x300?text=Odoo+Product'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        <div className="absolute top-2 left-2 flex items-center gap-1.5">
          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded">
            {product.sku}
          </span>
        </div>

        <div className="absolute top-2 right-2">
          {getStatusBadge()}
        </div>

        <div className="absolute bottom-2 left-2 bg-odoo-purple/90 backdrop-blur-md text-white text-xs font-medium px-2.5 py-0.5 rounded-md flex items-center gap-1">
          <Tag className="w-3 h-3" />
          <span>{product.category}</span>
        </div>
      </div>

      {/* Cuerpo de la Tarjeta */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base line-clamp-2 mb-1 group-hover:text-odoo-purple dark:group-hover:text-purple-400 transition-colors">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
              {product.description}
            </p>
          )}
        </div>

        {/* Footer Tarjeta: Precio, Stock & Botones */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between mt-auto">
          <div>
            <div className="text-xs text-gray-400 font-medium">Precio Unitario</div>
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
              ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-gray-400 font-medium flex items-center gap-1 justify-end">
              <Box className="w-3 h-3" /> Stock
            </div>
            <div className={`text-sm font-semibold ${product.stock > 5 ? 'text-emerald-600 dark:text-emerald-400' : product.stock > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {product.stock} un.
            </div>
          </div>
        </div>
      </div>

      {/* Botones de Acción al Hover / Bottom Bar */}
      <div className="bg-gray-50 dark:bg-gray-800/60 px-4 py-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end space-x-2">
        <button
          onClick={() => onEdit(product)}
          className="flex items-center space-x-1 text-xs font-medium text-odoo-purple dark:text-purple-300 hover:bg-odoo-purple/10 px-2.5 py-1 rounded transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Editar</span>
        </button>

        <button
          onClick={() => onDelete(product.id)}
          className="flex items-center space-x-1 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 px-2.5 py-1 rounded transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Borrar</span>
        </button>
      </div>

    </div>
  );
};
