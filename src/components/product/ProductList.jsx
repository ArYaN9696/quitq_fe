import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getAllProducts } from '../../services/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response || []);
      } catch (error) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
