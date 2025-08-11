import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { mockProducts } from '@/lib/mockData';

const mockProduct = mockProducts[0];

describe('ProductCard', () => {
  it('should render product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    // Check product name
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    
    // Check product category
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    
    // Check product description
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    
    // Check formatted price
    expect(screen.getByText('S/ 2,999.99')).toBeInTheDocument();
    
    // Check stock information
    expect(screen.getByText('25 unidades')).toBeInTheDocument();
    expect(screen.getByText('En stock')).toBeInTheDocument();
  });
  
  it('should call onEdit when edit button is clicked', () => {
    const mockOnEdit = vi.fn();
    render(<ProductCard product={mockProduct} onEdit={mockOnEdit} />);
    
    const editButton = screen.getByText('Editar');
    fireEvent.click(editButton);
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockProduct);
  });
  
  it('should call onDelete when delete button is clicked', () => {
    const mockOnDelete = vi.fn();
    render(<ProductCard product={mockProduct} onDelete={mockOnDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: '' }); // Delete button has no text, only icon
    fireEvent.click(deleteButton);
    
    expect(mockOnDelete).toHaveBeenCalledWith(mockProduct.id);
  });
  
  it('should show low stock warning for products with stock < 10', () => {
    const lowStockProduct = { ...mockProduct, stock: 5 };
    render(<ProductCard product={lowStockProduct} />);
    
    expect(screen.getByText('Stock bajo')).toBeInTheDocument();
  });
  
  it('should show out of stock for products with stock = 0', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(<ProductCard product={outOfStockProduct} />);
    
    expect(screen.getByText('Sin stock')).toBeInTheDocument();
  });
  
  it('should show inactive badge for inactive products', () => {
    const inactiveProduct = { ...mockProduct, isActive: false };
    render(<ProductCard product={inactiveProduct} />);
    
    expect(screen.getByText('Inactivo')).toBeInTheDocument();
  });
});