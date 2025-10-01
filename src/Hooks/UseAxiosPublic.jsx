import axios from 'axios';

const UseAxiosPublic = () => {
    const axiosPublic=axios.create({
        baseURL:'https://food-pilot-restaurant-server.vercel.app/',
    
    })
    return axiosPublic;
};

export default UseAxiosPublic;