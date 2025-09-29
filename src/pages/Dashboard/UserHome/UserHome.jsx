import { useEffect, useState } from "react";
import { FaCalendarCheck, FaClipboardList, FaCreditCard, FaPhone, FaShoppingBag, FaStar, FaStore } from "react-icons/fa";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseCart from "../../../Hooks/UseCart";

const UserHome = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [cart] = UseCart();
  const [totalPay, setTotalPay] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchPayments = async () => {
      try {
        const response = await axiosSecure.get(`/payments/${user.email}`);
        setTotalPay(response.data); 
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    };

    fetchPayments();
  }, [user?.email]);

//   console.log(totalPay);
  return (
    <div className="p-6 space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Menu Card */}
        <div className="card  bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] shadow-md rounded-xl p-4">
          <div className="flex justify-center items-center gap-4 text-white">
            <FaShoppingBag className="text-4xl" />
            <div>
                 <p className="text-sm font-medium">Menu</p>
              <h2 className="text-2xl font-bold">200</h2>
             
            </div>
          </div>
        </div>

        {/* Shop Card */}
        <div className="card bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] shadow-md rounded-xl p-4">
          <div className="flex justify-center items-center gap-4 text-white">
            <FaStore className="text-4xl " />
            <div>
              
              <p className="text-sm font-medium">Shop</p>
              <h2 className="text-2xl font-bold">15</h2>
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className="card bg-gradient-to-r from-[#FE4880] to-[#FECDE9] shadow-md rounded-xl p-4">
          <div className="flex justify-center items-center gap-4 text-white">
            <FaPhone className="text-4xl" />
            <div>
              
              <p className="text-sm font-medium">Contact</p>
              <h2 className="text-2xl font-bold">5</h2>
            </div>
          </div>
        </div>
      </div>

      {/* User Info + Activities */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* User Info */}
        <div className="card bg-[#FFEDD5] shadow-md rounded-xl p-6 w-full md:w-1/3">
          <div className="flex items-center gap-4">
            <img src={user.photoURL} alt="User" className="w-16 h-16 rounded-full" />

             <div>
                <h2>Welcome back...</h2>
                <h2 className="text-lg font-semibold">{user.displayName}</h2>
             </div>
          </div>
        </div>

        {/* Activities */}
        <div className="card bg-[#FEF9C3] shadow-md rounded-xl p-6 w-full md:w-2/3">
          <h2 className="text-lg font-semibold mb-4">Your Activities</h2>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex items-center gap-4">
              <FaClipboardList className="text-2xl text-yellow-500" />
              <div>
                <p>Total Orders</p>
                <span className="font-bold">{cart.length}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaStar className="text-2xl text-green-500" />
              <div>
                <p>Reviews</p>
                <span className="font-bold">0</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaCalendarCheck className="text-2xl text-blue-500" />
              <div>
                <p>Bookings</p>
                <span className="font-bold">0</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaCreditCard className="text-2xl text-pink-500" />
              <div>
                <p>Payments</p>
                <span className="font-bold">{totalPay.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
