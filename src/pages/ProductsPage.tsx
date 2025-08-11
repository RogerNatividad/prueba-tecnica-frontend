import React from 'react';
import { ProductList } from '@/features/products';

const ProductsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductList />
    </div>
  );
};

export default ProductsPage;