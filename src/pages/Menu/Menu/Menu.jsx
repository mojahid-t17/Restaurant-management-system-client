import menuImg from ".../../../../../assets/menu/banner3.jpg";
import dessertImg from ".../../../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from ".../../../../../assets/menu/pizza-bg.jpg";
import saladImg from ".../../../../../assets/menu/salad-bg.jpg";
import soupImg from ".../../../../../assets/menu/soup-bg.jpg";
import { Helmet } from 'react-helmet';
import ItemsCategory from "../../../Components/ItemsCategory";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

import { useEffect } from "react";
import Cover from "../Cover/Cover";
const Menu = () => {
     useEffect(() => {
    document.title = "Home|Menu"; // Ensure the browser updates instantly
  }, []);
  return (
    <div className="max-w-6xl mx-auto ">
      <Helmet>
        <title>Home|Menu</title>
      </Helmet>
      
      <Cover title="Our Menu" coverImg={menuImg}></Cover>
      {/* todays offer menu */}
      <div className="my-5">
        <SectionTitle
          title="TODAY'S OFFER"
          subtitle="---Don't miss---"
        ></SectionTitle>
        <ItemsCategory
          category="offered"
          btnText="ORDER YOUR FAVOURITE FOOD"
        ></ItemsCategory>
      </div>
      {/* salad menu items */}
      <Cover coverImg={saladImg} title="salads"></Cover>
      <ItemsCategory category="salad"></ItemsCategory>
      {/* pizza menu items */}
      <Cover coverImg={pizzaImg} title="pizza"></Cover>
      <ItemsCategory category="pizza"></ItemsCategory>
      {/* dessert menu items */}
      <Cover coverImg={dessertImg} title="desserts"></Cover>
      <ItemsCategory category="dessert"></ItemsCategory>
      {/* soups menu items */}
      <Cover coverImg={soupImg} title="Soups"></Cover>
      <ItemsCategory category="soup"></ItemsCategory>
      
    </div>
  );
};

export default Menu;
