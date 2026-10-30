"use client"
// import Header from "@/components/commonComponents/header";
// import Mainnavbar from "@/components/navbars/homeNavbars";
import Footer from "@/components/commonComponents/footer";

import ProductPage from "@/app/product/page";


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