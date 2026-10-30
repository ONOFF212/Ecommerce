
import { FaCartPlus } from "react-icons/fa";

export function ShoppingCart(){
    return (
        <div>
            <label htmlFor="" className="flex items-center justify-end pr-6 ">
                <FaCartPlus size={30}  className="text-[#066FD1]  hover:text-green-500" />
            </label>
        </div>
    );
};