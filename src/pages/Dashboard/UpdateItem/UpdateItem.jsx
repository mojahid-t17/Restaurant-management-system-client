import { useForm } from "react-hook-form";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
 
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateItem = () => {
   const navigate=useNavigate();
  const location=useLocation();
  // console.log(location)
  const from=location.state?.from?.pathname;
  // console.log(from)
  const menuItem = useLoaderData();
  // console.log(menuItem);
  const axiosSecure = UseAxiosSecure();
  const axiosPublic = UseAxiosPublic();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    // console.log(data);

    let imgUrl = menuItem.image;
  if (data.image[0]) {
  const imageFile = new FormData();
  imageFile.append("image", data.image[0]);

  const res = await axiosPublic.post(image_hosting_url, imageFile, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (res.data.success) {
    imgUrl = res.data.data.display_url;
    // console.log(imgUrl)
  }
}
    // console.log(res.data)

    const updatedItem = {
      name: data.name,
      recipe: data.recipe,
      image: imgUrl,
      category: data.category.toLowerCase(),
      price: data.price,
    };
    const addedMenu = await axiosSecure.patch(
      `/menu/${menuItem._id}`,
      updatedItem
    );
    // console.log(addedMenu.data)
    if (addedMenu.data.modifiedCount) {
      toast("Yor Item Updated success");
      navigate(from,{replace:true})
      
    }
  };
  return (
    <div className="px-8 mt-6 mb-8">
      <ToastContainer />
      <SectionTitle
        title="Update an Item"
        subtitle="--- Anything Wrong?? ---"
      ></SectionTitle>
      <div className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">Recipe Name*</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="input w-full"
              defaultValue={menuItem.name}
              placeholder="Recipe Name"
            />
            {errors.name && (
              <p className="text-red-500">Recipe name are required</p>
            )}
          </div>
          {/* recipe */}

          <div
            className="sm:flex items-center gap-4
                     "
          >
            {/* category */}
            <div className="form-control w-full my-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Category*</legend>
                <select
                  {...register("category", { required: true })}
                  defaultValue={menuItem.category}
                  className="select w-full"
                >
                
                  <option>Salad</option>
                  <option>pizza</option>
                  <option>Soup</option>
                  <option>Dessert</option>
                  <option>Drinks</option>
                </select>
              </fieldset>
              {errors.category && (
                <p className="text-red-500">category name are required</p>
              )}
            </div>
            {/* price */}
            <div className="form-control w-full my-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Price*</legend>
                <input
                  {...register("price", { required: true })}
                  type="number"
                  defaultValue={menuItem.price}
                  className="input w-full"
                  placeholder="price "
                />
                {errors.price && <p className="text-red-500"> are required</p>}
              </fieldset>
            </div>
          </div>
          {/* recipe details */}
          <fieldset className="fieldset ">
            <legend className="fieldset-legend">Recipe Details</legend>
            <textarea
              {...register("recipe")}
              className="textarea h-24 w-full"
              defaultValue={menuItem.recipe}
              placeholder="Recipe Details"
            ></textarea>
          </fieldset>
          {/* recipe image */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Recipe Image*</legend>
            <input {...register("image")} type="file" className="file-input" />

            <label className="label">Max size 2MB</label>
          </fieldset>
          <input
            type="submit"
            value="submit"
            className="btn mt-4  bg-[#D1A054] text-white md:w-1/6 hover:bg-[#1F2937] uppercase"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
