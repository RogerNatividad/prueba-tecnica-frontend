import { User, Product, AuthResponse } from '@/types';

// Usuarios mockeados
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@realplaza.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'user@realplaza.com',
    firstName: 'Regular',
    lastName: 'User',
    role: 'user',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

// Productos mockeados
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Smartphone Samsung Galaxy S24',
    description: 'Último modelo de Samsung con cámara de 200MP y pantalla AMOLED de 6.8 pulgadas',
    price: 2999.99,
    category: 'Electrónicos',
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: '1',
  },
  {
    id: '2',
    name: 'Laptop Dell XPS 13',
    description: 'Laptop ultradelgada con procesador Intel Core i7 y 16GB de RAM',
    price: 4599.99,
    category: 'Computadoras',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    isActive: true,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
    createdBy: '1',
  },
  {
    id: '3',
    name: 'Auriculares Sony WH-1000XM5',
    description: 'Auriculares inalámbricos con cancelación de ruido activa',
    price: 899.99,
    category: 'Audio',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    isActive: true,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
    createdBy: '1',
  },
  {
    id: '4',
    name: 'Smart TV LG OLED 55"',
    description: 'Televisor OLED 4K con tecnología AI ThinQ y Dolby Vision',
    price: 3299.99,
    category: 'Electrónicos',
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    isActive: true,
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z',
    createdBy: '1',
  },
  {
    id: '5',
    name: 'Tablet iPad Pro 12.9"',
    description: 'iPad Pro con chip M2, pantalla Liquid Retina XDR y soporte para Apple Pencil',
    price: 3999.99,
    category: 'Tablets',
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
    isActive: true,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
    createdBy: '1',
  },
];

// Categorías disponibles
export const mockCategories = [
  'Electrónicos',
  'Computadoras',
  'Audio',
  'Tablets',
  'Accesorios',
  'Gaming',
  'Hogar',
];

// Función para simular delay de red
export const simulateNetworkDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Función para generar respuesta de autenticación mock
export const generateMockAuthResponse = (user: User): AuthResponse => {
  return {
    user,
    token: `mock-jwt-token-${user.id}-${Date.now()}`,
    refreshToken: `mock-refresh-token-${user.id}-${Date.now()}`,
  };
};