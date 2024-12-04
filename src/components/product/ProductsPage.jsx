import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllProducts } from "../../services/productService";
import ProductCard from "../product/ProductCard";

const ProductsPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });

  const searchQuery = new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.productName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPrice =
        product.price >= priceFilter.min && product.price <= priceFilter.max;
      return matchesSearch && matchesPrice;
    });

    // Reset filtered products when searchQuery is cleared
    if (searchQuery === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(filtered);
    }
  }, [searchQuery, priceFilter, products]);

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
            onChange={(e) =>
              setPriceFilter({ ...priceFilter, min: Number(e.target.value) })
            }
          />
        </div>
        <div className="col-md-6">
          <label>Max Price</label>
          <input
            type="number"
            className="form-control"
            value={priceFilter.max}
            onChange={(e) =>
              setPriceFilter({ ...priceFilter, max: Number(e.target.value) })
            }
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
