import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import signupImg from "../../assets/others/authentication2.png";
import { AuthContext } from "../../Provider/AuthProvider";

import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const navigate=useNavigate();
  const axiosPublic=UseAxiosPublic()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    //  console.log(data)
    createUser(data.email, data.password)
      .then((res) => {
           updateProfile(res.user,{
            
        displayName: data.name,
        photoURL: data.photoUrl,
      
           })
           const userInfo={
            email:data.email,
            name:data.name,
           }
          //  console.log(res.user)
          axiosPublic.post('/users',userInfo)
           Swal.fire({
            title: "User created success!",
            text: "Please LogIn!!!!",
            icon: "success",
          });
           navigate('/signIn')
      })
      .catch((err) => {
        // console.log(err.message)
        if (err.message == "Firebase: Error (auth/email-already-in-use).") {
          Swal.fire({
            title: "User Already exist!",
            text: "Please LogIn!!!!",
            icon: "error",
          });
        }
      });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen pt-12">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left  lg:w-1/2">
            <img src={signupImg}></img>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-[#f5f4eea8] mx-auto">
              <h1 className="text-2xl font-bold text-center">
                Create an account now!
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-1 text-sm">
                  <label htmlFor="name" className="block text-gray-400">
                    Enter Your Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-md border-gray-700 border"
                  />
                  {errors.name && (
                    <p className="text-red-600"> name is required.</p>
                  )}
                </div>

                <div className="space-y-1 text-sm">
                  <label htmlFor="email" className="block text-gray-400">
                    Enter Your Email
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@gmail.com"
                    className="w-full px-4 py-3 rounded-md border-gray-700 border"
                  />
                  {errors.email && (
                    <p className="text-red-600"> Email is required.</p>
                  )}
                </div>
                <div className="space-y-1 text-sm">
                  <label htmlFor="photoUrl" className="block text-gray-400">
                    Enter Your Photo Url
                  </label>
                  <input
                    {...register("photoUrl")}
                    type="text"
                    name="photoUrl"
                    id="photoUrl"
                    placeholder="https:/www.photoUrl.com"
                    className="w-full px-4 py-3 rounded-md border-gray-700 border"
                  />
                </div>

                <div className="space-y-1 text-sm">
                  <label htmlFor="password" className="block text-gray-400">
                    Enter Your Password
                  </label>
                  <input
                    {...register("password", {
                      minLength: 6,
                      maxLength: 12,
                      pattern:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%*&]).+$/,
                      required: true,
                    })}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-md border-gray-700 border "
                  />

                  {errors.password?.type === "required" && (
                    <p className="text-red-600"> password is required.</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600">
                      {" "}
                      password should be up to 6 character.
                    </p>
                  )}

                  {errors.password?.type === "maxLength" && (
                    <p className="text-red-600">
                      {" "}
                      password should be less then 12 character.
                    </p>
                  )}

                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600">
                      {" "}
                      password should at least one uppercase letter, one lower
                      case, one digit,one of the allowed special
                      characters(@#$%*&)
                    </p>
                  )}
                </div>

         
                   <input
                  type="submit"
                  value="Sign Up"
                  className= "btn  border-b-2 border-yellow-500 text-yellow-500 hover:bg-[#1F2937] border-x-0 border-t-0 uppercase block w-full p-3 text-center rounded-sm  bg-orange-50"
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
                Already have an account?
                <Link to="/signIn" className="underline text-blue-500">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
