import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllProducts } from "../../services/productService";
import ProductCard from "../product/ProductCard";

const ProductsPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchQuery = new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts(); // Replace with API call to fetch products
        setProducts(fetchedProducts);
      } catch (error) {
        setError("Failed to load products");
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      // If no search query, show all products
      setFilteredProducts(
        products.filter(
          (product) =>
            product.price >= priceFilter.min && product.price <= priceFilter.max
        )
      );
    } else {
      // Filter products based on search query and price filter
      const filtered = products.filter((product) => {
        const matchesSearch = product.productName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesPrice =
          product.price >= priceFilter.min && product.price <= priceFilter.max;
        return matchesSearch && matchesPrice;
      });
      setFilteredProducts(filtered);
    }
  }, [searchQuery, priceFilter, products]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-center">Products</h1>

      {/* Price Filter */}
      <div className="row mb-4">
        <div className="col-md-6">
          <label>Min Price</label>
          <input
            type="number"
            className="form-control"
            value={priceFilter.min}
            onChange={(e) => {
              const value = e.target.value;
              setPriceFilter({
                ...priceFilter,
                min: value === "" ? 0 : Number(value),
              });
            }}
            placeholder="Min"
          />
        </div>
        <div className="col-md-6">
          <label>Max Price</label>
          <input
            type="number"
            className="form-control"
            value={priceFilter.max === Infinity ? "" : priceFilter.max}
            onChange={(e) => {
              const value = e.target.value;
              setPriceFilter({
                ...priceFilter,
                max: value === "" ? Infinity : Number(value),
              });
            }}
            placeholder="Max"
          />
        </div>
      </div>

      {/* Product List */}
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-4" key={product.productId}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
