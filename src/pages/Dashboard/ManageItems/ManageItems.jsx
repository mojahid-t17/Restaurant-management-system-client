import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseMenu from "../../../Hooks/UseMenu";


const ManageItems = () => {
    const location=useLocation();
    const [items, ,refetch]=UseMenu();
    const axiosSecure=UseAxiosSecure();
    // console.log(items)
    const handleDeleteItem=(id)=>{
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
                       axiosSecure.delete(`menu/${id}`).then((res) => {
                   
                    if(res.data.deletedCount>0){
                        refetch()
                       Swal.fire({
                        title: "Deleted!",
                        text: "Item deleted success.",
                        icon: "success",
                      });
                    }
                
                  });
              
                     
                    }
                  });
              
    }
  
    return (
        <div className="px-6 mt-8">
          <SectionTitle title="MANAGE ALL ITEMS" subtitle="---Hurry Up---"></SectionTitle>
           <div className="text-xl font-bold">
                
                <h2>Total Users: {items.length}</h2>

                 <table className="table">
                          {/* head */}
                          <thead>
                            <tr>
                              <th></th>
                              <th>Item Image</th>
                              <th>Item Name</th>
                              <th>Price</th>
                              <th>ACTION</th>
                              <th>ACTION</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((item, idx) => (
                              <tr key={idx}>
                                <th>
                                  <label>{idx + 1}</label>
                                </th>
                               <td>
                                <img className="w-24" src={item.image} alt="" />
                               </td>
                                <td>{item.name}</td>
                                <td >
                                  ${item.price}
                                </td>
                                <td>
                                  <Link
                                    to={`/dashboard/updateItem/${item._id}`}
                                    state={{ from: location }}
                                    className="btn bg-amber-50  btn-ghost text-xl text-yellow-500"
                                  >
                                    <AiFillEdit />
                                  </Link>
                                </td>
                                <td>
                                  <button
                                    onClick={()=>handleDeleteItem(item._id)}
                                    className="btn bg-rose-50 btn-ghost text-xl text-red-500"
                                  >
                                    <AiFillDelete />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
            </div>
        </div>
        
    );
};

export default ManageItems;