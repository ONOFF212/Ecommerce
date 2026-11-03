
'use client';
import {useState, useEffect} from 'react';
import { searchProducts } from '@/features/products/services/product-api';

interface productsDetails{
    id:number;
    imgUrl:string;
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

export default function ProductsHooks(filters:productsFilters = {}){
    const {
        search = "",
        category = "",
        minPrice,
        maxPrice,
        sort = "",
        page = 1,
        limit = 10
    } = filters;

    const[products, setProducts] = useState<productsDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const[totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function fetchProducts(){
            try{
                const result = await searchProducts({search,
                                                    category,
                                                    minPrice,
                                                    maxPrice,
                                                    sort,
                                                    page,
                                                    limit
                                                });
                setProducts(result.products.product);
                setTotalItems(result.products.count);
                setTotalPages(result.products.totalPage);
                setIsLoading(false);
            }catch(error) {
                console.log("Failed to load Products", error);
            }
        }
        fetchProducts();
    },[search, category, minPrice, maxPrice, sort, page, limit]);

    return {products,isLoading, totalItems, totalPages};
};