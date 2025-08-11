
const Cover = ({title,coverImg}) => {
return (
      title &&   <div
          
            className="bg-cover bg-center bg-no-repeat py-18 "
            style={{ backgroundImage: `url(${coverImg})` }}
          >
            <div className="md:max-w-3xl max-w-2/3 mx-auto text-center text-white bg-black/50 p-6 mt-4 rounded-lg">
              <h2 className="text-xl md:text-3xl uppercase font-bold">{title}</h2>
              <p className="text-justify mt-2">
               At Foodpilot Restaurant, we serve more than just meals — we deliver experiences. With a passion for taste and hospitality, we blend fresh ingredients, creative flavors, and warm service to make every visit special. Let us guide your appetite to something truly satisfying.
              </p>
            </div>
          </div>
    );
};

export default Cover;