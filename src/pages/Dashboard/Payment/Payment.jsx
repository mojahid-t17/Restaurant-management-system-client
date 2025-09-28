import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseAuth from "../../../Hooks/UseAuth";
import CheckOutForm from "./CheckOutForm";

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)
    const {user}=UseAuth()
    useEffect(() => {
        document.title = "Payment"; 
      }, []);
    return (
        <div className="mt-5">
            <SectionTitle title="Pay Your Order" subtitle={`Welcome ${user.displayName}`}></SectionTitle>
            <Elements stripe={stripePromise}>
                <CheckOutForm></CheckOutForm>
            </Elements>
            
        </div>
    );
};

export default Payment;