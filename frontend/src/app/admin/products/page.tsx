
'use client';
import adminProductsHooks from "@/hooks/adminProductsHook";
import { AdminProductList } from "@/components/admin/adminProductList";

export default function ProductPage(){

    const {productsList} = adminProductsHooks();
    return(
        <>
        <div>
            <div>
                <AdminProductList products={productsList} />
            </div>
        </div>
        </>
    );
};