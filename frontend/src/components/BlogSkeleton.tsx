
export const BlogSkeleton = () => {
    return <div className="flex justify-center w-full mt-5">
        <div className="border-b border-slate-200 pb-2 p-4 w-screen max-w-screen-md">
            <div className="flex animate-pulse">

                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="flex flex-col pl-2 justify-center">
                    <div className="w-24 h-4 bg-gray-300 rounded"></div>
                </div>

                <div className="flex flex-col pl-2 justify-center">
                    <div className="w-1 h-1 bg-gray-300 rounded-full ml-1"></div>
                </div>

                <div className="flex flex-col pl-2 justify-center">
                    <div className="w-20 h-4 bg-gray-300 rounded ml-1"></div>
                </div>
            </div>


            <div className="text-md font-thin animate-pulse">
                <div className="w-full h-4 bg-gray-300 rounded mt-2"></div>
                <div className="w-full h-4 bg-gray-300 rounded mt-2"></div>

            </div>
            <div className="text-slate-500 text-sm font-thin pt-4 animate-pulse">
                <div className="w-24 h-4 bg-gray-300 rounded mt-3"></div>
            </div>
        </div>

    </div>



}





