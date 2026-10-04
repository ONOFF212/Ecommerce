
"use client"
import Header from "@/components/header";
import Footer from "@/components/footer";

import Navbar from "@/components/navbar";
import { hooksProducts } from "@/hooks/productHooks";
import {ProductsList} from "@/components/productList";

import { EmptystateImage } from "@/components/emptyState";


export default function Home() {
  const {products} = hooksProducts();

  return (
    <div>
      <Header />
      <Navbar />
      <main>
        <div>
          <ProductsList products={products}/>
        </div>
      </main>
      <div className="mt-32">
        <Footer/>
      </div>
    </div>
  );
}