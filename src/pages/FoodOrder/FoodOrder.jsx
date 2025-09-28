import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import orderImg from "../../assets/shop/banner2.jpg";
import Cover from "../Menu/Cover/Cover";
import OrderCategories from "./OrderCategories";

const FoodOrder = () => {
  const categories=['salad','pizza','soup','dessert','drinks']
 const {category}=useParams()
//  console.log(category)
  const initialIndex=categories.indexOf(category);
//   console.log(category,initialIndex)

  const [tabIndex, setTabIndex] = useState(initialIndex);

 useEffect(() => {
    document.title = "OUR SHOP"; 
  }, []);
  return (
    <div className="max-w-6xl mx-auto ">

      <Cover coverImg={orderImg} title="OUR SHOP"></Cover>
     <div className="my-5 mx-auto md:px-12 px-2">
         <Tabs  selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList >
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soups</Tab>
          <Tab>Desserts</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
           <OrderCategories category="salad"></OrderCategories>
        </TabPanel>
        <TabPanel>
           <OrderCategories category="pizza"></OrderCategories>
        </TabPanel>
        <TabPanel>
           <OrderCategories category="soup"></OrderCategories>
        </TabPanel>
        <TabPanel>
           <OrderCategories category="dessert"></OrderCategories>
        </TabPanel>
        <TabPanel>
           <OrderCategories category="drinks"></OrderCategories>
        </TabPanel>
       
      </Tabs>
     </div>
    </div>
  );
};

export default FoodOrder;
