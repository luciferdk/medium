
import { Link } from "react-router-dom";
import { ProfileDropdown } from "./ProfileDropdown";

export const Appbar = () => {
    return <div className="boder-b grid grid-cols-8 px-10 py-4">
        <div className="col-span-7 flex justify-center flex-col">
        <Link to={'/blogs'} className="text-base flex flex-col justify-center">
            Mediumn
        </Link>
        </div>
        <div className="col-span-1 flex justify-center flex-col" >
            <div className="p-0 flex justify-center">
            <Link to={"/publish"}>
                <button type="button" className="mr-8 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New Post</button>
            </Link>
            <ProfileDropdown />
            </div>
        </div>
    </div>
}


