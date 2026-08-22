import { Product, Client } from '@/types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Servidor ProLiant Enterprise Rack 2U',
    sku: 'HW-SRV-001',
    category: 'Hardware',
    price: 3450.00,
    stock: 8,
    status: 'active',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    description: 'Servidor de alto rendimiento con doble procesador Xeon Gold, 128GB RAM ECC y almacenamiento NVMe redundante.',
    created_at: new Date(Date.now() - 30 * 86400000).toISOString()
  },
  {
    id: 'prod-2',
    name: 'Laptop Ruggedized Industrial ToughBook',
    sku: 'HW-LAP-002',
    category: 'Hardware',
    price: 1890.50,
    stock: 14,
    status: 'active',
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    description: 'Laptop ultra resistente certificada IP65 para trabajo pesado en terreno y plantas industriales.',
    created_at: new Date(Date.now() - 25 * 86400000).toISOString()
  },
  {
    id: 'prod-3',
    name: 'Switch Administrable Gigabit 48 Puertos PoE+',
    sku: 'NET-SW-048',
    category: 'Redes',
    price: 780.00,
    stock: 22,
    status: 'active',
    image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80',
    description: 'Switch de capa 3 con administración remota, soporte VLAN y presupuesto de energía PoE de 740W.',
    created_at: new Date(Date.now() - 20 * 86400000).toISOString()
  },
  {
    id: 'prod-4',
    name: 'Monitor Ultrawide 38" 4K Curved HDR',
    sku: 'PER-MON-038',
    category: 'Periféricos',
    price: 1120.00,
    stock: 5,
    status: 'active',
    image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
    description: 'Monitor profesional con espacio de color DCI-P3 98%, hub USB-C integrando carga de 90W.',
    created_at: new Date(Date.now() - 18 * 86400000).toISOString()
  },
  {
    id: 'prod-5',
    name: 'Licencia Software ERP Enterprise (Anual)',
    sku: 'SW-LIC-ERP',
    category: 'Software',
    price: 4900.00,
    stock: 999,
    status: 'active',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    description: 'Subscripción corporativa ilimitada para modulos de finanzas, ventas, compras e inventario.',
    created_at: new Date(Date.now() - 15 * 86400000).toISOString()
  },
  {
    id: 'prod-6',
    name: 'Router Empresarial Dual-WAN Cybersecurity',
    sku: 'NET-RTR-009',
    category: 'Redes',
    price: 650.00,
    stock: 0,
    status: 'out_of_stock',
    image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80',
    description: 'Gateway VPN acelerado por hardware con prevención de intrusos en tiempo real (IPS/IDS).',
    created_at: new Date(Date.now() - 14 * 86400000).toISOString()
  },
  {
    id: 'prod-7',
    name: 'Sistema de Videoconferencia 4K AI Track',
    sku: 'AV-VID-4K',
    category: 'Periféricos',
    price: 1450.00,
    stock: 3,
    status: 'active',
    image_url: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&auto=format&fit=crop&q=80',
    description: 'Barra de video con encuadre automático por inteligencia artificial y arreglo de 8 micrófonos.',
    created_at: new Date(Date.now() - 12 * 86400000).toISOString()
  },
  {
    id: 'prod-8',
    name: 'Impresora 3D de Resina Industrial SLA',
    sku: 'IND-3D-SLA',
    category: 'Maquinaria',
    price: 2850.00,
    stock: 2,
    status: 'active',
    image_url: 'https://images.unsplash.com/photo-1612815150366-d81062a03c3f?w=600&auto=format&fit=crop&q=80',
    description: 'Impresora 3D de alta precisión para prototipado rápido y piezas de grado funcional.',
    created_at: new Date(Date.now() - 10 * 86400000).toISOString()
  },
  {
    id: 'prod-9',
    name: 'Lector de Código de Barras Industrial 2D',
    sku: 'LOG-SCAN-2D',
    category: 'Logística',
    price: 240.00,
    stock: 35,
    status: 'active',
    image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80',
    description: 'Escáner inalámbrico ultra resistente a caídas de 2 metros con conexión Bluetooth 5.2.',
    created_at: new Date(Date.now() - 8 * 86400000).toISOString()
  },
  {
    id: 'prod-10',
    name: 'UPS Online Doble Conversión 10kVA Rack',
    sku: 'PWR-UPS-10K',
    category: 'Hardware',
    price: 2100.00,
    stock: 6,
    status: 'active',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    description: 'Unidad de respaldo eléctrico para centros de cómputo con baterías intercambiables en caliente.',
    created_at: new Date(Date.now() - 6 * 86400000).toISOString()
  },
  {
    id: 'prod-11',
    name: 'Modulo Fotovoltaico 550W Monocristalino',
    sku: 'ENG-SOL-550',
    category: 'Energía',
    price: 185.00,
    stock: 120,
    status: 'active',
    image_url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80',
    description: 'Panel solar de alta eficiencia con tecnología PERC Half-Cut para proyectos comerciales.',
    created_at: new Date(Date.now() - 5 * 86400000).toISOString()
  },
  {
    id: 'prod-12',
    name: 'Auriculares Inalámbricos ANC Pro Comm',
    sku: 'PER-AUD-ANC',
    category: 'Periféricos',
    price: 290.00,
    stock: 18,
    status: 'active',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    description: 'Headset con cancelación activa de ruido y micrófono con supresión de fondo para llamadas B2B.',
    created_at: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    id: 'prod-13',
    name: 'Terminal TPV Táctil All-in-One 15.6"',
    sku: 'POS-TRM-15',
    category: 'Logística',
    price: 890.00,
    stock: 0,
    status: 'out_of_stock',
    image_url: 'https://images.unsplash.com/photo-1556742049-0a67daf4005a?w=600&auto=format&fit=crop&q=80',
    description: 'Terminal punto de venta con impresora térmica integrada y pantalla capacitiva de alto brillo.',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: 'prod-14',
    name: 'Módulo IoT Sensor Temperatura/Humedad IP67',
    sku: 'IOT-SNS-TH',
    category: 'Redes',
    price: 95.00,
    stock: 45,
    status: 'active',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    description: 'Sensor con conectividad LoRaWAN para monitoreo ambiental de cámaras frigoríficas.',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 'prod-15',
    name: 'Paquete de Auditoría de Ciberseguridad Pentest (Borrador)',
    sku: 'SEC-AUD-DRAFT',
    category: 'Software',
    price: 3200.00,
    stock: 10,
    status: 'draft',
    image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    description: 'Servicio de prueba de penetración de código y revisión de vulnerabilidades en infraestructura.',
    created_at: new Date().toISOString()
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cli-1',
    full_name: 'Roberto Gómez Silva',
    email: 'rgomez@techcorpsa.com',
    phone: '+54 11 4589-2210',
    company: 'TechCorp SA',
    total_purchases: 45800.00,
    status: 'active',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 120 * 86400000).toISOString()
  },
  {
    id: 'cli-2',
    full_name: 'María Florencia Benítez',
    email: 'mbenitez@inversionesaustral.com',
    phone: '+54 11 5122-9901',
    company: 'Inversiones Austral S.R.L.',
    total_purchases: 28450.50,
    status: 'active',
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 95 * 86400000).toISOString()
  },
  {
    id: 'cli-3',
    full_name: 'Alejandro Martínez',
    email: 'amartinez@globallogistics.io',
    phone: '+54 351 488-3344',
    company: 'Global Logistics Group',
    total_purchases: 68900.00,
    status: 'active',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 80 * 86400000).toISOString()
  },
  {
    id: 'cli-4',
    full_name: 'Carolina Herrera',
    email: 'cherrera@biofarmasol.com',
    phone: '+54 261 411-7788',
    company: 'BioFarma Soluciones',
    total_purchases: 12300.00,
    status: 'lead',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 40 * 86400000).toISOString()
  },
  {
    id: 'cli-5',
    full_name: 'Esteban Rossini',
    email: 'erossini@metalurgicarossini.com',
    phone: '+54 341 590-1122',
    company: 'Metalúrgica Rossini e Hijos',
    total_purchases: 8940.00,
    status: 'active',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 35 * 86400000).toISOString()
  },
  {
    id: 'cli-6',
    full_name: 'Lucía Fernández',
    email: 'lucia@datacloudnet.com',
    phone: '+54 11 6788-3321',
    company: 'DataCloud Networks',
    total_purchases: 54100.00,
    status: 'active',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 30 * 86400000).toISOString()
  },
  {
    id: 'cli-7',
    full_name: 'Gabriel Soria',
    email: 'gsoria@agroindustriallitoral.com',
    phone: '+54 342 455-8899',
    company: 'Agroindustrial Litoral',
    total_purchases: 3200.00,
    status: 'lead',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 20 * 86400000).toISOString()
  },
  {
    id: 'cli-8',
    full_name: 'Valeria Mansilla',
    email: 'vmansilla@constructoraandes.com',
    phone: '+54 261 499-0011',
    company: 'Constructora Andes',
    total_purchases: 0.00,
    status: 'inactive',
    avatar_url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 15 * 86400000).toISOString()
  },
  {
    id: 'cli-9',
    full_name: 'Diego Peralta',
    email: 'dperalta@solucionesenergeticas.ar',
    phone: '+54 11 4100-2233',
    company: 'Soluciones Energéticas AR',
    total_purchases: 19800.00,
    status: 'active',
    avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 10 * 86400000).toISOString()
  },
  {
    id: 'cli-10',
    full_name: 'Sofía Santillán',
    email: 'ssantillan@retailgroup.com',
    phone: '+54 11 5899-7766',
    company: 'Retail Group Sudamérica',
    total_purchases: 38400.00,
    status: 'active',
    avatar_url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 5 * 86400000).toISOString()
  }
];
