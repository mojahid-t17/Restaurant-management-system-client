import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UseCart from "../../Hooks/UseCart";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {

  const {user,logOut}=useContext(AuthContext);
  const [cart]=UseCart();
  // console.log(cart)
  // console.log(user)
const handleSignOut = () => {
  logOut()
    .then(result => {
      console.log("Logged out successfully:", result);
     
    })
    .catch(err => console.log("Logout error:", err));
};

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/menu" >Menu</NavLink>
        
      </li>
      <li>
        <NavLink to="/order/salad" >Our shop</NavLink>
        
      </li>
      <li>
     

<NavLink to='/dashboard/cart'  className="btn">
  Carts <div className="badge badge-sm badge-secondary">+{cart.length}</div>
</NavLink>
        
      </li>
    </>
  );
  return (
    <div className="navbar bg-slate-800/30  shadow-sm fixed z-10 
    px-16" >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-blue-600 rounded-box z-1 mt-3 w-52 p-2 shadow text-white"
          >
            {links}
          </ul>
        </div>
        <div className="md:w-28 w-20 text-center">
          <p className="text-xl tracking-wider font-bold text-white">FOODPILOT</p>
          <p className="text-xs tracking-[0.3em] text-white">RESTAURANT</p>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-white">{links}</ul>
      </div>
      <div className="navbar-end">
        
       {
        user? <NavLink onClick={handleSignOut} className="btn border-b-2 border-yellow-500 text-yellow-500 hover:bg-[#1F2937] border-x-0 border-t-0 uppercase">LogOut</NavLink>: <NavLink to="/signIn" className="btn border-b-2 border-yellow-500 text-yellow-500 hover:bg-[#1F2937] border-x-0 border-t-0 uppercase">Log In</NavLink>
       }
      </div>
    </div>
  );
};

export default Navbar;
