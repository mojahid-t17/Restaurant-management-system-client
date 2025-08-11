import { Swiper, SwiperSlide } from "swiper/react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";

const OrderMenu = () => {
  return (
    <div className=" my-4">
      <SectionTitle
        title="Order Online"
        subtitle="---From 11:00am to 10:00pm---"
      ></SectionTitle>
      <section>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="relative">
              <img src={slide1} alt="" className="w-full" />
              <h3 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xl bg-black/20 px-2 py-1 rounded">
                SALAD
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <img src={slide2} alt="" className="w-full" />
              <h3 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xl bg-black/20 px-2 py-1 rounded">
                PIZZA
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <img src={slide3} alt="" className="w-full" />
              <h3 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xl bg-black/20 px-2 py-1 rounded">
                SOUPS
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <img src={slide4} alt="" className="w-full" />
              <h3 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xl bg-black/20 px-2 py-1 rounded">
                DESERTS
              </h3>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <img src={slide5} alt="" className="w-full" />
              <h3 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xl bg-black/20 px-2 py-1 rounded">
                SALAD
              </h3>
            </div>
          </SwiperSlide>

         
        </Swiper>
      </section>
    </div>
  );
};

export default OrderMenu;
