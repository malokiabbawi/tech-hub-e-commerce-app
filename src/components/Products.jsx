// Products.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Products.css'; 

const mockProducts = [
  { id: 1, name: 'Product 1', price: 25, description: 'Description 1', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Product 2', price: 40, description: 'Description 2', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Product 3', price: 60, description: 'Description 3', image: 'https://via.placeholder.com/150' },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button onClick={() => setViewMode('grid')}>🔲 Grid View</button>
        <button onClick={() => setViewMode('list')} style={{ marginLeft: '0.5rem' }}>📄 List View</button>
      </div>

      <div className={viewMode === 'grid' ? 'product-grid' : 'product-list'}>
        {products.map(product => (
          <Link to={`/products/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="product-card">
              <img src={product.image} alt={product.name} />
              <div>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
