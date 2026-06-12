import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { orderService } from "../../services/order.service";
import type { Order } from "../../types";
import { ROUTES, ORDER_STATUS_LABEL } from "../../constants";
import { formatPrice, formatDate } from "../../utils";
import { Package } from "lucide-react";
import "./Orders.css";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getOrderHistory();
        setOrders(data);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to fetch order history");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="page orders-page">
        <div className="orders-loading">Loading your orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page orders-page">
        <div className="orders-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="page orders-page orders-empty">
        <Package size={64} className="orders-empty-icon" />
        <h2>No Orders Yet</h2>
        <p>You haven't placed any orders. Start exploring our products!</p>
        <Link to={ROUTES.PRODUCTS} className="btn-primary">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="page orders-page">
      <h1 className="orders-title">My Orders</h1>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.order_id} className="order-card">
            <div className="order-header">
              <div className="order-header-info">
                <h3>Order #{order.order_id}</h3>
                <span className="order-date">
                  Placed on {formatDate(order.create_at || "")}
                </span>
              </div>
              <div className="order-header-status">
                <span className={`status-badge status-${order.status.toLowerCase()}`}>
                  {ORDER_STATUS_LABEL[order.status.toLowerCase()] || order.status}
                </span>
              </div>
            </div>

            <div className="order-items-list">
              {order.items?.map((item: any) => (
                <div key={item.order_item_id} className="order-item">
                  <div className="order-item-title">
                    <span className="order-item-qty">{item.quantity}x</span>{" "}
                    {item.product_title || `Product #${item.product}`}
                  </div>
                  <div className="order-item-price">
                    {formatPrice(item.unit_price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <span className="order-total-label">Total Amount:</span>
              <span className="order-total-value">{formatPrice(order.total_amount)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
