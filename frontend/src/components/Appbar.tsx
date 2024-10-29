
import { Link } from "react-router-dom";
import { ProfileDropdown } from "./ProfileDropdown";

export const Appbar = () => {
    return <div className="sm:flex-row justify-between flex boder-b  px-10 py-4">
        <div className="sm:flex-row  justify-start flex justify-center flex-col">
        <Link to={'/blogs'} className="text-base flex flex-col justify-center">
            Mediumn
        </Link>
        </div>
        <div className="sm:flex-justify-end flex justify-center flex-col" >
            <div className="p-0 flex justify-center">
            <Link to={"/publish"}>
                <button type="button" className="mr-8 text-white bg-green-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xs px-5 py-2.5 text-center me-2  ">Post</button>
            </Link>
            <ProfileDropdown />
            </div>
        </div>
    </div>
}


