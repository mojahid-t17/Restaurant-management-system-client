import { updateProfile } from "firebase/auth";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import signupImg from "../../assets/others/authentication2.png";
import SocialLogin from "../../Components/SocialLogin";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
  const { createUser,signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = UseAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Upload image to imgbb
      const imageFile = { image: data.image[0] };
      const imgRes = await axiosPublic.post(image_hosting_url, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (imgRes.data.success) {
        const imgUrl = imgRes.data.data.display_url;

        // Create user in Firebase
        const res = await createUser(data.email, data.password);

        await updateProfile(res.user, {
          displayName: data.name,
          photoURL: imgUrl,
        });

        // Save user info in MongoDB
        const userInfo = {
          email: data.email,
          name: data.name,
          photo: imgUrl,
        };

        await axiosPublic.post("/users", userInfo);

        Swal.fire({
          title: "User created successfully!",
          text: "Please Log In",
          icon: "success",
        });
        signInUser(data.email,data.password)
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      if (err.message.includes("auth/email-already-in-use")) {
        Swal.fire({
          title: "User Already Exists!",
          text: "Please Log In",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen pt-12">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left lg:w-1/2">
            <img src={signupImg} alt="signup" />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-[#f5f4eea8] mx-auto">
              <h1 className="text-2xl font-bold text-center">
                Create an account now!
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div className="space-y-1 text-sm">
                  <label htmlFor="name" className="block text-gray-400">
                    Enter Your Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    id="name"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-md border-gray-700 border"
                  />
                  {errors.name && (
                    <p className="text-red-600">Name is required.</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1 text-sm">
                  <label htmlFor="email" className="block text-gray-400">
                    Enter Your Email
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    id="email"
                    placeholder="name@gmail.com"
                    className="w-full px-4 py-3 rounded-md border-gray-700 border"
                  />
                  {errors.email && (
                    <p className="text-red-600">Email is required.</p>
                  )}
                </div>

                {/* Image File */}
                <div className="space-y-1 text-sm">
  <label htmlFor="image" className="block text-gray-400">
    Upload Your Photo
  </label>

  <input
    {...register("image", { required: true })}
    type="file"
    name="image"
    id="image"
    accept="image/*"
    className="file-input file-input-bordered file-input-warning w-full"
  />
  {errors.image && (
    <p className="text-red-600"> Profile photo is required.</p>
  )}
</div>


                {/* Password */}
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
                    id="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-md border-gray-700 border"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-600">Password is required.</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600">
                      Password should be at least 6 characters.
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-red-600">
                      Password should be less than 12 characters.
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600">
                      Password must include uppercase, lowercase, number, and
                      special character (@#$%*&).
                    </p>
                  )}
                </div>

                <input
                  type="submit"
                  value="Sign Up"
                  className="btn border-b-2 border-yellow-500 text-yellow-500 hover:bg-[#1F2937] border-x-0 border-t-0 uppercase block w-full p-3 text-center rounded-sm bg-orange-50"
                />
              </form>

              {/* Social login */}
              <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                <p className="px-3 text-sm text-gray-400">
                  Login with social accounts
                </p>
                <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
              </div>
              <SocialLogin />

              <p className="text-xs text-center sm:px-6 text-gray-400">
                Already have an account?{" "}
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
