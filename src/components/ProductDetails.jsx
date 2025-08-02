// ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const mockProducts = [
  { id: 1, name: 'Product 1', price: 25, description: 'Description 1', image: 'https://via.placeholder.com/300' },
  { id: 2, name: 'Product 2', price: 40, description: 'Description 2', image: 'https://via.placeholder.com/300' },
  { id: 3, name: 'Product 3', price: 60, description: 'Description 3', image: 'https://via.placeholder.com/300' },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = mockProducts.find(p => p.id === parseInt(id));
    setProduct(found);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ maxWidth: '300px' }} />
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
    </div>
  );
};

export default ProductDetails;
