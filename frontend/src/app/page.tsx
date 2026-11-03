"use client"
// import Header from "@/components/commonComponents/header";
// import Mainnavbar from "@/components/navbars/homeNavbars";
import Footer from "@/components/layout/Footer";

import ProductPage from "@/app/products/page";


export default function Home(){
    return(
        <>
        {/* <Header /> */}
        {/* <Mainnavbar /> */}
      <main>
        <div>
          {/* <ProductsList products={products}/> */}
          <ProductPage />
        </div>
      </main>
        <Footer />
        </>
    );
};