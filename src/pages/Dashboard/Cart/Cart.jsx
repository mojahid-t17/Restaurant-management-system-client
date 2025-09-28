import { useEffect } from 'react';
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseCart from "../../../Hooks/UseCart";
const Cart = () => {
  const [cart, refetch] = UseCart();
  // console.log(cart)
  const navigate=useNavigate();
  const axiosSecure = UseAxiosSecure();
  const totalPrice=cart.reduce((previous,current)=>previous+current.price,0)
  const handleDeleteCart = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
         axiosSecure.delete(`carts/${id}`).then((res) => {
       refetch()
      if(res.data.deletedCount>0){
         Swal.fire({
          title: "Deleted!",
          text: "Item deleted success.",
          icon: "success",
        });
      }
    });

       
      }
    });

   
  };
  const handlePayment=()=>{
    if(totalPrice>0){
       navigate(`/dashboard/payment`) 
    }
       
  } 
  useEffect(() => {
      document.title = "Your Cart"; 
    }, []);
  return (
    <div className="px-8">
        
      <div className="mt-8">
        <SectionTitle
          title="WANNA ADD MORE?"
          subtitle="---My Cart---"
        ></SectionTitle>
      </div>
      <div className="sm:flex space-y-4 justify-around my-5">
        <div>
          <h2 className="text-xl">Total orders: {cart.length}</h2>
        </div>
        <div>
          <h2 className="text-xl font-bold">Total price: ${totalPrice}</h2>
        </div>
        <div>
         <button onClick={()=>handlePayment()}  className="btn bg-[#D1A054] text-white">Pay</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>ITEM IMAGE</th>
              <th>ITEM NAME</th>
              <th>PRICE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, idx) => (
              <tr key={idx}>
                <th>
                  <label>{idx + 1}</label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>$ {item.price}</td>
                <th>
                  <button
                    onClick={() => handleDeleteCart(item._id)}
                    className="btn btn-ghost text-xl text-red-500"
                  >
                    <AiFillDelete />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
