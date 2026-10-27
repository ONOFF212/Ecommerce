
"use client"
import { ProductCard } from "./productCard";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

import { productsHooks } from "@/hooks/productsHooks";

interface productsDetails {
    id:number;
    img_url:string;
    name:string;
    stock:number;
    price:number;
    description:string;
    category:string;
}

interface productsListProps {
    products:productsDetails[];
}


export  function ProductsList({products} : productsListProps){

    const {isLoading} = productsHooks();
    if(isLoading){
        return ( 
            <div className="grid grid-cols-1 mb-4 gap-6 sm:grid-cols-2 lg:grid-cols-4 ">
                {Array.from({length:23}).map((_,index) => (
                    <div key={index} className="border mt-1 mx-4  p-4  min-h-90  min-w-60 outline-none rounded-lg border-[#DBE1EA] shadow-md">
                    <Skeleton count={1} height={230} />  
                    <Skeleton count={3}  height={20}/> 
                    <div className="mx-35">
                        <Skeleton count={1} height={30} width={100} />
                    </div>
                </div>
                ))}
            </div>
        );
    }
    
    return (
        <div className="container mx-auto p-6">
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map(product => (
                    <div key={product.id} className="min-w-0">
                        <ProductCard product={product}/>
                    </div>
                ))}
            </ul>
        </div>
    );
};

