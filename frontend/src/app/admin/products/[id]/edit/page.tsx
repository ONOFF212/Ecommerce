
'use client'
import { use , useEffect, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { useRouter } from "next/navigation";

import { adminFetchProductById, adminUpdateProduct } from "@/app/api/adminApi/adminProductApi";

interface productDetail{
    img_url:string;
    name:string;
    price:number;
    stock:number;
    description:string;
    category:{
        name:string;
    }
}

interface updateProductDetail{
    img_url:File | null;
    name:string;
    price:number;
    stock:number;
    description:string;
    category:string;
}

interface paramsProps{
    params: Promise<{id:string}>;
};

export default  function EditProduct({params}:paramsProps){
    const router = useRouter();
    const {id} = use(params);
    const [product, setProduct] = useState<productDetail>({name:"", img_url:"", price:0, stock:0, description:"", category:{name:""}});
    const [updateProduct, setUpdateProduct] = useState<updateProductDetail>({name:"", img_url:null, price:0, stock:0, description:"", category:""});
    useEffect(() => {
        async function fetchData(){
            const productId = Number(id);
            try{
                const result = await adminFetchProductById(Number(productId));
                if(!result){
                    console.log("Error at Fetching Data");
                    return;
                }
                setProduct(result.result);
                setUpdateProduct({
                    name: result.result.name,
                    img_url: null,
                    price: result.result.price,
                    stock: result.result.stock,
                    description: result.result.description,
                    category: result.result.category.name,
                });
            }catch(error){
                console.log("Failed the Fetch Product by ID", error);
                return;
            }
        };
        fetchData();
    },[id]);

    const handleCancle = () => {
        router.push('/admin/products');
    };

    const handleProductUpdate = () => {
        console.log("product update value:",updateProduct);
        adminUpdateProduct(Number(id), updateProduct);
        window.location.reload();
    };

    return(
        <div className="flex h-[80vh]  items-center justify-center">
            <div className="w-[100vh] bg-slate-50 h-160 max-w-[600px] border-slate-50 text-black font-mono rounded-2xl shadow-md hover:bg-white">
                <div className="mt-4 mx-4 text-[#334155] text-[15px]">
                    <h3 className="text-[20px]">Product name</h3>
                    <input  id="name"
                            name="name"
                           value={updateProduct.name}
                           onChange={(e) => {setUpdateProduct((prev) => ({...prev, name:e.target.value}))}}
                        placeholder={`${product.name}`}
                        className="w-full p-1 border border-[#e2e8f0] outline-none rounded-lg hover:border-[#334155] bg-[#f8fafc]"
                        />
                </div>
        
                <div className="mt-4 mx-4 text-[#334155]">
                    <h1 className="text-[20px]">Price</h1>
                        <input id="price"
                               name="price"
                               value={updateProduct.price || ""}
                               onChange={(e) => {setUpdateProduct((prev) => ({...prev, price:Number(e.target.value)}))}}
                               placeholder={`${product.price}` || "update price"}
                               className="w-full p-1 border border-[#e2e8f0] outline-none rounded-lg hover:border-[#334155] bg-[#f8fafc]"
                        />
                </div>
        
                <div className="mt-4 mx-4 text-[#334155]">
                    <h1 className="text-[20px]">Stock</h1>
                        <input id="stock"
                               name="stock"
                               value={updateProduct.stock || ""}
                               onChange={(e) => {setUpdateProduct((prev) => ({...prev, stock:Number(e.target.value)}))}}
                               placeholder={`${product.stock}`}
                               className="w-full p-1 border border-[#e2e8f0] outline-none rounded-lg hover:border-[#334155] bg-[#f8fafc]"
                        />
                </div>
        
                <div className="mt-4 mx-4 text-[#334155]">
                    <h1 className="text-[20px]">Category</h1>
                        <input id="category"
                                name="category"
                               value={updateProduct.category}
                               onChange={(e) => {setUpdateProduct((prev) => ({...prev, category:e.target.value}))}}
                              placeholder={`${product.category.name}`}
                               className="w-full p-1 border border-[#e2e8f0] outline-none rounded-lg hover:border-[#334155] bg-[#f8fafc]"
                        />
                </div>
        
                <div className="mt-4 mx-4 text-[#334155]">
                    <h1 className="text-[20px]">Description</h1>
                        <textarea id="description"
                                  name="description"
                                  value={updateProduct.description}
                                  onChange={(e) => {setUpdateProduct((prev) => ({...prev, description:e.target.value}))}}
                                  placeholder={`${product.description}`}
                                  className="w-full p-2 border border-[#e2e8f0] outline-none rounded-lg bg-[#f8fafc] hover:border-[#334155]"
                        />
                </div>
        
                <div className="flex h-30 mx-4 mt-4 flex-col items-center justify-center bg-[#f8fafc] gap-2 border border-[#e2e8f0] rounded-lg hover:border-[#334155]">
                    <label className="text-center text-[#334155]" htmlFor="img_url">
                        Update Product Image
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
                                if (file) {
                                    setUpdateProduct((prev) => ({
                                        ...prev,
                                        img_url: file,
                                    }));
                                }
                            }}
                            accept="image/*"
                            className=" text-white border min-w-0 w-58  rounded-lg bg-blue-400 hover:bg-green-500"
                        />
                </div>
        
                <div className="flex items-center justify-center gap-15">
                    <label>
                        <button type="submit"
                                className="min-w-0 mt-4 px-6 border border-[#e2e8f0] rounded-full hover:bg-green-500 hover:text-white hover:shadow-md"
                                onClick={handleProductUpdate}
                        >
                            Update
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