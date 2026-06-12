import React, { useEffect, useState } from "react";
import { productService } from "../../services/product.service";
import type { Product } from "../../types";
import ProductCard from "../../components/product/ProductCard";
import "./Products.css";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAll();
        setProducts(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError("ไม่สามารถโหลดข้อมูลสินค้าได้ โปรดลองใหม่อีกครั้ง");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="page products-page">
      <div className="products-header">
        <h1 className="products-title">All Products</h1>
        <p className="products-subtitle">
          Discover our full collection of minimalist and elegant pieces.
        </p>
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
