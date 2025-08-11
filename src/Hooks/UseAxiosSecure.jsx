
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";
const axiosSecure= axios.create({
        baseURL:'http://localhost:5000/'
})

const UseAxiosSecure = () => {
    const {logOut}=UseAuth();
    const navigate=useNavigate();
    axiosSecure.interceptors.request.use(function(config){
        const token=localStorage.getItem('access-token');
        config.headers.authorization=`Bearer ${token}`
        return config;
    }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  })

  axiosSecure.interceptors.response.use(function(response){
    return response;
  }, async(error)=>{
    const status=error.response.status;
    if(status==401 || status==403){
     await logOut
     navigate('/signIn')
    }
    return Promise.reject(error)
  })
    return axiosSecure;
};

export default UseAxiosSecure;