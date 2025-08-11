import { useQuery } from "@tanstack/react-query";
import { AiFillDelete } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { data, Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const AllUsers = () => {
    const axiosSecure=UseAxiosSecure();
    const {data:users=[],refetch}=useQuery({
        queryKey:['users'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/users');
            return res.data;
        }
    })
     const handleMakeAdmin=(user)=>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(()=>{
            // console.log(res.data)
            if(data.modifiedCount>0){
              Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is now admin`,
            showConfirmButton: false,
            timer: 1500
            });
            }
            refetch()
        })
     }
     const handleDeleteUser = (id) => {
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
             axiosSecure.delete(`users/${id}`).then((res) => {
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
    
    return (
        <div className="mt-6 px-8">
            <SectionTitle title="MANAGE ALL USERS" subtitle="---How many??---"></SectionTitle>
            <div className="text-xl font-bold">
                
                <h2>Total Users: {users.length}</h2>

                 <table className="table">
                          {/* head */}
                          <thead>
                            <tr>
                              <th></th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Role</th>
                              <th>ACTION</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((user, idx) => (
                              <tr key={idx}>
                                <th>
                                  <label>{idx + 1}</label>
                                </th>
                               <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td >
                                    {
                                        user.role ==='admin'?'Admin': <Link onClick={()=>handleMakeAdmin(user)} className="tex-xl btn"><FaUsers></FaUsers></Link>
                                    }
                                </td>
                                <th>
                                  <button
                                    onClick={()=>handleDeleteUser(user._id)}
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

export default AllUsers;