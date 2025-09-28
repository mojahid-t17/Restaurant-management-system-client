import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import { AuthContext } from "../Provider/AuthProvider";

const SocialLogin = () => {
  const { signInwithGogle, user } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();

  // Redirect user after login
  useEffect(() => {
    if (user?.email) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSignIn = async () => {
    try {
      const result = await signInwithGogle();

      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };

      // Save user to backend
      await axiosPublic.post("/users", userInfo);

     
      Swal.fire({
        icon: "success",
        title: `Welcome ${result.user?.displayName || "User"}!`,
        showConfirmButton: false,
        timer: 1500,
      });

      
    } catch (error) {
      console.error("Login failed:", error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={handleSignIn}
        className="flex items-center px-4 py-2 bg-sky-400 text-white rounded hover:bg-sky-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-5 h-5 mr-2 fill-current"
        >
          <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
        </svg>
        Sign in with Google
      </button>
    </div>
  );
};

export default SocialLogin;
