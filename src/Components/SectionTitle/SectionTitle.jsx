
const SectionTitle = ({title,subtitle}) => {
    return (
        <div className="sm:w-4/12 w-2/3  mx-auto text-center">
            <h3 className="text-yellow-500">{subtitle}</h3>
            <h1 className="text-2xl font-bold border-y-2 uppercase py-3  mt-3 mb-5 border-gray-300">{title}</h1>
            
        </div>
    
    );
};

export default SectionTitle;