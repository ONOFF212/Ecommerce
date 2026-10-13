

import Link from "next/link";

export default function Mainnavbar() {
    return (
        <div className="fixed top-4 left-0 w-full flex items-center justify-between h-12 text-black px-4">
            <div className="font-bold">
                <Link href="/">Home</Link>
            </div>
            <div className="flex gap-4 font-bold">
                <Link href="/auth/register" className="hover:bg-green-300 rounded-full p-2 hover:text-black">Sign Up</Link>
                <Link href="/auth/login" className="hover:bg-green-300 rounded-full p-2 hover:text-black">Log In</Link>
            </div>
        </div>
    );
};