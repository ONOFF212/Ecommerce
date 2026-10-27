
'use client';
import {useState, useEffect} from 'react';
import { searchProducts } from '@/app/api/productApi/pApi';

interface productsDetails{
    id:number;
    img_url:string;
    name:string;
    stock:number;
    price:number;
    description:string;
    category:string;
}

interface productsFilters{
    search?:string;
    category?:string;
    minPrice?:number;
    maxPrice?:number;
    sort?:string;
    page?:number;
    limit?:number;
}

export function productsHooks(filters:productsFilters = {}){

    const[products, setProducts] = useState<productsDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const[totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    console.log("total Items count: ",totalItems);
    console.log("Total pages: ",totalPages);

    useEffect(() => {
        async function fetchProducts(){
            try{
                const result = await searchProducts(filters);
                setProducts(result.result.product);
                setTotalItems(result.result.count);
                setTotalPages(result.result.totalPage);
                setIsLoading(false);
            }catch(error) {
                console.log("Failed to load Products", error);
            }
        }
        fetchProducts();
    },[filters.search,
       filters.category, 
       filters.minPrice, 
       filters.maxPrice, 
       filters.sort, 
       filters.page, 
       filters.limit]);

    return {products,isLoading, totalItems, totalPages};
};