
 "use client"

import { useState, useEffect } from "react";
import { getProducts } from "@/api/productApi/pApi";

export function hooksProducts(){
    interface productdetails {
        id : number,
        imgUrl:string,
        Name : string,
        Stock: string,
        Price:string,
        Description:string
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
                console.log("Failed to load Products");
            }
        }
        fetchProducts();
    }, []);

    return {products, isLoading};
};