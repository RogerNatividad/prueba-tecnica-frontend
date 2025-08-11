import React from 'react';
import { Product } from '@/types';
import { Button } from '@/components/common';

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  onView?: (product: Product) => void;
  showActions?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  onView,
  showActions = true
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(price);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Sin stock', color: 'text-red-600 bg-red-100' };
    if (stock < 10) return { text: 'Stock bajo', color: 'text-yellow-600 bg-yellow-100' };
    return { text: 'En stock', color: 'text-green-600 bg-green-100' };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      {/* Image */}
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <img
          src={product.imageUrl || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400';
          }}
        />
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {product.category}
            </p>
          </div>
          
          {!product.isActive && (
            <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
              Inactivo
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3">
          {product.description}
        </p>

        {/* Price and Stock */}
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary-600">
            {formatPrice(product.price)}
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${stockStatus.color}`}>
              {stockStatus.text}
            </span>
            <span className="text-sm text-gray-500">
              {product.stock} unidades
            </span>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-2 pt-3 border-t border-gray-200">
            {onView && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(product)}
                className="flex-1"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Ver
              </Button>
            )}
            
            {onEdit && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEdit(product)}
                className="flex-1"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Editar
              </Button>
            )}
            
            {onDelete && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(product.id)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;