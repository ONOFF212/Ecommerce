


import Link from "next/link";

export default function Navbar() {
    return (
        <div className="fixed top-4 left-0 w-full flex items-center justify-between h-12 text-black px-4">
            <div className="font-bold">
                <Link href="/">Home</Link>
            </div>
            <div className="flex gap-4 font-bold">
                <Link href="/product" className="hover:bg-blue-300 rounded-full p-2 hover:text-black">Product</Link>
                <Link href="/about" className="hover:bg-green-300 rounded-full p-2 hover:text-black">About Us</Link>
                <Link href="/contact" className="hover:bg-green-300 rounded-full p-2 hover:text-black">Contact Us</Link>
            </div>
        </div>
    );
};
