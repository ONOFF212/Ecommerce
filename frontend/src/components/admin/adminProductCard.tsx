
'use client'
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";

import { adminDeleteProduct } from "@/app/api/adminApi/adminProductApi";
import { useRouter } from "next/navigation";

interface productDetail{
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

interface productProps{
    product: productDetail;
}

export  function AdminProductCard({product}:productProps){
    const router = useRouter();

    const handleChange = (e:any, product:productDetail) => {
        const {name} = e.target;

        if(name === 'edit'){
            router.push(`/admin/products/${product.id}/edit`);

        } else if(name === 'delete'){
            const id = Number(product.id);
            adminDeleteProduct(id);
            window.location.reload();
        } else{
            console.log("Action Failed....");
            return;
        }
    };

    return(
        <>
        <div className="grid grid-rows mt-2 text-sm  w-full min-w-0 max-w-[600px] mx-auto rounded-lg  border border-blue-500 bg-black hover:border-yellow-900 hover:shadow-md text-white ">
            <div className="flex flex-col sm:flex-row">
                <div className="shrink-0">
                    <img src={`${process.env.NEXT_PUBLIC_API_URL}/img/${product.img_url}`}
                        alt={product.img_url}
                        className="h-24 w-24 object-cover rounded-lg "
                    />
                </div>
                {/* grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 */}
                <div className="grid min-w-0 px-6 w-40">
                    <div>
                        <p className="text-xs text-slate-500">Name</p>
                        <h3 className="break-words font-bold text-xs">
                            {product.name}
                        </h3>
                    </div>

                    <div>
                        <p className="text-xs text-slate-500">Price</p>
                        <p className="font-semibold">
                            {product.price}
                        </p>
                    </div>

                </div>

                <div className="grid w-[200px] text-center max-w-[400px] shrink-0 px-10">
                    <div>
                        <p className="text-xs text-slate-500">stock</p>
                        <p>
                            {product.stock}
                        </p>
                    </div>
                </div>

                <div className="grid px-8">
                    <div className="grid grid-cols-2 py-4 gap-2">
                        <button
                            name="edit"
                            onClick={(e) => handleChange(e, product)}
                            className="rounded-md text-white hover:text-blue-500"
                        >
                            Edit
                        </button>
                        <BiSolidEdit size={20} color="blue" />
                    </div>

                    <div className="grid grid-cols-2 py-2 gap-4">
                        <button
                            name="delete"
                            className="rounded-md px-3  text-white hover:text-red-500"
                            onClick={(e) => handleChange(e, product)}
                        >
                            Delete
                        </button>
                        <label>
                            <RiDeleteBin2Line size={20} color="red"/>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};