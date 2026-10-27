"use client"
import Header from "@/components/commonComponents/header";
import Mainnavbar from "@/components/navbars/homeNavbars";
import Footer from "@/components/commonComponents/footer";

import { homeProductsHooks } from "@/hooks/homeProductsHook";
import {ProductsList} from "@/components/commonComponents/homeProductList";


export default function Home(){
      const {products} = homeProductsHooks();
    return(
        <>
        <Header />
        <Mainnavbar />
      <main>
        <div>
          <ProductsList products={products}/>
        </div>
      </main>
        <Footer />
        </>
    );
};