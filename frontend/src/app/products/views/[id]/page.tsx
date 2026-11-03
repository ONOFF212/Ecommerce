/* eslint-disable @next/next/no-img-element */

'use client';

import { use, useEffect, useState } from "react";
import { getProductById } from "@/features/products/services/product-api";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "@/components/shared/ShoppingCart";

interface singleProduct{
    imgUrl:string;
    name:string | null;
    price:number | null;
    stock:number | null;
    description:string | null;
    category:{
        name:string;
    };
}

interface paramsProps{
    params:Promise<{id:string}>;
};

export default function ProductView({params}:paramsProps){
    const {id} = use(params);
    const router = useRouter();

    const [singleProduct, setSingleProduct] = useState<singleProduct>({name:"", price:null, stock:null, description:"", imgUrl:"", category:{name:""}});
    const [isLoading, setIsLoading] = useState(true);

    const handleBack = (e:React.MouseEvent<HTMLButtonElement>) => {
        const {name} = e.currentTarget;
        if(name === 'back'){
            setSingleProduct({
                name: "",
                price: null,
                stock: null,
                description: "",
                imgUrl: "",
                category:{
                    name:""
                }
            });
            
            router.push('/');
        }else{
            console.log("Failed to back");
        }
    };

    useEffect(() => {
        async function fetchData(){
            const productId = Number(id);
            try{
                const result = await getProductById(productId);
                setSingleProduct(result);
                setIsLoading(false);
            }catch(error){
                console.log("Failed to Fetch product: ", error);
            }
        }
        fetchData();
    }, [id]);
    const URL = process.env.NEXT_PUBLIC_API_URL;

    if(isLoading){
        return <p>isloading .......</p>
    };
    return (
        <div className="grid min-h-[600px] grid-rows-[350px_1fr_auto] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md">
           <div className="flex items-center justify-center p-3">
             <img src={`${URL}/uploads/${singleProduct.imgUrl}` || ""} 
                 alt={singleProduct.imgUrl}  
                 className=' h-full w-full p-4 object-contain'
            />
           </div>
           <div className="min-h-0  px-3 mt-30">
                <h3 className='mb-2 font-bold text-gray-800'>
                    {singleProduct.name || ""}
                </h3>
            
                <p className="text-sm font-semibold text-black text-justify ">
                    {singleProduct.description || ""}
                </p>
                <p className='mt-2 text-sm font-bold text-green-500'>
                    Price: {singleProduct.price ?? "N/A"}
                </p>
                <p className='text-sm font-bold text-red-600'>
                    Stock: {singleProduct.stock ?? "N/A"}
                </p>
                <p className="text-sm font-semibold text-grey-600">
                    Category: {singleProduct.category.name || "Uncategorized"}
                </p>
                <div>
                    <ShoppingCart />
                </div>
            </div>
            <div className="bg-white p-3">
                <button className="w-full bg-slate-500 text-xl text-white font-bold rounded-3xl p-2 hover:bg-black "
                        name="back"
                        onClick={handleBack}
                >
                    Back
                </button>
            </div>
        </div>
    );
};