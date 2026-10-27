
'use client';

import { use, useEffect, useState } from "react";
import { getProductById } from "@/app/api/productApi/pApi";
import { useRouter } from "next/navigation";

interface singleProduct{
    img_url:string;
    name:string | null;
    price:number | null;
    stock:number | null;
    description:string | null;
    category:string | null;
}

interface paramsProps{
    params:Promise<{id:string}>;
};

export default function ProductView({params}:paramsProps){
    const {id} = use(params);
    const router = useRouter();

    const [singleProduct, setSingleProduct] = useState<singleProduct>({name:"", price:null, stock:null, description:"", img_url:"", category:""});
    const [isLoading, setIsLoading] = useState(true);

    const handleBack = (e:any) => {
        const {name} = e.target;
        if(name === 'back'){
            setSingleProduct({
                name: "",
                price: null,
                stock: null,
                description: "",
                img_url: "",
                category: ""
            });
            
            router.push('/dashboard/product');
        }else{
            console.log("Failed to back");
        }
    };

    useEffect(() => {
        async function fetchData(){
            const productId = Number(id);
            try{
                const result = await getProductById(productId);
                console.log("Requested ID:", productId);
                //console.log("Fetched product:", response);
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
        <div className="grid min-h-[600px] grid-rows-[350px_1fr_auto]  m-4 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md">
           <div className="flex items-center justify-center p-3">
             <img src={`${URL}/img/${singleProduct.img_url}` || ""} 
                 alt={singleProduct.img_url}  
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
                    Price: {singleProduct.price || ""}
                </p>
                <p className='text-sm font-bold text-red-600'>
                    Stock: {singleProduct.stock || ""}
                </p>
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