'use client';

import React, { useState, useEffect } from 'react';
import { Client, NewClient } from '@/types';
import { X, UserPlus, Save } from 'lucide-react';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: NewClient, id?: string) => Promise<void>;
  clientToEdit?: Client | null;
}

export const ClientModal: React.FC<ClientModalProps> = ({
  isOpen,
  onClose,
  onSave,
  clientToEdit
}) => {
  const [formData, setFormData] = useState<NewClient>({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    total_purchases: 0,
    status: 'active',
    avatar_url: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clientToEdit) {
      setFormData({
        full_name: clientToEdit.full_name,
        email: clientToEdit.email,
        phone: clientToEdit.phone || '',
        company: clientToEdit.company || '',
        total_purchases: clientToEdit.total_purchases,
        status: clientToEdit.status,
        avatar_url: clientToEdit.avatar_url || ''
      });
    } else {
      setFormData({
        full_name: '',
        email: '',
        phone: '+54 11 ',
        company: '',
        total_purchases: 0,
        status: 'active',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      });
    }
  }, [clientToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData, clientToEdit?.id);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-odoo-panel-dark rounded-xl max-w-lg w-full border border-gray-200 dark:border-odoo-border-dark shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-odoo-purple text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5" />
            <h2 className="font-bold text-lg">
              {clientToEdit ? 'Editar Cliente' : 'Nuevo Cliente CRM'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Nombre Completo */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                Nombre y Apellido *
              </label>
              <input
                type="text"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="Ej. Roberto Gómez Silva"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-odoo-purple outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                Email Corporativo *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contacto@empresa.com"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-odoo-purple outline-none"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                Teléfono / WhatsApp
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+54 11 4589-2210"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-odoo-purple outline-none"
              />
            </div>

            {/* Empresa */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                Empresa / Razón Social *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="TechCorp SA"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-odoo-purple outline-none"
              />
            </div>

            {/* Facturación Acumulada */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                Facturación Total ($ USD)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.total_purchases}
                onChange={(e) => setFormData({ ...formData, total_purchases: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-semibold focus:ring-2 focus:ring-odoo-purple outline-none"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                Estado del Cliente *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-odoo-purple outline-none"
              >
                <option value="active">Cliente Activo</option>
                <option value="lead">Prospecto / Lead</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>

            {/* Avatar URL */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                URL Foto de Perfil (Unsplash / HTTPS)
              </label>
              <input
                type="url"
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-odoo-purple outline-none"
              />
            </div>

          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-odoo-purple hover:bg-odoo-purple-dark text-white font-semibold px-5 py-2 rounded-lg text-sm transition-all shadow-md active:scale-95 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Guardando...' : 'Guardar Cliente'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
