import React, { useState, useEffect } from "react";
import { productService } from "../../../services/product.service";
import type { Product } from "../../../types";
import { Plus, Trash2, Image as ImageIcon, Eye, EyeOff } from "lucide-react";
import "./AdminProducts.css";

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getMyProducts();
      setProducts(data);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch my products", err);
      setError("ไม่สามารถดึงข้อมูลสินค้าของคุณได้");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !unitPrice || !availableQuantity) {
      setError("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("unit_price", unitPrice);
      formData.append("available_quantity", availableQuantity);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await productService.create(formData);

      // Reset form
      setTitle("");
      setDescription("");
      setUnitPrice("");
      setAvailableQuantity("");
      setImageFile(null);
      setImagePreview(null);

      // Refresh product list
      await fetchMyProducts();
    } catch (err: any) {
      console.error("Error creating product", err);
      setError("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("คุณต้องการลบสินค้านี้ใช่หรือไม่?")) return;

    try {
      await productService.delete(id);
      // Instead of removing from list, update its is_active to false
      setProducts(products.map((p) => (p.product_id === id ? { ...p, is_active: false } : p)));
    } catch (err) {
      console.error("Failed to delete product", err);
      alert("ไม่สามารถลบสินค้าได้");
    }
  };

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      await productService.toggleActive(id, !currentStatus);
      setProducts(
        products.map((p) =>
          p.product_id === id ? { ...p, is_active: !currentStatus } : p
        )
      );
    } catch (err) {
      console.error("Failed to toggle product status", err);
      alert("ไม่สามารถเปลี่ยนสถานะสินค้าได้");
    }
  };

  return (
    <div className="page admin-products">
      <div className="admin-header">
        <h1 className="admin-title">Seller Dashboard</h1>
        <p className="admin-subtitle">Manage your products and inventory</p>
      </div>

      <div className="admin-content">
        {/* Add Product Form */}
        <div className="admin-card add-product-section">
          <h2>Add New Product</h2>
          {error && <div className="admin-error">{error}</div>}

          <form onSubmit={handleAddProduct} className="add-product-form">
            <div className="form-group">
              <label>Product Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Minimalist White T-Shirt"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed description of the product..."
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Unit Price ($) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            <div className="form-group">
              <label>Available Quantity *</label>
              <input
                type="number"
                min="0"
                value={availableQuantity}
                onChange={(e) => setAvailableQuantity(e.target.value)}
                placeholder="0"
                required
              />
            </div>

            <div className="form-group image-upload-group">
              <label>Product Image</label>
              <div className="image-upload-wrapper">
                {imagePreview ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="remove-image-btn"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="image-upload-box">
                    <ImageIcon size={32} />
                    <span>Click to upload image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden-input"
                    />
                  </label>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Adding..."
              ) : (
                <>
                  <Plus size={18} /> Add Product
                </>
              )}
            </button>
          </form>
        </div>

        {/* My Products List */}
        <div className="admin-card products-list-section">
          <h2>My Products</h2>

          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p className="no-products">You haven't listed any products yet.</p>
          ) : (
            <div className="products-table-container">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.product_id}>
                      <td>
                        <div className="table-img-wrapper">
                          <img
                            src={
                              product.image ||
                              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=150"
                            }
                            alt={product.title}
                          />
                        </div>
                      </td>
                      <td className="table-title">{product.title}</td>
                      <td>
                        ${parseFloat(product.unit_price.toString()).toFixed(2)}
                      </td>
                      <td>
                        <span
                          className={`stock-badge ${product.available_quantity > 0 ? "in-stock" : "out-of-stock"}`}
                        >
                          {product.available_quantity}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${product.is_active !== false ? "active" : "inactive"}`}>
                          {product.is_active !== false ? "Active" : "Hidden"}
                        </span>
                      </td>
                      <td>
                        <div className="actions-cell">
                          <button
                            onClick={() => handleToggleActive(product.product_id, product.is_active !== false)}
                            className="action-btn toggle-btn"
                            aria-label={product.is_active !== false ? "Hide Product" : "Show Product"}
                            title={product.is_active !== false ? "Hide Product" : "Show Product"}
                          >
                            {product.is_active !== false ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                          <button
                            onClick={() => handleDelete(product.product_id)}
                            className="action-btn delete-btn"
                            aria-label="Delete"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
