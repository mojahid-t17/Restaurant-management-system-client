import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import moment from "moment";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseCart from "../../../Hooks/UseCart";

const CheckOutForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const [cart, refetch] = UseCart();

  // calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setErrorMessage(error.message);
    } else {
      setErrorMessage("");
      const amountInCent = totalPrice * 100;
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: amountInCent,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const transactionId = result.paymentIntent.id;
          const formattedDate = moment().local().format("YYYY-MM-DD HH:mm:ss");

          const paymentData = {
            email: user.email,
            price: totalPrice,
            transactionId,
            date: formattedDate,
            cartIds: cart.map((item) => item._id),
            menuItemIds: cart.map((item) => item.menuId),
            status: "Succeed",
          };

          const saveRes = await axiosSecure.post("/payments", paymentData);
          refetch();

          if (saveRes.data?.paymentResult?.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Thank you for your Transaction",
              html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/dashboard/paymentHistory");
          }
        }
      }
    }

    setLoading(false);
  }; 

  return (
    <div className="w-full  sm:max-w-lg  mx-auto mt-6 p-4 sm:p-6 bg-white shadow-lg rounded-xl border border-[#D1A054]/40">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#4A2C0A] text-center">
        Complete Payment
      </h2>

      {/* Display total amount */}
      <p className="text-center text-lg font-semibold text-[#4A2C0A] mb-4">
        Total Amount: <span className="text-[#D1A054]">${totalPrice.toFixed(2)}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Input */}
        <div className="border border-[#D1A054]/50 p-3 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#4A2C0A",
                  "::placeholder": { color: "#A4753D" },
                },
                invalid: { color: "#e53e3e" },
              },
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!stripe || loading || totalPrice <= 0}
          className="w-full bg-[#D1A054] text-white py-2 px-4 rounded-lg hover:bg-[#B8873F] transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        <Link to="/dashboard/cart" className="block text-center text-blue-500 underline">
          Tap to See your Order
        </Link>
      </form>

      {errorMessage && (
        <p className="mt-4 text-center text-red-500 font-medium">{errorMessage}</p>
      )}
    </div>
  );
};

export default CheckOutForm;
