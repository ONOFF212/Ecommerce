
import { CgProfile } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";


export default function AdminHeader(){
    return(
        <div className="flex items-center justify-between">
            <div>
                <h1 className="font-bold font-mono text-xl">Admin Panel</h1>
            </div>
            <div className="flex gap-10">
                <div>
                    <IoIosNotificationsOutline size={30}
                                                className="text-[#066FD1] hover:text-yellow-500"
                    />
                </div>
                <div className="pr-8">
                    <CgProfile  size={30}
                               className="text-[#066FD1] hover:text-red-500"
                    />
                </div>
            </div>
        </div>
    );
};