import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";


const UseMenu = () => {

  
     const axiosPublic=UseAxiosPublic()
      //  useEffect( ()=>{
      //      fetch('http://localhost:5000/menu')
      //      .then(res=>res.json())
      //      .then(data=>{
      //         setMenues(data)
      //         setLoading(false)
               
      //      })
      //  },[])
       const {data:menu=[],isPending:loading,refetch}=useQuery({
        queryKey:['menu'],
        queryFn:async()=>{
          const res= await axiosPublic('/menu');
          return res.data;
          

        }
       })
       return [menu,loading,refetch]
   
};

export default UseMenu;