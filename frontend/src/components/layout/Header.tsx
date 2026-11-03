
import Mainnavbar from "@/components/navigation/HomeNavbar";

export default function Header() {
    return(
        <div className=" font-bold text-green-500 bg-black text-center">
            <header >
                <h1>Foundation and Product Catalog</h1>
            </header>
            <Mainnavbar />
        </div>
    );
}