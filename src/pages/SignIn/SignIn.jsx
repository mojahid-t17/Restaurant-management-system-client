import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { ToastContainer, toast } from "react-toastify";
import signinImg from "../../assets/others/authentication2.png";
import SocialLogin from "../../Components/SocialLogin";
import { AuthContext } from "../../Provider/AuthProvider";
const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const onSubmit = (data) => {
    setErrMsg(""); // Clear any previous message

    // Don't validate CAPTCHA if it's empty — react-hook-form handles that
    if (!data.captcha) return;

    const isCaptchaValid = validateCaptcha(data.captcha);

    if (!isCaptchaValid) {
      setErrMsg("Captcha doesn't match");
     
      return;
    }

    signInUser(data.email, data.password)
      .then(() => {
        navigate(from, { replace: true });
        // console.log(res);
      })
      .catch((err) => {
        if (err.message == "Firebase: Error (auth/invalid-credential).") {
          toast.error("Invalid email or Password !");
        }
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="hero bg-base-200 min-h-screen pt-12">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left  lg:w-1/2">
            <img src={signinImg}></img>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-[#f5f4eea8] mx-auto">
              <h1 className="text-2xl font-bold text-center">Login now!</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-1 text-sm">
                  <label htmlFor="username" className="block text-gray-400">
                    Enter Your Email
                  </label>
                  <input
                    {...register("email")}
                    type="text"
                    name="email"
                    id="email"
                    placeholder="name@gmail.com"
                    className="w-full px-4 py-3 rounded-md border-gray-700 border"
                  />
                </div>

                <div className="space-y-1 text-sm">
                  <label htmlFor="password" className="block text-gray-400">
                    Enter Your Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-md border-gray-700 border "
                  />
                  <div className="flex justify-end text-xs text-gray-400">
                    <a rel="noopener noreferrer" href="#">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <div className="space-y-1 text-sm block text-gray-400 mb-2">
                  <label htmlFor="captcha">
                    <LoadCanvasTemplate />
                  </label>

                  <input
                    {...register("captcha", { required: true })}
                    type="text"
                    name="captcha"
                    id="captcha"
                    placeholder="Enter the text Captcha to login"
                    className="w-full px-4 py-3 rounded-md border-gray-700 border"
                  />
                  {errors.captcha && (
                    <span className="text-red-500 text-sm">
                      Captcha is required
                    </span>
                  )}

                  {!errors.captcha && errMsg && (
                    <span className="text-red-500 text-sm">{errMsg}</span>
                  )}

                  <div className="flex justify-end text-xs text-gray-400">
                    <a rel="noopener noreferrer" href="#"></a>
                  </div>
                </div>
                <input
                  type="submit"
                  value="Sign in"
                  className="btn  border-b-2 border-yellow-500 text-yellow-500 hover:bg-[#1F2937] border-x-0 border-t-0 uppercase block w-full p-3 text-center rounded-sm  bg-orange-50"
                />
              </form>
              <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                <p className="px-3 text-sm text-gray-400">
                  Login with social accounts
                </p>
                <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
              </div>
              <SocialLogin></SocialLogin>
              <p className="text-xs text-center sm:px-6 text-gray-400">
                Don't have an account?
                <Link to="/signUp" className="underline text-blue-500">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
