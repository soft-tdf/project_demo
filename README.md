# Odoo ERP Commercial MVP Demo 🚀

Un panel de administración y catálogo B2B interactivo de alto impacto estético, desarrollado para demostraciones comerciales. Está inspirado visual y funcionalmente en el **ERP de Odoo** (Módulos de Catálogo/Inventario & CRM de Clientes), construido sobre **Next.js (App Router)**, **Tailwind CSS**, **Lucide Icons** y empaquetado para despliegue inmediato con **Docker**.

---

## 🌟 Características Principales

- **Diseño estilo Odoo ERP:**
  - Header morado Odoo (`#714B67`) con App Switcher, breadcrumbs de navegación, switcher de modo claro/oscuro y perfil de usuario *Mitchell Admin*.
  - **Odoo Control Panel:** Buscador inteligente **Omnibar** en tiempo real por nombre, SKU o categoría, chips de filtros, selector de ordenamiento y alternador de vista dual **Kanban (tarjetas con imágenes de producto)** vs **Lista (tabla scannable)**.
- **Datos Semilla Listos para Demostración:**
  - Precargados **15 productos B2B** con imágenes reales en alta resolución (servidores rack, laptops industriales, routers Cisco, sensores IoT, licencias ERP, etc.) con precios y stock.
  - Precargados **10 clientes corporativos** con métricas de facturación acumulada y badges de estado (*Activo*, *Lead*, *Inactivo*).
- **Arquitectura de Datos Supabase Ready:**
  - Capa de servicios desacoplada (`src/services/dataService.ts`).
  - **Modo Demo (LocalStorage):** Funciona al 100% desde el segundo 0 sin necesidad de configurar una base de datos externa. Todos los cambios (crear, editar, borrar) se persisten localmente en el navegador.
  - **Conexión Supabase (PostgreSQL):** Al ingresar las credenciales en el entorno, la app conmuta automáticamente a producción en la nube. Incluye un modal interactivo en la aplicación con el script SQL listo para copiar y ejecutar en el panel de Supabase.
- **Despliegue Aislado en Contenedores:**
  - `Dockerfile` multi-stage optimizado y `docker-compose.yml` listos para desplegar en cualquier servidor u ordenador sin instalar dependencias Node.js en el host.

---

## 🐳 Despliegue Rápido con Docker

### Requisitos Previos
- Tienes instalado **Docker** y **Docker Compose**.

### Pasos de Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/soft-tdf/project_demo.git
   cd project_demo
   ```

2. **Levantar la aplicación con Docker Compose:**
   ```bash
   docker compose up --build -d
   ```

3. **Abrir en tu navegador:**
   👉 **[http://localhost:3005](http://localhost:3005)**

Para detener la aplicación:
```bash
docker compose down
```

---

## ⚡ Conexión a Supabase (Opcional)

Si deseas conectar el MVP a tu propio proyecto de **Supabase (PostgreSQL)** en la nube:

1. **Crear archivo de entorno local:**
   Copia el archivo de ejemplo o crea `.env.local` en la raíz del proyecto:
   ```bash
   cp .env.example .env.local
   ```

2. **Agregar tus credenciales de Supabase:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

3. **Crear las Tablas en Supabase:**
   En la aplicación web, haz clic en el botón superior **`Modo Mock`** o **`Ajustes`** para abrir el modal de Supabase. Copia el script SQL provisto y ejecútalo en el **SQL Editor** de tu Dashboard de Supabase.

   <details>
   <summary>Ver Script SQL de creación de tablas</summary>

   ```sql
   -- 1. Tabla de Productos
   CREATE TABLE IF NOT EXISTS public.products (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       name TEXT NOT NULL,
       sku TEXT UNIQUE NOT NULL,
       category TEXT NOT NULL,
       price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
       stock INTEGER NOT NULL DEFAULT 0,
       status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'out_of_stock', 'draft')),
       image_url TEXT,
       description TEXT,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
   );

   -- 2. Tabla de Clientes
   CREATE TABLE IF NOT EXISTS public.clients (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       full_name TEXT NOT NULL,
       email TEXT UNIQUE NOT NULL,
       phone TEXT,
       company TEXT,
       total_purchases NUMERIC(10,2) NOT NULL DEFAULT 0.00,
       status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'lead', 'inactive')),
       avatar_url TEXT,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
   );

   -- Habilitar RLS para la Demo
   ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
   ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Allow anonymous read access on products" ON public.products FOR SELECT USING (true);
   CREATE POLICY "Allow anonymous insert/update on products" ON public.products FOR ALL USING (true);

   CREATE POLICY "Allow anonymous read access on clients" ON public.clients FOR SELECT USING (true);
   CREATE POLICY "Allow anonymous insert/update on clients" ON public.clients FOR ALL USING (true);
   ```
   </details>

4. Reinicia el contenedor Docker para aplicar las variables:
   ```bash
   docker compose down && docker compose up -d
   ```

---

## 📁 Estructura del Proyecto

```text
project_demo/
├── Dockerfile                  # Multi-stage Docker build para Next.js
├── docker-compose.yml          # Mapeo de puertos (3005:3000) y variables
├── next.config.mjs             # Configuración Next.js & dominios de imágenes (Unsplash)
├── package.json                # Dependencias (React 18, Tailwind, Lucide, Supabase SDK)
├── tailwind.config.js          # Configuración de colores oficiales Odoo (#714B67)
├── src/
│   ├── app/
│   │   ├── globals.css         # Estilos globales y Tailwind CSS
│   │   ├── layout.tsx          # Root Layout con ThemeProvider y AuthProvider
│   │   └── page.tsx            # App principal integrando Catálogo y CRM
│   ├── components/
│   │   ├── clients/            # Módulo CRM de clientes & modal
│   │   ├── layout/             # Header Odoo & Control Panel Omnibar
│   │   ├── products/           # Tarjeta Kanban, Tabla Lista & modal de productos
│   │   └── supabase/           # Modal de estado e integración SQL Supabase
│   ├── context/                # ThemeContext (Dark/Light) y AuthContext (Mitchell Admin)
│   ├── lib/                    # Instancia e helpers del cliente Supabase
│   ├── services/               # DataService unificado y datos semilla
│   └── types/                  # Definiciones de TypeScript (Product, Client, etc.)
└── README.md
```

---

## 🛠️ Comandos de Utilidad Docker

- **Ver logs del contenedor:**
  ```bash
  docker compose logs -f
  ```
- **Reconstruir la imagen de producción:**
  ```bash
  docker compose build --no-cache
  ```
- **Verificar estado de los contenedores:**
  ```bash
  docker compose ps
  ```

---

## 📄 Licencia

Este proyecto está disponible como plantilla MVP para uso libre y demostraciones comerciales B2B.
