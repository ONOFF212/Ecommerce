


import Link from "next/link";

export default function DashboardNavbar() {
    return (
        <div className="fixed top-4 left-0 w-full flex items-center justify-center h-12 text-black px-4">
            <div className="flex gap-4 font-bold">
                <Link href="/dashboard/product" className="hover:bg-blue-300 rounded-full p-2 hover:text-black">Product</Link>
                <Link href="/dashboard/profile" className="hover:bg-blue-300 rounded-full p-2 hover:text-black">Profile</Link>
                <Link href="/dashboard/about" className="hover:bg-green-300 rounded-full p-2 hover:text-black">About Us</Link>
                <Link href="/dashboard/contact" className="hover:bg-green-300 rounded-full p-2 hover:text-black">Contact Us</Link>
            </div>
        </div>
    );
};
