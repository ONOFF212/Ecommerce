
'use client';
import { useEffect, useState } from "react";
import { getProduct } from "@/features/admin/services/admin-product-api";

interface productsDetails{
    id:number;
    imgUrl:string;
    name:string;
    price:number;
    stock:number;
    description:string;
    category:{
        id:string;
        name:string;
    };
}

export default function AdminProductsHooks(){

    const [productsList, setProductsList] = useState<productsDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorState, setErrorState] = useState(true);

    useEffect(() => {
        async function fetchProducts(){
            try{
                const result = await getProduct();
                setProductsList(result.products.product);
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