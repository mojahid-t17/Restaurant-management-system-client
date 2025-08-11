import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert2";
import UseAuth from "../Hooks/UseAuth";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import UseCart from "../Hooks/UseCart";

const CardBtn = ({menu}) => {
  const axiosSecure=UseAxiosSecure();
  const {user}=UseAuth();
 const navigate=useNavigate()
  const location=useLocation();
     
  const [,refetch]=UseCart();
     const {_id,name, recipe,price,image}=menu;
      
      const handleCartItem=()=>{
    
      if(user && user.email){
        
           const cartItem={
        menuId:_id,
        name,
        recipe,
        price,
        image,
        email:user.email
       }
            axiosSecure.post('/carts',cartItem)
       .then(()=>{
        refetch()
       toast.success("Successfully add to Cart!")
       })
        
      }
      else{
        Swal.fire({
  title: "You Dont logged In ",
  text: "Please logIn to add to card!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, log In!"
}).then((result) => {
  if (result.isConfirmed) {
    navigate('/signIn',{state:{from:location}})
  }
});
      }
      
    }
    return (
        <div>
          <ToastContainer />
              <button  onClick={handleCartItem} className="btn border-b-2 border-yellow-500 text-yellow-500 hover:bg-[#1F2937] border-x-0 border-t-0 uppercase">
                add to cart
              </button>
        </div>
    );
};

export default CardBtn;