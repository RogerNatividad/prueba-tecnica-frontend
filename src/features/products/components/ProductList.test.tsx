import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductList from './ProductList';
import { mockProducts } from '@/lib/mockData';

// Mock the hooks
vi.mock('@/hooks', () => ({
  useProducts: () => ({
    data: { products: mockProducts, total: mockProducts.length },
    isLoading: false,
    error: null,
    refetch: vi.fn()
  }),
  useCategories: () => ({
    data: ['Electrónicos', 'Ropa', 'Hogar']
  }),
  useDeleteProduct: () => ({
    mutate: vi.fn()
  }),
  useCreateProduct: () => ({
    mutate: vi.fn(),
    isLoading: false
  }),
  useUpdateProduct: () => ({
    mutate: vi.fn(),
    isLoading: false
  })
}));

// Mock ProductForm component to avoid complex dependencies
vi.mock('./ProductForm', () => ({
  default: () => <div data-testid="product-form">Product Form</div>
}));

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithQueryClient = (component: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('ProductList', () => {
  it('should render products correctly', () => {
    renderWithQueryClient(<ProductList />);
    
    // Check if products are rendered
    expect(screen.getByText('5 productos encontrados')).toBeInTheDocument();
    
    // Check if first product is rendered
    expect(screen.getByText('Smartphone Samsung Galaxy S24')).toBeInTheDocument();
    expect(screen.getByText('S/ 2,999.99')).toBeInTheDocument();
    
    // Check if "Nuevo Producto" button is rendered
    expect(screen.getByText('Nuevo Producto')).toBeInTheDocument();
  });
  
  it('should render search input', () => {
    renderWithQueryClient(<ProductList />);
    
    expect(screen.getByPlaceholderText('Buscar productos...')).toBeInTheDocument();
  });
  
  it('should render category filter', () => {
    renderWithQueryClient(<ProductList />);
    
    expect(screen.getByDisplayValue('Todas las categorías')).toBeInTheDocument();
  });
});