import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants";
import { formatPrice } from "../../../utils";
import type { Product } from "../../../types";
import { ShoppingBag } from "lucide-react";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Use placeholder image if backend doesn't provide one
  const imageUrl =
    product.image ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800";

  return (
    <div className="product-card">
      <Link
        to={ROUTES.PRODUCT_DETAIL.replace(":id", String(product.product_id))}
        className="product-card__image-container"
      >
        <img
          src={imageUrl}
          alt={product.title}
          className="product-card__image"
        />
        {product.available_quantity <= 0 && (
          <div className="product-card__badge product-card__badge--sold-out">
            Sold Out
          </div>
        )}
      </Link>
      <div className="product-card__content">
        <h3 className="product-card__title">
          <Link
            to={ROUTES.PRODUCT_DETAIL.replace(
              ":id",
              String(product.product_id),
            )}
          >
            {product.title}
          </Link>
        </h3>
        <p className="product-card__price">{formatPrice(product.unit_price)}</p>

        <button
          className="product-card__add-btn"
          disabled={product.available_quantity <= 0}
          aria-label="Add to cart"
        >
          <ShoppingBag size={18} className="add-icon" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
