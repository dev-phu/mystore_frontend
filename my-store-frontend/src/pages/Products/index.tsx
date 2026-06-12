import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { productService } from "../../services/product.service";
import type { Product } from "../../types";
import ProductCard from "../../components/product/ProductCard";
import { Search } from "lucide-react";
import "./Products.css";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchTerm = searchParams.get("search") || "";
  const urlMinPrice = searchParams.get("minPrice") || "";
  const urlMaxPrice = searchParams.get("maxPrice") || "";

  const [searchTerm, setSearchTerm] = useState(urlSearchTerm);
  const [minPrice, setMinPrice] = useState(urlMinPrice);
  const [maxPrice, setMaxPrice] = useState(urlMaxPrice);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productService.getAll({
        search: urlSearchTerm || undefined,
        minPrice: urlMinPrice ? Number(urlMinPrice) : undefined,
        maxPrice: urlMaxPrice ? Number(urlMaxPrice) : undefined,
      });
      setProducts(data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [urlSearchTerm, urlMinPrice, urlMaxPrice]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setSearchTerm(urlSearchTerm);
    setMinPrice(urlMinPrice);
    setMaxPrice(urlMaxPrice);
  }, [urlSearchTerm, urlMinPrice, urlMaxPrice]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params: Record<string, string> = {};
    if (searchTerm.trim()) params.search = searchTerm.trim();
    if (minPrice.trim()) params.minPrice = minPrice.trim();
    if (maxPrice.trim()) params.maxPrice = maxPrice.trim();

    setSearchParams(params);
  };

  const handleClear = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSearchParams({});
  };

  return (
    <div className="page products-page">
      <div className="products-header">
        <div className="products-header-content">
          <h1 className="products-title">All Products</h1>
          <p className="products-subtitle">
            Discover our full collection of minimalist and elegant pieces.
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="products-search-minimal">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-minimal"
            />
          </div>

          <div className="price-inputs-wrapper">
            <input
              type="number"
              placeholder="Min $"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="price-input-minimal"
            />
            <span className="price-divider">-</span>
            <input
              type="number"
              placeholder="Max $"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="price-input-minimal"
            />
          </div>

          <button type="submit" className="btn-search-submit">
            Search
          </button>

          {(urlSearchTerm || urlMinPrice || urlMaxPrice) && (
            <button
              type="button"
              onClick={handleClear}
              className="btn-search-clear"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      {loading ? (
        <div className="products-loading">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : error ? (
        <div className="products-error">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="products-empty">
          <h2>No products found</h2>
          <p>We are updating our collection. Please check back later.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
