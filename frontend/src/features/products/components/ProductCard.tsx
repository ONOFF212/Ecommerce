/* eslint-disable @next/next/no-img-element */

'use client';
import { useRouter } from "next/navigation";

//import { ShoppingCart } from "../../../components/shared/ShoppingCart";


interface productDetail {
    id:number;
    imgUrl:string;
    name:string;
    stock:number;
    price:number;
    description:string;
    category:string;
}

interface productDetailProps {
    product : productDetail;
}


const URL = process.env.NEXT_PUBLIC_API_URL;
export function ProductCard({product}:productDetailProps) {
    const router = useRouter();

    const handleViewProduct = async() => {
        router.push(`/products/views/${product.id}`);
    };

    return(
        <div className="grid h-[330px] grid-rows-[160px_1fr_auto] overflow-hidden rounded-lg border border-slate-200 bg-white hover:shadow-md " onClick={handleViewProduct} >
           <div className="flex items-center justify-center " >
             <img src={`${URL}/uploads/${product.imgUrl}`} 
                 alt={product.imgUrl}  
                 className='mt-8 h-50 w-full py-4 object-contain'
            />
           </div>
           <div className="min-h-0 overflow-y-hidden px-3 py-10">
                <h3 className='mb-2 font-semibold text-gray-800'>
                    {product.name}
                </h3>
            
                <p className="text-sm text-black text-justify ">
                    {product.description}
                </p>
                <p className='mt-2 text-sm font-bold '>
                    Price: {product.price}
                </p>
                {/* <p className='text-sm font-bold text-red-600'>
                    Stock: {product.stock}
                </p> */}
                 {/* <div>
                    <ShoppingCart />
                </div> */}
            </div>
            {/* <div className="bg-white p-3">
                <button className="w-full bg-black text-white font-bold rounded-3xl p-2 hover:bg-yellow-400 hover:text-black"
                        name="view"
                        
                >
                    View
                </button>
            </div> */}
        </div>
    );
};