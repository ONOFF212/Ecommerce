import Image from "next/image";

import Navbar from "@/components/navbar";


export default function About() {
  return (
    
    <div>
      <Navbar/>
      <main>
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <div className=" m-auto mt-50 w-100 h-100 border-xl bg-slate-50 shadow-md rounded-xl">
            <h1 className="text-center m-4 p-4 font-bold text-2xl text-red-500">Full-Stack Development</h1>
            <div className="text-center text-lg font-bold py-15 bg-black rounded-lg">
                <p>Produt Catalog [Task:1]</p>
                <p className="text-lg  text-green-500">Completed....</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
;