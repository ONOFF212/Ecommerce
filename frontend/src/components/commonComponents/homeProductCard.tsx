
'use client';
import { useRouter } from "next/navigation";

interface productDetail {
    id:number;
    img_url:string;
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
export function HomeProductCard({product}:productDetailProps) {
    const router = useRouter();

    const handleViewProduct = async() => {
        router.push(`/${product.id}/Views`);
    };

    return(
        <div className="grid h-[380px] grid-rows-[160px_1fr_auto] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md">
           <div className="flex items-center justify-center p-3">
             <img src={`${URL}/img/${product.img_url}`} 
                 alt={product.img_url}  
                 className='h-40 w-full p-4 object-contain'
            />
           </div>
           <div className="min-h-0 overflow-y-auto px-3">
                <h3 className='mb-2 font-semibold text-gray-800'>
                    {product.name}
                </h3>
            
                <p className="text-sm text-black text-justify ">
                    {product.description}
                </p>
                <p className='mt-2 text-sm font-bold text-green-500'>
                    Price: {product.price}
                </p>
                <p className='text-sm font-bold text-red-600'>
                    Stock: {product.stock}
                </p>
            </div>
            <div className="bg-white p-3">
                <button className="w-full bg-green-500 text-white font-bold rounded-3xl p-2 hover:bg-[#4F46E5] "
                        name="view"
                        onClick={handleViewProduct}
                >
                    View
                </button>
            </div>
        </div>
    );
};