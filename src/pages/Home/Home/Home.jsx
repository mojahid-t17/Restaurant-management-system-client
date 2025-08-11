
import { Helmet } from 'react-helmet';
import About from "../About/About";
import Banner from "../Banner/Banner";
import CallUss from "../CallUs/CallUss";
import FormMenu from "../FormMenu/FormMenu";
import OrderMenu from "../OrderMenu/OrderMenu";
import PopularMenu from "../PopularMenu/PopularMenu";
import Recommends from "../Recommends/Recommends";
import Testimonials from "../Testimonials/Testimonials";
const Home = () => {
    return (
        <div>
            
            <Helmet>
        <title>Home</title>
       
      </Helmet>
            
            <div >
                <Banner></Banner>
                <div className="max-w-6xl mx-auto ">
                      <OrderMenu></OrderMenu>
                <About></About>
                <PopularMenu></PopularMenu>
                <CallUss></CallUss>
                <Recommends></Recommends>
                <FormMenu></FormMenu>
                <Testimonials></Testimonials>
                </div>
                
            </div>
            
        </div>
    );
};

export default Home;