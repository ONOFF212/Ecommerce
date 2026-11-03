
'use client';
import { FiShoppingCart } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import Mainnavbar from '@/components/navigation/HomeNavbar';
import { useRouter } from "next/navigation";


interface searchProps{
    onFilterChange:(filters:{search:string}) =>void;
}

export default function SearchNavBar( {onFilterChange}:searchProps){

    const router = useRouter();
    const[searchQuery, setSearchQuery] = useState('');

    const handleQuery = async(value:string) => {
        console.log(value);
        setSearchQuery(value);
        onFilterChange({search:value});
    };

    return(
        <div>
            <div><Mainnavbar/></div>
            <div className="flex justify-end gap-2 px-4 ">
                <div>
                    <FiShoppingCart size={25}
                                    name="shoppingCart"
                                    className="text-white hover:text-blue-500"
                                    onClick={() => {router.push('/dashboard/shopping-cart')}}
                     />
                </div>
                <CiHeart size={25} className="text-white hover:text-red-500" />
            </div>
            <h3 className="font-mono font-bold text-2xl">Shopify</h3>
            <p className="text-sm">Everything you Love, In one Place</p>
            <div className="relative flex items-center justify-center text-slate-400 min-w-0 w-full">
                <input
                    id="search"
                    name="search"
                    placeholder="search Products....."
                    className="bg-slate-50 text-black text-center w-full max-w-200 min-w-0 rounded-lg h-8 outline-none border-[#DBE1EA] border-1"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {if(e.key === 'Enter'){handleQuery(searchQuery);}}}
                />
                <div onClick={() => handleQuery(searchQuery)} 
                     className="absolute pl-4  max-w-200 min-w-0 w-full pointer-events-none text-slate-500 hover:text-black "
                >
                    <IoSearch size={25}
                              className="pointer-events-auto"
                    />
                </div>
            </div>
        </div>
    );
};