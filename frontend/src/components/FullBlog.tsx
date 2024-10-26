import { Blog } from "../hooks";
import { Appbar, Avatar } from "./Appbar"

export const FullBlog = ({ blog }: { blog: Blog }) => {

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12  px-10 w-full pt-200 max-w-screen-2xl">
                <div className="col-span-8" >
                    <div className="text-5xl font-exterabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 2nd Decembaer 2023
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4 ">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.fullName} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.fullName || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Rand catch phrase about the author's ability to grab user's attentation
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}