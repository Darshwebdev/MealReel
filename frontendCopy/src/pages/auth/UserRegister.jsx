// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import "../../styles/style.css";
// import axios from 'axios';

// const UserRegister = () => {
//   const navigate = useNavigate();

//   const [step, setStep] = useState(1); // 1=email, 2=otp, 3=details
//   const [timer, setTimer] = useState(30);

//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("");

//   // ⏱ Timer for resend
//   useEffect(() => {
//     if (step === 2 && timer > 0) {
//       const t = setTimeout(() => setTimer(timer - 1), 1000);
//       return () => clearTimeout(t);
//     }
//   }, [timer, step]);

//   // 🧑‍💻 Final Register
//   const registerUser = async (e) => {
//     e.preventDefault();

//     const response = await axios.post(
//       "https://mealreel.onrender.com/api/auth/user/register",
//       {
//         fullName: firstName + " " + lastName,
//         email,
//         password
//       },
//       { withCredentials: true }
//     );

//     console.log(response.data);
//     navigate("/");
//   };

//   return (
//     <div className="page-container">
//       <div className="form-box premium-card">

//         <div className="top-icon">Register</div>

//         <div className="toggle-tabs">
//           <a href="/user/register" className="tab active">User Register</a>
//           <a href="/food-partner/register" className="tab">FoodPartner Register</a>
//         </div>

//         {/* STEP 1 – EMAIL */}
//         {step === 1 && (
//           <>
//             <div className="input-group">
//               <span className="input-icon">✉️</span>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 required
//                 onChange={e => setEmail(e.target.value)}
//               />
//             </div>

//           </>
//         )}

//         {/* STEP 3 – DETAILS */}
//         {step === 3 && (
//           <form onSubmit={registerUser}>
//             <div className="input-group">
//               <span className="input-icon">👤</span>
//               <div style={{ display: 'flex', gap: '12px' }}>
//                 <input
//                   placeholder="First Name"
//                   required
//                   onChange={e => setFirstName(e.target.value)}
//                 />
//                 <input
//                   placeholder="Last Name"
//                   required
//                   onChange={e => setLastName(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="input-group">
//               <span className="input-icon">🔒</span>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 required
//                 onChange={e => setPassword(e.target.value)}
//               />
//             </div>

//             <button type="submit" className="register-btn">
//               Create User Account
//             </button>
//           </form>
//         )}

//         <p className="text-link">
//           Already have an account? <a href="/user/login">Login</a>
//         </p>

//       </div>
//     </div>
//   );
// };

// export default UserRegister;
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/style.css";
import axios from "axios";

const UserRegister = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://mealreel.onrender.com/api/auth/user/register",
        {
          fullName,
          email,
          password,
        },
        { withCredentials: true },
      );

      // console.log(response.data);

      // optional: store user in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/");
    } catch (error) {
      console.error(error.response?.data?.message || "Registration failed");
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="page-container">
      <div className="form-box premium-card">
        <div className="top-icon">Register</div>

        <div className="toggle-tabs">
          <Link to="/user/register" className="tab active">
            User Register
          </Link>
          <Link to="/food-partner/register" className="tab">
            FoodPartner Register
          </Link>
        </div>

        <form onSubmit={registerUser}>
          {/* Full Name */}
          <div className="input-group">
            <span className="input-icon">👤</span>
            <input
              type="text"
              placeholder="Full Name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <span className="input-icon">✉️</span>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="register-btn">
            Create User Account
          </button>
        </form>

        <p className="text-link">
          Already have an account? <Link to="/user/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
