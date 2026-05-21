import { useState,useEffect} from "react";
import axios from "axios";
import { toast } from "sonner";
import "../styles/paymentcheckout.css";

const PaymentButton = ({ foodId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [mealPrice, setMealPrice] = useState(299); // Default fallback
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [mealName, setMealName] = useState("");
const [mealPrice, setMealPrice] = useState(0);

  
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
  // Guard against undefined foodId
  if (!foodId) {
    console.error("PaymentButton: foodId is required but missing!");
    return (
      <div className="error-box">Missing meal ID - check parent component</div>
    );
  }

useEffect(() => {
  const fetchFood = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/payment/${foodId}`,
        { withCredentials: true }
      );


      setMealName(res.data.name);
      setMealPrice(res.data.price);
    } catch (err) {
      console.error("Failed to fetch food:", err);
      setError("Unable to load food details");
    }
  };

  fetchFood();
}, [foodId]);


  const createAndOpenPayment = async (method = null) => {
    try {
      setLoading(true);
      setError(null);
      setPaymentMethod(method);

      // console.log("Creating payment for foodId:", foodId); // Debug log
  const scriptLoaded = await loadRazorpayScript();
      const { data: order } = await axios.post(
        "http://localhost:3000/api/payment/create-order",
        { foodId },
        { withCredentials: true }
      );

      // Update price from backend response
      // setMealPrice(order.amount / 100);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "MealReel",
        description: `${mealName} - ${method || "Card/UPI"}`,
        ...(method && {
          method: {
            upi: method === "upi",
            card: method === "card",
            netbanking: method === "netbanking",
            wallet: method === "wallet",
          },
        }),
         prefill: {
    name: "Test User",        // Required
    email: "test@example.com", // Required  
    contact: "9999999999",    // Required
  },
        handler: async (response) => {
          try {
            const verify = await axios.post(
              "http://localhost:3000/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );

            if (verify.data.success) {
              toast.success("Payment Successful 🎉");
              setTimeout(() => {
                window.location.href = "/MealReel";
              }, 1200);
            }
          } catch (err) {
            console.error("Verification failed:", err);
            setError("Payment verification failed.");
          } finally {
            setLoading(false);
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      };
// Add this function right after your useState hooks


      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      setError(`Payment failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };
// console.log("🔑 Frontend Key:", import.meta.env.VITE_RAZORPAY_KEY);
// console.log("🔑 Key length:", import.meta.env.VITE_RAZORPAY_KEY?.length);

  return (
    <div className="checkout-wrapper">
      <div className="checkout-card">
        <div className="checkout-header">
          <h3>{mealName}</h3>
          <span className="secure">🔒 Secure Payment</span>
        </div>

   <div className="amount">
  ₹{mealPrice ? mealPrice.toLocaleString() : "—"}
</div>


        <div className="methods">
          <button onClick={() => createAndOpenPayment("upi")}>UPI</button>
          <button onClick={() => createAndOpenPayment("card")}>Card</button>
          <button onClick={() => createAndOpenPayment("netbanking")}>
            NetBanking
          </button>
          <button onClick={() => createAndOpenPayment("wallet")}>Wallet</button>
        </div>

        {error && (
          <div className="error-box">
            {error}
            <button onClick={() => createAndOpenPayment(paymentMethod)}>
              Retry
            </button>
          </div>
        )}

        <button
          className={`pay-btn ${loading ? "loading" : ""}`}
          onClick={() => createAndOpenPayment()}
          disabled={loading}
        >
          {loading ? (
            <span className="spinner" />
          ) : (
            `Pay ₹${mealPrice.toLocaleString()}`

          )}
        </button>

        <div className="razorpay">
          <img
            src="https://razorpay.com/assets/razorpay-glyph.svg"
            alt="Razorpay"
          />
          <span>Powered by Razorpay</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentButton;