import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context";
import { authService } from "../../services";
import { User, Mail, Save } from "lucide-react";
import "./Profile.css";

const Profile: React.FC = () => {
  const { user, updateProfileContext } = useAuthContext();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const updatedUser = await authService.updateProfile(formData);
      updateProfileContext(updatedUser);
      setSuccessMsg("Profile updated successfully!");
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || "Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <div className="page profile-page"><div className="loading">Loading profile...</div></div>;
  }

  return (
    <div className="page profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <div className="profile-title">
            <h1>{user.username}</h1>
            <span className={`role-badge ${user.role.toLowerCase()}`}>
              {user.role}
            </span>
          </div>
        </div>

        <div className="profile-content">
          <form className="profile-form" onSubmit={handleSubmit}>
            {successMsg && <div className="alert alert-success">{successMsg}</div>}
            {errorMsg && <div className="alert alert-error">{errorMsg}</div>}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn-primary save-btn"
                disabled={isSubmitting}
              >
                <Save size={18} />
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
