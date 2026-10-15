
 "use client"

import { useState, useEffect } from "react";
import { getProducts } from "../app/api/productApi/pApi";

export function hooksProducts(){
    interface productdetails {
        id : number,
        img_url:string,
        name : string,
        stock: string,
        price:string,
        description:string
    }

   const [products, setProductList] = useState<productdetails[]>([]);
   const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts(){
            try{
                const data = await getProducts();
                setProductList(data);
                setisLoading(false);
            }catch(error) {
                console.log("Failed to load Products", error);
            }
        }
        fetchProducts();
    }, []);

    return {products, isLoading};
};


