import React, { useEffect, useState } from "react";
import { orderService } from "../../services/order.service";
import type { SellerOrderItem } from "../../types";
import { ORDER_STATUS_LABEL } from "../../constants";
import { formatPrice, formatDate } from "../../utils";
import { Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import "./SellerOrders.css";

const SellerOrders: React.FC = () => {
  const [orders, setOrders] = useState<SellerOrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [itemToCancel, setItemToCancel] = useState<number | null>(null);

  useEffect(() => {
    fetchSellerOrders();
  }, []);

  const fetchSellerOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getSellerOrders();
      setOrders(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to fetch your orders");
    } finally {
      setLoading(false);
    }
  };

  const executeStatusUpdate = async (orderItemId: number, newStatus: string) => {
    try {
      setUpdatingId(orderItemId);
      await orderService.updateSellerOrderItemStatus(orderItemId, newStatus);
      toast.success("Order status updated successfully");
      
      // Update local state
      setOrders((prev) =>
        prev.map((item) =>
          item.order_item_id === orderItemId ? { ...item, status: newStatus } : item
        )
      );
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleStatusChange = async (orderItemId: number, newStatus: string) => {
    if (newStatus === "cancelled") {
      setItemToCancel(orderItemId);
      setCancelModalOpen(true);
      return;
    }
    await executeStatusUpdate(orderItemId, newStatus);
  };

  const confirmCancellation = async () => {
    if (itemToCancel !== null) {
      setCancelModalOpen(false);
      await executeStatusUpdate(itemToCancel, "cancelled");
      setItemToCancel(null);
    }
  };

  const getStatusIcon = (status: string | undefined) => {
    switch (status) {
      case "pending":
        return <Clock size={16} className="status-icon pending" />;
      case "processing":
        return <Package size={16} className="status-icon processing" />;
      case "shipped":
        return <Truck size={16} className="status-icon shipped" />;
      case "delivered":
        return <CheckCircle size={16} className="status-icon delivered" />;
      case "cancelled":
        return <XCircle size={16} className="status-icon cancelled" />;
      default:
        return <Package size={16} className="status-icon" />;
    }
  };

  if (loading) {
    return (
      <div className="page seller-orders-page">
        <div className="loading-state">Loading your orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page seller-orders-page">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="page seller-orders-page">
      <div className="seller-orders-header">
        <h1>Manage Your Orders</h1>
        <p>Update the shipping status for items ordered from your store.</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <Package size={48} className="empty-icon" />
          <h2>No orders yet</h2>
          <p>When buyers purchase your products, their orders will appear here.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="seller-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Buyer</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr key={item.order_item_id}>
                  <td className="fw-500">#{item.order_id}</td>
                  <td>{formatDate(item.order_date)}</td>
                  <td>{item.buyer_name}</td>
                  <td>
                    <div className="product-cell">
                      <span className="product-title" title={item.product_title || item.product.title}>
                        {item.product_title || item.product.title}
                      </span>
                    </div>
                  </td>
                  <td>{item.quantity}</td>
                  <td className="fw-600">{formatPrice(item.unit_price * item.quantity)}</td>
                  <td>
                    <div className={`status-badge status-${item.status || "pending"}`}>
                      {getStatusIcon(item.status)}
                      <span>{ORDER_STATUS_LABEL[item.status || "pending"] || item.status}</span>
                    </div>
                  </td>
                  <td>
                    <select
                      className="status-select"
                      value={item.status || "pending"}
                      onChange={(e) => handleStatusChange(item.order_item_id, e.target.value)}
                      disabled={updatingId === item.order_item_id || item.status === "delivered" || item.status === "cancelled"}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {cancelModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <XCircle size={32} className="modal-icon-black" />
              <h2>Cancel Order Item</h2>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to cancel this item?</p>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setCancelModalOpen(false)}>
                No
              </button>
              <button className="btn-black" onClick={confirmCancellation}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerOrders;
