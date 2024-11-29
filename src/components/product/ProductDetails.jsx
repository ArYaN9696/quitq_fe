import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import ProductCard from './ProductCard';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        setProduct(response);
      } catch (error) {
        setError("Failed to load product details");
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
    else {
      setError("Product ID is missing");
      setLoading(false);
    }
  }, [productId]);

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      {product && (
        <ProductCard product={product} detailed={true} onAddToCart={() => console.log('Add to cart')} />
      )}
    </div>
  );
};

export default ProductDetails;
