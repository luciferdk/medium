import { Avatar } from "./BlogCard"


export const Appbar = () => {
    return <div className="boder-b flex justify-between px-10 py-4">
        <div className="flex flex-col justify-center">
            Mediumn
        </div>
        <div className="flex flex-col justify-center">
            <Avatar size={"big"} name={""} />
        </div>
    </div>
}