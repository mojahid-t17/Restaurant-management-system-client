import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardBtn from "./CardBtn";
const ItemsCard = ({item}) => {
  const { name, recipe, price,image } = item;
 
    return (
         <div className="card sm:max-w-sm shadow bg-slate-200/40">
           < ToastContainer  autoClose={5000} />
          <figure>
            <img
              src={image}
              alt=""
              className="w-full object-cover h-52 md:h-60 "
            />
            <p className="bg-gray-800 text-white rounded-md absolute right-0 mr-4 mt-5 m  px-2 py-1 mb-36">${price}</p>
          </figure>
          <div className="card-body space-y-1 text-center">
            <h5 className="text-center  text-2xl">{name}</h5>
            <p>{recipe}</p>
            <div  className="">
             
             <CardBtn menu={item} ></CardBtn>
            </div>
          </div>
        </div>
    );
};

export default ItemsCard;