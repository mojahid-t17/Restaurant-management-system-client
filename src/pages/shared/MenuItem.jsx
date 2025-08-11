const MenuItem = ({ item }) => {
  const { name, recipe, price } = item;
  return (
    <div className="flex space-x-4 items-center">
      <div>
        <img
          className="w-[120px] "
          style={{
            borderRadius: "0 200px 200px 200px",
          }}
          src={item.image}
          alt=""
        />
      </div>
      <div>
        <h1 className=" uppercase">{name} ---------</h1>
        <p className="text-[#737373]">{recipe}</p>
      </div>
      <div>
        <h3  className="text-yellow-500 flex"><span>$</span> {price}</h3>
      </div>
    </div>
  );
};

export default MenuItem;
