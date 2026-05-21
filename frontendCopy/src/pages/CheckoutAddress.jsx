// src/pages/CheckoutAddress.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/checkout.css";
import { useNavigate } from "react-router-dom";

const CheckoutAddress = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    house: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    instructions: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await axios.get("/api/address", { withCredentials: true });
        if (res.data) setAddress(res.data);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };
    fetchAddress();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    const requiredFields = [
      'fullName', 'phone', 'house', 'area', 'city', 'state', 'pincode'
    ];

    requiredFields.forEach(field => {
      if (!address[field]?.trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
      }
    });

    // Phone number validation (10 digits)
    if (address.phone && !/^\d{10}$/.test(address.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    // Pincode validation (6 digits)
    if (address.pincode && !/^\d{6}$/.test(address.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Please fill all required fields correctly");
      return;
    }

    try {
      const foodId = localStorage.getItem("foodId");
      await axios.post("http://localhost:3000/api/address", address, { withCredentials: true });
      alert("Address Saved Successfully");
      navigate(`/checkout/${foodId}`);
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Error saving address. Please try again.");
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <h2>Delivery Address</h2>

        <form className="form-grid" onSubmit={saveAddress} noValidate>
          <div>
            <input 
              name="fullName" 
              value={address.fullName} 
              onChange={handleChange} 
              placeholder="Full Name"
              className={errors.fullName ? "error" : ""}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div>
            <input 
              name="phone" 
              value={address.phone} 
              onChange={handleChange} 
              placeholder="Phone Number"
              className={errors.phone ? "error" : ""}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div>
            <input 
              name="house" 
              value={address.house} 
              onChange={handleChange} 
              placeholder="House / Flat No."
              className={errors.house ? "error" : ""}
            />
            {errors.house && <span className="error-message">{errors.house}</span>}
          </div>

          <div>
            <input 
              name="area" 
              value={address.area} 
              onChange={handleChange} 
              placeholder="Area / Street"
              className={errors.area ? "error" : ""}
            />
            {errors.area && <span className="error-message">{errors.area}</span>}
          </div>

          <div>
            <input 
              name="city" 
              value={address.city} 
              onChange={handleChange} 
              placeholder="City"
              className={errors.city ? "error" : ""}
            />
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>

          <div>
            <input 
              name="state" 
              value={address.state} 
              onChange={handleChange} 
              placeholder="State"
              className={errors.state ? "error" : ""}
            />
            {errors.state && <span className="error-message">{errors.state}</span>}
          </div>

          <div>
            <input 
              name="pincode" 
              value={address.pincode} 
              onChange={handleChange} 
              placeholder="Pincode"
              maxLength="6"
              className={errors.pincode ? "error" : ""}
            />
            {errors.pincode && <span className="error-message">{errors.pincode}</span>}
          </div>

          <div>
            <textarea 
              name="instructions" 
              value={address.instructions} 
              onChange={handleChange} 
              placeholder="Delivery Instructions"
              rows="3"
              // className={errors.instructions ? "error" : ""}
            />
            {errors.instructions && <span className="error-message">{errors.instructions}</span>}
          </div>

          <button 
            type="submit" 
            className="save-btn"
            // disabled={Object.keys(errors).length > 0}
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutAddress;
