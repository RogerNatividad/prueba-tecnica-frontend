import { 
  Product, 
  CreateProductRequest, 
  UpdateProductRequest, 
  ProductFilters, 
  ProductsResponse,
  PaginationParams 
} from '@/types';
import { mockProducts, mockCategories, simulateNetworkDelay } from '@/lib/mockData';
import { authService } from './auth.service';

class ProductService {
  private products: Product[] = [...mockProducts];

  // Obtener todos los productos con filtros y paginación
  async getProducts(
    filters: ProductFilters = {}, 
    pagination: PaginationParams = {}
  ): Promise<ProductsResponse> {
    console.log('ProductService.getProducts called with:', { filters, pagination });
    console.log('Available products:', this.products.length);
    await simulateNetworkDelay(600);

    let filteredProducts = [...this.products];

    // Aplicar filtros
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category === filters.category
      );
    }

    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= filters.minPrice!
      );
    }

    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= filters.maxPrice!
      );
    }

    if (filters.isActive !== undefined) {
      filteredProducts = filteredProducts.filter(product => 
        product.isActive === filters.isActive
      );
    }

    // Aplicar ordenamiento
    if (pagination.sortBy) {
      filteredProducts.sort((a, b) => {
        const aValue = a[pagination.sortBy as keyof Product];
        const bValue = b[pagination.sortBy as keyof Product];
        
        if (pagination.sortOrder === 'desc') {
          return aValue > bValue ? -1 : 1;
        }
        return aValue < bValue ? -1 : 1;
      });
    }

    // Aplicar paginación
    const page = pagination.page || 1;
    const limit = pagination.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total: filteredProducts.length,
      page,
      limit,
      totalPages: Math.ceil(filteredProducts.length / limit),
    };
  }

  // Obtener producto por ID
  async getProductById(id: string): Promise<Product> {
    await simulateNetworkDelay(400);
    
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    
    return product;
  }

  // Crear nuevo producto
  async createProduct(productData: CreateProductRequest): Promise<Product> {
    await simulateNetworkDelay(800);
    
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    const newProduct: Product = {
      id: (this.products.length + 1).toString(),
      ...productData,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: currentUser.id,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  // Actualizar producto
  async updateProduct(id: string, productData: UpdateProductRequest): Promise<Product> {
    await simulateNetworkDelay(600);
    
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    const updatedProduct: Product = {
      ...this.products[productIndex],
      ...productData,
      updatedAt: new Date().toISOString(),
    };

    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  // Eliminar producto
  async deleteProduct(id: string): Promise<void> {
    await simulateNetworkDelay(500);
    
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    this.products.splice(productIndex, 1);
  }

  // Obtener categorías disponibles
  async getCategories(): Promise<string[]> {
    await simulateNetworkDelay(300);
    return [...mockCategories];
  }

  // Buscar productos
  async searchProducts(query: string): Promise<Product[]> {
    await simulateNetworkDelay(400);
    
    const searchTerm = query.toLowerCase();
    return this.products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  // Obtener productos por categoría
  async getProductsByCategory(category: string): Promise<Product[]> {
    await simulateNetworkDelay(500);
    
    return this.products.filter(product => 
      product.category === category && product.isActive
    );
  }
}

export const productService = new ProductService();
export default productService;