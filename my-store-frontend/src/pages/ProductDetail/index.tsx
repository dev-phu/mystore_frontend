import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService } from "../../services/product.service";
import type { Product } from "../../types";
import { useCartContext } from "../../context";
import { ROUTES } from "../../constants";
import { formatPrice } from "../../utils";
import { ArrowLeft, ShoppingBag, Minus, Plus } from "lucide-react";
import "./ProductDetail.css";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartContext();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (!id) throw new Error("Product ID is missing");
        const data = await productService.getById(Number(id));
        setProduct(data);
        setError(null);
      } catch (err: unknown) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details or product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  const increaseQuantity = () => {
    if (product && quantity < product.available_quantity) {
      setQuantity((q) => q + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  if (loading) {
    return (
      <div className="page product-detail-page">
        <div className="product-detail-loading">
          <div className="spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page product-detail-page">
        <div className="product-detail-error">
          <h2>Oops!</h2>
          <p>{error || "Product not found"}</p>
          <button onClick={() => navigate(ROUTES.PRODUCTS)} className="btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const imageUrl =
    product.image ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800";
  const isOutOfStock = product.available_quantity <= 0;

  return (
    <div className="page product-detail-page">
      <button onClick={() => navigate(ROUTES.PRODUCTS)} className="back-button">
        <ArrowLeft size={20} /> Back to Products
      </button>

      <div className="product-detail-container">
        {/* Left Column - Image */}
        <div className="product-detail-image-section">
          <img src={imageUrl} alt={product.title} className="product-detail-image" />
          {isOutOfStock && (
            <div className="product-detail-badge">Sold Out</div>
          )}
        </div>

        {/* Right Column - Info */}
        <div className="product-detail-info-section">
          <h1 className="product-detail-title">{product.title}</h1>
          <p className="product-detail-price">{formatPrice(product.unit_price)}</p>

          <div className="product-detail-description">
            <h3>Description</h3>
            <p>{product.description || "No description available for this product."}</p>
          </div>

          <div className="product-detail-availability">
            <span className="availability-label">Availability:</span>
            <span
              className={`availability-value ${
                isOutOfStock ? "out-of-stock" : "in-stock"
              }`}
            >
              {isOutOfStock
                ? "Out of Stock"
                : `In Stock (${product.available_quantity} available)`}
            </span>
          </div>

          <div className="product-detail-actions">
            {!isOutOfStock && (
              <div className="quantity-selector">
                <button onClick={decreaseQuantity} disabled={quantity <= 1} className="qty-btn">
                  <Minus size={16} />
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  disabled={quantity >= product.available_quantity}
                  className="qty-btn"
                >
                  <Plus size={16} />
                </button>
              </div>
            )}

            <button
              className="btn-primary add-to-cart-large"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              <ShoppingBag size={20} />
              {isOutOfStock ? "Sold Out" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
