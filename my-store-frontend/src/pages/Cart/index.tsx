import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../../context";
import { ROUTES } from "../../constants";
import { formatPrice, getImageUrl } from "../../utils";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import "./Cart.css";

const Cart: React.FC = () => {
  const { items, totalItems, totalPrice, loading, updateQuantity, removeItem } =
    useCartContext();
  const navigate = useNavigate();

  if (loading && items.length === 0) {
    return (
      <div className="page cart-page">
        <div className="cart-loading">Loading your cart...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="page cart-page cart-empty">
        <ShoppingBag size={64} className="cart-empty-icon" />
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to={ROUTES.PRODUCTS} className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-layout">
        <div className="cart-items-section">
          {items.map((item) => (
            <div key={item.cart_id} className="cart-item">
              <Link to={ROUTES.PRODUCT_DETAIL.replace(":id", String(item.product.product_id))} className="cart-item-image-wrapper">
                <img
                  src={getImageUrl(item.product.image || "")}
                  alt={item.product.title}
                  className="cart-item-image"
                />
              </Link>

              <div className="cart-item-details">
                <div className="cart-item-header">
                  <h3>
                    <Link to={ROUTES.PRODUCT_DETAIL.replace(":id", String(item.product.product_id))}>
                      {item.product.title}
                    </Link>
                  </h3>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeItem(item.cart_id)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="cart-item-price">
                  {formatPrice(item.product.unit_price)}
                </div>

                <div className="cart-item-controls">
                  <div className="quantity-selector">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.cart_id, item.quantity - 1)}
                      disabled={loading || item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.cart_id, item.quantity + 1)}
                      disabled={loading || item.quantity >= item.product.available_quantity}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="cart-item-subtotal">
                    {formatPrice(item.product.unit_price * item.quantity)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary-section">
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal ({totalItems} items)</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <button
              className="btn-primary checkout-btn"
              onClick={() => navigate(ROUTES.CHECKOUT)}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
