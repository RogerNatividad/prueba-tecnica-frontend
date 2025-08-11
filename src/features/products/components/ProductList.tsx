import React, { useState } from 'react';
import { useProducts, useCategories, useDeleteProduct } from '@/hooks';
import { Product, ProductFilters, PaginationParams, ProductsResponse } from '@/types';
import { Button, Input, Loading, ErrorMessage } from '@/components/common';
import { mockProducts } from '@/lib/mockData';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';

const ProductList: React.FC = () => {
  const [filters, setFilters] = useState<ProductFilters>({});
  const [pagination, setPagination] = useState<PaginationParams>({
    page: 1,
    limit: 12,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: productsResponse, isLoading, error, refetch } = useProducts(filters, pagination);
  const { data: categories = [] } = useCategories();
  const deleteProductMutation = useDeleteProduct();

  // Forzar el uso de mockProducts si no hay datos
  const displayProducts = (productsResponse as ProductsResponse)?.products?.length > 0 
    ? (productsResponse as ProductsResponse).products 
    : mockProducts;
  const displayTotal = (productsResponse as ProductsResponse)?.total ?? mockProducts.length;

  console.log('ProductList render:', {
    productsResponse,
    isLoading,
    displayProducts: displayProducts.length,
    displayTotal
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchTerm }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProductMutation.mutateAsync(productId);
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  };

  const handleCreateNew = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  if (error) {
    return (
      <ErrorMessage 
        message={error.message || 'Error al cargar los productos'} 
        onRetry={refetch}
      />
    );
  }

  // Variables seguras para paginación
  const currentPage = (productsResponse as ProductsResponse)?.page ?? pagination.page ?? 1;
  const totalPages = Math.ceil(displayTotal / (pagination.limit ?? 12));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
          <p className="text-gray-600 mt-1">
            Gestiona el catálogo de productos de Real Plaza
          </p>
        </div>
        
        <Button onClick={handleCreateNew}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nuevo Producto
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="md:col-span-2">
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              rightIcon={
                <button type="submit" className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              }
            />
          </form>
          
          {/* Category Filter */}
          <div>
            <select
              value={filters.category || ''}
              onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
              className="input-field"
            >
              <option value="">Todas las categorías</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          {/* Status Filter */}
          <div>
            <select
              value={filters.isActive === undefined ? '' : filters.isActive.toString()}
              onChange={(e) => {
                const value = e.target.value;
                handleFilterChange('isActive', value === '' ? undefined : value === 'true');
              }}
              className="input-field"
            >
              <option value="">Todos los estados</option>
              <option value="true">Activos</option>
              <option value="false">Inactivos</option>
            </select>
          </div>
        </div>
        
        {/* Price Range */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Input
            type="number"
            placeholder="Precio mínimo"
            value={filters.minPrice?.toString() || ''}
            onChange={(e) => handleFilterChange('minPrice', parseFloat(e.target.value) || undefined)}
            min="0"
            step="0.01"
          />
          
          <Input
            type="number"
            placeholder="Precio máximo"
            value={filters.maxPrice?.toString() || ''}
            onChange={(e) => handleFilterChange('maxPrice', parseFloat(e.target.value) || undefined)}
            min="0"
            step="0.01"
          />
          
          <Button variant="outline" onClick={clearFilters}>
            Limpiar Filtros
          </Button>
        </div>
      </div>

      {/* Results */}
      {isLoading ? (
        <Loading size="lg" text="Cargando productos..." />
      ) : (
        <>
          {/* Results Info */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              {displayTotal} productos encontrados
            </p>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Ordenar por:</span>
              <select
                value={`${pagination.sortBy}-${pagination.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  setPagination(prev => ({ ...prev, sortBy, sortOrder: sortOrder as 'asc' | 'desc' }));
                }}
                className="text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="createdAt-desc">Más recientes</option>
                <option value="createdAt-asc">Más antiguos</option>
                <option value="name-asc">Nombre A-Z</option>
                <option value="name-desc">Nombre Z-A</option>
                <option value="price-asc">Precio menor</option>
                <option value="price-desc">Precio mayor</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {displayProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-600 mb-4">
                Intenta ajustar los filtros o crear un nuevo producto.
              </p>
              <Button onClick={handleCreateNew}>
                Crear Primer Producto
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayProducts.map((product: Product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              
              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 text-sm rounded ${
                      page === currentPage
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </Button>
            </div>
          )}
        </>
      )}

      {/* Product Form Modal */}
      <ProductForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        product={selectedProduct}
        onSuccess={() => refetch()}
      />
    </div>
  );
};

export default ProductList;