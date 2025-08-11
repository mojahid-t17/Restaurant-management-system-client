import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import img1 from "../../../assets/home/slide1.jpg";
import img2 from "../../../assets/home/slide2.jpg";
import img3 from "../../../assets/home/slide4.jpg";

const Recommends = () => {
  return (
    <div>
      <SectionTitle
        title="Chef Recommends"
        subtitle="---Should Try---"
      ></SectionTitle>
      <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-5 gap-6 px-16 ">
        <div className="card sm:max-w-sm bg-slate-200/40">
          <figure>
            <img
              src={img2}
              alt=""
              className="w-full object-cover h-52 md:h-60 "
            />
          </figure>
          <div className="card-body space-y-1 text-center">
            <h5 className="text-center text-2xl">Margherita Pizza</h5>
            <p>
              Classic Tomato Sauce, Mozzarella Cheese, Fresh Basil, Olive Oil.
            </p>

           <button   className="btn border-b-2 border-yellow-500 text-yellow-500 hover:bg-[#1F2937] border-x-0 border-t-0 uppercase">
                add to cart
              </button>
          </div>
        </div>
        <div className="card sm:max-w-sm bg-slate-200/40">
          <figure>
            <img
              src={img1}
              alt=""
              className="w-full object-cover h-52 md:h-60 "
            />
          </figure>
          <div className="card-body space-y-1 text-center">
            <h5 className="text-center  text-2xl">Caeser Salad</h5>
            <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
            <div className="">
             
             <button   className="btn border-b-2 border-yellow-500 text-yellow-500 hover:bg-[#1F2937] border-x-0 border-t-0 uppercase">
                add to cart
              </button>
            </div>
          </div>
        </div>
        <div className="card sm:max-w-sm bg-slate-200/40">
          <figure>
            <img
              src={img3}
              alt=""
              className="w-full object-cover h-52 md:h-60 "
            />
          </figure>
          <div className="card-body  text-center">
            <h5 className="text-center text-2xl">Chocolate Lava Cake</h5>
            <p>
              Warm Chocolate Cake, Gooey Center, Served with Vanilla Ice Cream.
            </p>

            <div className="">
             <button  className="btn border-b-2 border-yellow-500 text-yellow-500 hover:bg-[#1F2937] border-x-0 border-t-0 uppercase">
                add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommends;
