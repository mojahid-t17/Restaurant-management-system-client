import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const image_hosting_key=import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_url=`https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
  const axiosSecure=UseAxiosSecure();
  const axiosPublic=UseAxiosPublic()
  const { register,formState: { errors }, handleSubmit,reset } = useForm();
  const onSubmit = async(data) => {
    // console.log(data);

    const imageFile={image: data.image[0]};
    const res=await axiosPublic.post(image_hosting_url,imageFile,{
       headers: {
          "Content-Type": "multipart/form-data",
        },
    })
    // console.log(res.data)
    if(res.data.success){
      const imgUrl=res.data.data.display_url;
      const menuItem={
        name:data.name,
        recipe:data.recipe,
        image:imgUrl,
        category:data.category.toLowerCase(),
        price:data.price
      }
      const addedMenu=await axiosSecure.post('/menu',menuItem);
      // console.log(addedMenu.data)
      if(addedMenu.data.insertedId){
        
       toast("Yor Item added success");
       reset()
      }

    }

  };
  return (
    <div className="px-8 mt-6">
      <ToastContainer />
      <SectionTitle
        title="Add an Item"
        subtitle="--- whats new?? ---"
      ></SectionTitle>
      <div className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">Recipe Name*</label>
            <input
              {...register("name",{ required: true })}
              type="text"
              className="input w-full"
              placeholder="Recipe Name"
            />
            {errors.name && <p className="text-red-500">Recipe name are required</p>}
          </div>
      
          <div
            className="sm:flex items-center gap-4
             "
          >
            {/* category */}
            <div className="form-control w-full my-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Category*</legend>
                <select
                 {...register("category",{ required: true })}
                defaultValue="category" className="select w-full">
                  <option disabled={true} value="category">
                    Select a category
                  </option>
                  <option>Salad</option>
                  <option>pizza</option>
                  <option>Soup</option>
                  <option>Dessert</option>
                  <option>Drinks</option>
                </select>
              </fieldset>
              {errors.category && <p className="text-red-500">category name are required</p>}
            </div>
            {/* price */}
            <div className="form-control w-full my-3">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Price*</legend>
                <input
                 {...register("price",{ required: true })}
                  type="number"
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
              placeholder="Recipe Details"
            ></textarea>
          </fieldset>
          {/* recipe image */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Recipe Image*</legend>
            <input
              {...register("image",{ required: true })}
            type="file" className="file-input" />
            {errors.image && <p className="text-red-500">Image are required</p>}
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

export default AddItems;
