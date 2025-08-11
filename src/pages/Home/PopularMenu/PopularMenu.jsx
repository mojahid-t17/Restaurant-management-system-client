
import ItemsCategory from '../../../Components/ItemsCategory';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';


const PopularMenu = () => {
   
  

    return (
        <div>
            <div>
                <SectionTitle title="From Our Menu" subtitle="---Check it out---"></SectionTitle>
            </div>
             <ItemsCategory category="popular" btnText="View full Menu"></ItemsCategory>
        
       
            
        </div>
    );
};

export default PopularMenu;