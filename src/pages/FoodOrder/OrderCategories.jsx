import ItemsCard from '../../Components/itemsCard';
import UseMenu from '../../Hooks/UseMenu';

const OrderCategories = ({category}) => {
       const [menu]=UseMenu()
    // console.log(menues)
    const items=menu.filter(items=>items.category===category);

    return (
        <div>
             <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-5 gap-6 ">
                  {
                    items.map(item=> <ItemsCard item={item}></ItemsCard>
                    
                  )
                  }
                 
            </div>
        </div>
    );
};

export default OrderCategories;