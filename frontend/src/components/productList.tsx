import { ProductCard } from "./productCard";


interface productsDetails {
    id : number,
    imgUrl:string,
    Name : string,
    Stock: string,
    Price:string,
    Description:string
}

interface productsListProps {
    products:productsDetails[];
}

import { hooksProducts } from "@/hooks/productHooks";
import { EmptystateImage } from "./emptyState";

export  function ProductsList({products} : productsListProps){

    const {isLoading} = hooksProducts();
        if(isLoading){
            return <EmptystateImage/>
    }
    
    return (
        <div className="container mx-auto p-6">
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <div key={product.id}>
                        <ProductCard product={product}/>
                    </div>
                ))}
            </ul>
        </div>
    );
};