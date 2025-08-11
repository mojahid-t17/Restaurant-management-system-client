import { FaBook, FaCalendarAlt, FaCartArrowDown, FaUsers } from "react-icons/fa";
import { IoIosRestaurant, IoMdHome } from "react-icons/io";
import { IoList, IoMenu } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../Hooks/UseAdmin";

const Dashboard = () => {
  const [isAdmin] = UseAdmin()


  // Common style function for NavLink
  const navLinkClass = ({ isActive }) =>
    `flex ms-8 px-3 items-center gap-2 uppercase ${
      isActive ? "text-white font-bold" : "text-black"
    }`;

  return (
    <div className="flex">
      <div className="w-64 h-svw bg-[#D1A054]">
        <ul className="text-center space-y-5">
          {/* Brand Section */}
          <li>
            <div className="md:w-28 w-20 ms-8 px-3 my-8">
              <p className="text-2xl tracking-wider font-bold">FOODPILOT</p>
              <p className="text-sm tracking-[0.5em]">RESTAURANT</p>
            </div>
          </li>

          {/* Admin/User Links */}
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/admin-home" className={navLinkClass}>
                  <IoMdHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-items" className={navLinkClass}>
                  <IoIosRestaurant /> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/manage-items" className={navLinkClass}>
                  <IoList /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/manage-bookings" className={navLinkClass}>
                  <FaBook /> Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers" className={navLinkClass}>
                  <FaUsers /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/user-home" className={navLinkClass}>
                  <IoMdHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/reservation" className={navLinkClass}>
                  <FaCalendarAlt /> Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/payment-history" className={navLinkClass}>
                  <FaCartArrowDown /> Payment History
                </NavLink>
              </li>
            </>
          )}

          {/* Divider */}
          <div className="divider px-4"></div>

          {/* Common Links */}
          <li>
            <NavLink to="/" className={navLinkClass}>
              <IoMdHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu" className={navLinkClass}>
              <IoMenu /> Menu
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
