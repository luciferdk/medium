import { Link } from "react-router-dom";


interface BlogCardProps {
    id: string;
    authName: string;
    title: string;
    content: string;
    publishedDate: string;

}

export const BlogCard = ({
    id,
    authName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {

    // Convert `publishedDate` to IST format
    const publishedDateIST = new Date(publishedDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });


    return <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-200 pbb-2 p-4 w-seceen max-w-screen-md">
            <div className="flex">
                <Avatar name={authName} />
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authName}</div>
                <div className="flex justify-center flex-col pl-2" > <Circle /> </div>
                <div className="flex justify-center flex-col pl-2 font-thin text-slate-500 text-sm">{publishedDateIST}</div>
            </div>  
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100)} + "..."
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)} minutes read`}
            </div>
        </div>
    </Link>
}


export function Circle() {
    return <div className="flex justify-center flex-col h-1 w-1 rounded-full bg-slate-300">

    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return <div className={` relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"} `}>
        <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
            {name[0]}
        </span>
    </div>


}