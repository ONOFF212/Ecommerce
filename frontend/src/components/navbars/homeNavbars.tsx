

import Link from "next/link";

export default function Mainnavbar() {
    return (
        <div className=" flex items-center justify-center text-white">
            <div className="font-bold gap-4 hover:text-blue-500">
                <Link href="/">Home</Link>
            </div>
            <div className="flex gap-4 font-bold pl-4">
                <Link href="/auth/register" className="hover:text-red-500 hover:text-black">Sign Up</Link>
                <Link href="/auth/login" className="hover:text-red-500 hover:text-black">Log In</Link>
            </div>
        </div>
    );
};