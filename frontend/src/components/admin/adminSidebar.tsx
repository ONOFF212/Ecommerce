
'use client';
import Link from "next/link";
import { useAuth } from "@/contexts/authContext/authContext";

import { RxDashboard } from "react-icons/rx";
import { TbCubePlus } from "react-icons/tb";
import { IoBagAddOutline } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { MdAddShoppingCart } from "react-icons/md";
import { usePathname } from "next/navigation";


export function AdminSideBar() {
    const {logout} = useAuth();
    const pathname = usePathname();
    const showAddProducts = pathname === '/admin/products';

    return (
        <div className="grid grid-col gap-6 p-4 mt-8">
            <div className="flex gap-4 p-2 border-2 border-transparent rounded-3xl text-xl font-bold hover:font-semibold hover:text-white hover:bg-blue-600 hover:border-blue-600 transition duration-500 ease-in-out">
                <RxDashboard size={30} />
                <Link href="/admin"><span>DashBoard</span></Link>
            </div>

            <div className="flex gap-4 p-2 border-2 border-transparent rounded-3xl text-xl font-bold hover:font-semibold hover:text-white hover:bg-blue-600 hover:border-blue-600 transition duration-500 ease-in-out">
                <TbCubePlus size={30} />
                <Link href="/admin/products"><span>Products</span></Link>
            </div>

            <div className="flex gap-4 p-2 border-2 border-transparent rounded-3xl text-xl font-bold hover:font-semibold hover:text-white hover:bg-blue-600 hover:border-blue-600 transition duration-500 ease-in-out">
                <IoBagAddOutline size={30} />
                <Link href="/admin/orders"><span>Order</span></Link>
            </div>

            <div className="flex gap-4 p-2 border-2 border-transparent rounded-3xl text-xl font-bold hover:font-semibold hover:text-white hover:bg-blue-600 hover:border-blue-600 transition duration-500 ease-in-out">
                <IoIosPeople size={30}/>
                <Link href="/admin/customers"><span>Customers</span></Link>
            </div>
            <div className="border-b pb-15 border-slate-50"></div>

           { showAddProducts &&(<div className="flex px-4 py-2 gap-2 font-mono border-b border-blue-600  border-2  text-white rounded-3xl text-lg font-bold  hover:font-semibold hover:text-white hover:bg-black hover:border-green-500 transition duration-500 ease-in-out">
                <MdAddShoppingCart size={30} color="green" />
                <Link href="/admin/products/new"><span>Add Products</span></Link>
            </div>)}
            
            <div onClick={logout} className="flex mt-50 px-8 py-2 gap-4 border-b border-blue-600  border-2  text-white rounded-3xl text-lg font-bold hover:font-semibold hover:text-white hover:bg-black hover:border-red-600 transition duration-500 ease-in-out">
                <LuLogOut size={30} color="red" />
                <span>Log-Out</span>
            </div>
        </div>
    );
};
