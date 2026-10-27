
'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuImagePlus } from "react-icons/lu";

import { adminCreateProduct } from "@/app/api/adminApi/adminProductApi";

interface productDetail{
    name:string;
    price:number;
    stock:number;
    description:string;
    img_url:File | null;
    category:string;
}

export default function AddProduct(){
    const [Product, setProduct] = useState<productDetail>({name:"",price:0, stock:0, description:"",img_url:null,category:""});

    const handleProductInsert = async () => {
        await adminCreateProduct(Product);
        window.location.reload();
    };

    const router = useRouter();
    const handleCancle = () => {
        router.push('/admin/products');
    };
    return(
        <div className="flex h-[80vh]  items-center justify-center">
            <div className="w-[100vh] bg-slate-50 h-160 max-w-[600px] border-slate-50 text-black font-mono rounded-2xl shadow-md hover:bg-white">
                <div className="mt-4 mx-4 text-[#334155] text-[15px]">
                    <h3 className="text-[20px]">Product name</h3>
                    <input id="name"
                           name="name"
                           value={Product.name}
                           onChange={(e) => setProduct({ ...Product, name:e.target.value})}
                           placeholder="Enter the name of the product"
                           className="w-full p-1 border border-[#e2e8f0] outline-none rounded-lg hover:border-[#334155] bg-[#f8fafc]"
                    />
                </div>

                <div className="mt-4 mx-4 text-[#334155]">
                    <h1 className="text-[20px]">Price</h1>
                    <input id="price"
                           name="price"
                           value={Product.price}
                           onChange={(e) => setProduct({...Product, price:Number(e.target.value)})}
                           placeholder="Enter Price"
                           className="w-full p-1 border border-[#e2e8f0] outline-none rounded-lg hover:border-[#334155] bg-[#f8fafc]"
                    />
                </div>

                <div className="mt-4 mx-4 text-[#334155]">
                    <h1 className="text-[20px]">Stock</h1>
                    <input id="stock"
                           name="stock"
                           value={Product.stock}
                           onChange={(e) => setProduct({...Product, stock:Number(e.target.value)})}
                           placeholder="Enter stock"
                           className="w-full p-1 border border-[#e2e8f0] outline-none rounded-lg hover:border-[#334155] bg-[#f8fafc]"
                    />
                </div>

                <div className="mt-4 mx-4 text-[#334155]">
                    <h1 className="text-[20px]">Category</h1>
                    <input id="category"
                           name="category"
                           value={Product.category}
                           onChange={(e) => setProduct({ ...Product, category:e.target.value})}
                           placeholder="Enter Category"
                           className="w-full p-1 border border-[#e2e8f0] outline-none rounded-lg hover:border-[#334155] bg-[#f8fafc]"
                    />
                </div>

                <div className="mt-4 mx-4 text-[#334155]">
                    <h1 className="text-[20px]">Description</h1>
                    <textarea id="description"
                              name="description"
                              value={Product.description}
                              onChange={(e) => setProduct({ ...Product, description:e.target.value})}
                              placeholder="Describe the product"
                              className="w-full p-2 border border-[#e2e8f0] outline-none rounded-lg bg-[#f8fafc] hover:border-[#334155]"
                    />
                </div>

               <div className="flex h-30 mx-4 mt-4 flex-col items-center justify-center bg-[#f8fafc] gap-2 border border-[#e2e8f0] rounded-lg hover:border-[#334155]">
                    <label className="text-center text-[#334155]" htmlFor="img_url">
                        Upload Product Image
                    </label>

                    <label htmlFor="img_url">
                        <LuImagePlus size={25} />
                    </label>

                    <input
                        type="file"
                        id="img_url"
                        name="img_url"
                        onChange={(e) => {
                            const file = e.target.files?.[0]; 
                            if(file){
                                setProduct({ ...Product, img_url:file})
                            }}
                        }
                        accept="image/*"
                        className=" text-white border min-w-0 w-58  rounded-lg bg-blue-400 hover:bg-green-500"
                    />
                </div>

                <div className="flex items-center justify-center gap-15">
                    <label>
                        <button type="submit"
                                className="min-w-0 mt-4 px-6 border border-[#e2e8f0] rounded-full hover:bg-green-500 hover:text-white hover:shadow-md"
                                onClick={handleProductInsert}
                        >
                            Save
                        </button>
                    </label>
                    <label>
                        <button type="button"
                                className="min-w-0 mt-4 px-4 border border-[#e2e8f0] rounded-full hover:bg-red-500 hover:text-white hover:shadow-md"
                                onClick={handleCancle}
                        >
                            Cancel
                        </button>
                    </label>
                </div>
            </div>
        </div>
    );
};