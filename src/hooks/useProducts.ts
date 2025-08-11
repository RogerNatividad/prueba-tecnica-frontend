import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  Product, 
  CreateProductRequest, 
  UpdateProductRequest, 
  ProductFilters, 
  PaginationParams 
} from '@/types';
import { productService } from '@/services';

// Query keys
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: ProductFilters, pagination: PaginationParams) => 
    [...productKeys.lists(), { filters, pagination }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  categories: () => [...productKeys.all, 'categories'] as const,
  search: (query: string) => [...productKeys.all, 'search', query] as const,
};

// Hook para obtener productos con filtros y paginación
export const useProducts = (
  filters: ProductFilters = {}, 
  pagination: PaginationParams = {}
) => {
  return useQuery({
    queryKey: productKeys.list(filters, pagination),
    queryFn: () => productService.getProducts(filters, pagination),
    staleTime: 1000 * 60 * 5, // 5 minutos
    keepPreviousData: true, // Mantener datos anteriores durante la carga
  });
};

// Hook para obtener un producto por ID
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productService.getProductById(id),
    enabled: !!id, // Solo ejecutar si hay ID
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
};

// Hook para crear producto
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productData: CreateProductRequest) => 
      productService.createProduct(productData),
    onSuccess: (newProduct) => {
      // Invalidar lista de productos
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      // Agregar el nuevo producto al cache
      queryClient.setQueryData(productKeys.detail(newProduct.id), newProduct);
    },
    onError: (error) => {
      console.error('Create product error:', error);
    },
  });
};

// Hook para actualizar producto
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductRequest }) => 
      productService.updateProduct(id, data),
    onSuccess: (updatedProduct) => {
      // Actualizar el producto en el cache
      queryClient.setQueryData(productKeys.detail(updatedProduct.id), updatedProduct);
      // Invalidar lista de productos
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error('Update product error:', error);
    },
  });
};

// Hook para eliminar producto
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: (_, deletedId) => {
      // Remover el producto del cache
      queryClient.removeQueries({ queryKey: productKeys.detail(deletedId) });
      // Invalidar lista de productos
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
    },
    onError: (error) => {
      console.error('Delete product error:', error);
    },
  });
};

// Hook para obtener categorías
export const useCategories = () => {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: () => productService.getCategories(),
    staleTime: 1000 * 60 * 30, // 30 minutos
  });
};

// Hook para buscar productos
export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: productKeys.search(query),
    queryFn: () => productService.searchProducts(query),
    enabled: query.length > 2, // Solo buscar si hay al menos 3 caracteres
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

// Hook para obtener productos por categoría
export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: [...productKeys.all, 'category', category],
    queryFn: () => productService.getProductsByCategory(category),
    enabled: !!category,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
};

// Hook para prefetch de producto (útil para hover effects)
export const usePrefetchProduct = () => {
  const queryClient = useQueryClient();
  
  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: productKeys.detail(id),
      queryFn: () => productService.getProductById(id),
      staleTime: 1000 * 60 * 10,
    });
  };
};