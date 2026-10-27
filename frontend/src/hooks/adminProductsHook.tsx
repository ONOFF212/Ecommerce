
'use client';
import { useEffect, useState } from "react";
import { getAdminProduct } from "@/app/api/adminApi/adminProductApi";

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

export default function adminProductsHooks(){

    const [productsList, setProductsList] = useState<productsDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorState, setErrorState] = useState(true);

    useEffect(() => {
        async function fetchProducts(){
            try{
                const result = await getAdminProduct();
                setProductsList(result.result);
                setIsLoading(false);
                setErrorState(false);
            }catch(error){
                console.log("Failed to Fetch Products: ", error);
                setErrorState(true);
            }
        }
        fetchProducts();
    },[]);
    return {productsList, isLoading, errorState};
};