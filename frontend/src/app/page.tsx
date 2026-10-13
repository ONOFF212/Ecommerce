
"use client"
import Header from "@/components/commonComponents/header";
import Mainnavbar from "@/components/navbars/homeNavbars";
import Footer from "@/components/commonComponents/footer";

import { hooksProducts } from "@/hooks/productHook";
import {ProductsList} from "@/components/commonComponents/productList";


export default function Home(){
      const {products} = hooksProducts();
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