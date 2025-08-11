import { useEffect, useState } from "react";


const UseMenu = () => {
     const [menu, setMenues]=useState([]);
     const [loading,setLoading]=useState(true)
       useEffect( ()=>{
           fetch('http://localhost:5000/menu')
           .then(res=>res.json())
           .then(data=>{
              setMenues(data)
              setLoading(false)
               
           })
       },[])
       return [menu,loading]
   
};

export default UseMenu;