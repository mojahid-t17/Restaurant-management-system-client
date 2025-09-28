import { useState } from "react";
import { FaCalendarAlt, FaCartArrowDown, FaUsers } from "react-icons/fa";
import { IoIosRestaurant, IoMdHome } from "react-icons/io";
import { IoClose, IoList, IoMenu } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../Hooks/UseAdmin";

const Dashboard = () => {
  const [isAdmin] = UseAdmin();
  const [isOpen, setIsOpen] = useState(false); // mobile sidebar toggle

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 uppercase rounded-md ${
      isActive ? "bg-[#B8873F] text-white font-bold" : "text-black hover:bg-[#E0C68C]"
    }`;

  // Function to close sidebar on mobile after clicking a link
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-[#D1A054] text-white p-2 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <IoMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#D1A054] z-40 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 md:translate-x-0 md:relative md:flex flex-col
        `}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end md:hidden p-4">
          <button onClick={() => setIsOpen(false)} className="text-white text-2xl">
            <IoClose />
          </button>
        </div>

        {/* Brand */}
        <div className="text-center md:text-left mb-8 mx-4 md:mx-8">
          <p className="text-2xl font-bold tracking-wider">FOODPILOT</p>
          <p className="text-sm tracking-[0.5em]">RESTAURANT</p>
        </div>

        <ul className="flex-1 space-y-2 md:space-y-5 px-4 md:px-0">
          {/* Admin/User Links */}
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/admin-home" className={navLinkClass} onClick={handleLinkClick}>
                  <IoMdHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems" className={navLinkClass} onClick={handleLinkClick}>
                  <IoIosRestaurant /> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems" className={navLinkClass} onClick={handleLinkClick}>
                  <IoList /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers" className={navLinkClass} onClick={handleLinkClick}>
                  <FaUsers /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/user-home" className={navLinkClass} onClick={handleLinkClick}>
                  <IoMdHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/payment" className={navLinkClass} onClick={handleLinkClick}>
                  <FaCalendarAlt /> Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory" className={navLinkClass} onClick={handleLinkClick}>
                  <FaCartArrowDown /> Payment History
                </NavLink>
              </li>
            </>
          )}

          {/* Divider */}
          <div className="divider"></div>

          {/* Common Links */}
          <li>
            <NavLink to="/" className={navLinkClass} onClick={handleLinkClick}>
              <IoMdHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu" className={navLinkClass} onClick={handleLinkClick}>
              <IoMenu /> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad" className={navLinkClass} onClick={handleLinkClick}>
              <IoMenu /> Order
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden" onClick={() => setIsOpen(false)}></div>}

      {/* Content Area */}
      <div className="flex-1 ml-0 md:ml-6 p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
