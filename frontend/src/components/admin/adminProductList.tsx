
'use client';
import { AdminProductCard } from "./adminProductCard";
import  adminProductsHooks  from "@/hooks/adminProductsHook";

import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

interface productsDetails{
    id:number;
    img_url:string;
    name:string;
    price:number;
    stock:number;
    description:string;
    category:{
        id:string;
        name:string;
    };
}

interface productsListProps {
    products:productsDetails[];
}

export function AdminProductList({products}:productsListProps){
    const {isLoading} = adminProductsHooks();
    const {errorState} = adminProductsHooks();
    if(isLoading){
        if(errorState){
            console.log("Failed to fetch Product");
        }
        return(
            <div className="grid grid-row w-full min-w-0 max-w-[600px] mx-auto rounded-lg gap-4  border hover:shadow-md">
                    {Array.from({length:15}).map((_,index) => (
                            <div key={index } className="flex flex-col sm:flex-row  gap-2">
                            <div className="shrink-0"><Skeleton count={1} height={50} width={50} /> </div> 
                            <div className="px-2"><Skeleton count={2} width={120} height={20} /> </div>
                            <div className="px-10"><Skeleton count={1} width={120} height={15} /></div>
                            <div className="px-15"><Skeleton count={2} width={120} height={20}/> </div>
                        </div>
                    ))}
            </div>
        );
    }


    return(
        <div className=" min-w-0 text-black">
            <ul className=" min-w-0">
                {products.map(product => (
                    <div key={product.id} className=" min-w-0">
                        <AdminProductCard product={product}/>
                    </div>
                ))};
            </ul>
        </div>
    );
};