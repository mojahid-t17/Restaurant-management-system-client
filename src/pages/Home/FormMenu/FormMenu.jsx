import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import './featured.css';

const FormMenu = () => {
    return (
        <div className="featuredSection bg-fixed pt-8">
            <SectionTitle subtitle="---Check it out---" title="FROM OUR MENU"></SectionTitle>
            <section className="md:flex px-28 py-18 mx-auto justify-center items-center bg-slate-400/30">
                <div className="md:w-2/3">
                    <img  src={featuredImg} alt="" />
                </div>
                <div className="md:ml-12 space-y-px">
                    <h2 className="text-xl text-white">March 20, 2023</h2>
                    <h2 className="text-xl text-white">WHERE CAN I GET SOME?</h2>
                    <p className="text-white">Discover the perfect blend of taste and tradition in our featured dish, crafted with fresh ingredients and bold flavors to satisfy your cravings.</p>
                    <button className="btn border-b-3 border-black border-x-0 border-t-0 mt-3">Read More</button>
                </div>
            </section>
        </div>
    );
};

export default FormMenu;