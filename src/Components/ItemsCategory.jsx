import { Link } from "react-router-dom";
import UseMenu from "../Hooks/UseMenu";
import MenuItem from "../pages/shared/MenuItem";

const ItemsCategory = ({ btnText, category }) => {
  const [menu] = UseMenu();
  // console.log(menues)
  const items = menu.filter((items) => items.category === category);
  return (
    <div>
      <div className="grid grid-cols-1 px-5 md:grid-cols-2 gap-4 space-y-4 my-6">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
      <div className="text-center mb-6">
        <Link
          to={
            category === "popular"
              ? "/menu"
              : category=="offered"
              ? "/order/salad"
              : `/order/${category}`
          }
        >
          <button className="btn border-b-2 border-black border-x-0 border-t-0 ">
            {btnText ? btnText : "ORDER YOUR FAVOURITE FOOD"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ItemsCategory;
