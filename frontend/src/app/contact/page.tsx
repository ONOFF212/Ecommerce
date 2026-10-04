
import Image from "next/image";

import Navbar from "@/components/navbar";


export default function Contact() {
  return (
    
    <div>
      <Navbar/>
      <main>
                <div className="flex flex-col md:flex-row gap-4 p-4">
                  <div className=" m-auto mt-50 w-100 h-100 border-xl bg-slate-50 shadow-md rounded-xl">
                    <h1 className="text-center m-4 p-4 font-bold text-2xl text-red-500">Contact us</h1>
                    <div className="text-center font-bold py-15 bg-black rounded-lg">
                        <p>Mobile Number: 9816******</p>
                        <p>Email: FullStackDevelopment123@gmail.com</p>
                        <p>Whatsapp-username: ??</p>
                        <p className="text-lg  text-green-500">Thank-you</p>
                    </div>
                  </div>
                </div>
      </main>
    </div>
  );
}
;