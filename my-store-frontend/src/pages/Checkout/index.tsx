import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../context";
import { orderService } from "../../services/order.service";
import { ROUTES } from "../../constants";
import { formatPrice } from "../../utils";
import toast from "react-hot-toast";
import "./Checkout.css";

const Checkout: React.FC = () => {
  const { items, totalItems, totalPrice, fetchCart } = useCartContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (items.length === 0 && !loading) {
    return (
      <div className="page checkout-page checkout-empty">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate(ROUTES.PRODUCTS)} className="btn-primary">
          Return to Shop
        </button>
      </div>
    );
  }

  const handleCheckout = async () => {
    try {
      setLoading(true);
      await orderService.checkout();
      toast.success("Order placed successfully!");
      await fetchCart(); // Cart is cleared on backend, this syncs frontend
      navigate(ROUTES.ORDERS);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Checkout failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page checkout-page">
      <h1 className="checkout-title">Checkout</h1>
      
      <div className="checkout-layout">
        <div className="checkout-details">
          <div className="checkout-section">
            <h2>Order Items ({totalItems})</h2>
            <div className="checkout-items-list">
              {items.map((item) => (
                <div key={item.cart_id} className="checkout-item-row">
                  <span className="checkout-item-title">
                    {item.quantity}x {item.product.title}
                  </span>
                  <span className="checkout-item-price">
                    {formatPrice(item.quantity * item.product.unit_price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="checkout-summary-wrapper">
          <div className="checkout-summary">
            <h2>Final Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total-row">
              <span>Total to Pay</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            
            <button 
              className="btn-primary confirm-btn"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
