import React, { useState, useEffect } from 'react';
import { Product, CreateProductRequest, UpdateProductRequest } from '@/types';
import { useCategories, useCreateProduct, useUpdateProduct } from '@/hooks';
import { Button, Input, Modal } from '@/components/common';

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSuccess?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  isOpen,
  onClose,
  product,
  onSuccess
}) => {
  const { data: categories = [] } = useCategories();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  
  const isEditing = !!product;
  
  const [formData, setFormData] = useState<CreateProductRequest>({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    imageUrl: ''
  });
  
  const [errors, setErrors] = useState<Partial<CreateProductRequest>>({});

  // Cargar datos del producto si estamos editando
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        stock: product.stock,
        imageUrl: product.imageUrl || ''
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: '',
        stock: 0,
        imageUrl: ''
      });
    }
    setErrors({});
  }, [product, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateProductRequest> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    
    if (!formData.category) {
      newErrors.category = 'La categoría es requerida';
    }
    
    if (formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }
    
    if (formData.stock < 0) {
      newErrors.stock = 'El stock no puede ser negativo';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (isEditing) {
        await updateProductMutation.mutateAsync({
          id: product!.id,
          data: formData as UpdateProductRequest
        });
      } else {
        await createProductMutation.mutateAsync(formData);
      }
      
      onSuccess?.();
      onClose();
    } catch (error: any) {
      setErrors({ name: error.message || 'Error al guardar el producto' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof CreateProductRequest]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const isLoading = createProductMutation.isPending || updateProductMutation.isPending;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Nombre del Producto"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Ej: iPhone 15 Pro"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`input-field ${errors.category ? 'border-red-500 focus:ring-red-500' : ''}`}
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>
          
          <Input
            label="Precio (PEN)"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            error={errors.price}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
          
          <Input
            label="Stock"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            error={errors.stock}
            placeholder="0"
            min="0"
          />
          
          <Input
            label="URL de Imagen (opcional)"
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            error={errors.imageUrl}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`input-field ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Describe las características principales del producto..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>
        
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          
          <Button
            type="submit"
            isLoading={isLoading}
          >
            {isEditing ? 'Actualizar' : 'Crear'} Producto
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductForm;