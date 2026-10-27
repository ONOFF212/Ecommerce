
'use client';
import { IoPeopleOutline } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa";
import { LuClock8 } from "react-icons/lu";
import { LuSquareActivity } from "react-icons/lu";
import { useAuth } from "@/contexts/authContext/authContext";


export default function AdminPage(){
    const {user} = useAuth();
    return(
        <div>
            <div className=" p-4 text-black font-mono ">
                <h1 className="font-bold text-2xl">Dashboard</h1>
                <p className="text-sm">Welcome back, <span className="text-xl font-bold font-mono">{user?.name}</span></p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 mx-30 mt-10 gap-8  ">

                <div className="grid min-w-0 w-full min-h-0 h-full rounded-lg border border-slate-50  p-6 bg-black  ">
                    <IoPeopleOutline color="blue" size={30}/>  
                    <h2 className="text-xl mt-3 font-semibold font-mono ">Total Users</h2>
                    <p className="mt-2 text-3xl font-bold font-mono">2,450</p> 
                </div>

                <div className=" grid min-w-0 w-full min-h-0 h-full  rounded-lg border border-slate-50  p-6 bg-black">
                    <FaUserCheck color="green" size={30}/>
                    <h2 className="text-xl mt-3 font-semibold font-mono ">Active Users</h2>
                    <p className="mt-2 text-3xl font-bold font-mono">1,820</p> 
                </div>

                <div className="grid min-w-0 w-full min-h-0 h-full  rounded-lg border border-slate-50  p-6 bg-black">
                    <LuClock8 color="red" size={30}/>
                    <h2 className="text-xl mt-3 font-semibold font-mono ">Pending Tasks</h2>
                    <p className="mt-2 text-3xl font-bold font-mono">24</p> 
                </div>

                <div className="grid min-w-0 w-full min-h-0 h-full  rounded-lg border border-slate-50  p-6 bg-black">
                    <LuSquareActivity color="skyblue" size={30}/>
                    <h2 className="text-xl mt-3 font-semibold font-mono ">System Activity</h2>
                    <p className="mt-2 text-3xl font-bold font-mono">128</p> 
                </div>
            </div>
        </div>
    );
};