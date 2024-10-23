import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return <div>
            loading...
        </div>
    }
    return <div >
        <Appbar />
        <div className="flex justify-center">
        <div className="max-w-xl">
            <BlogCard
                authorName={"dhrup sinha"}
                title={"sex to superconsciousness "}
                content={"Auggie is anxious about starting school, but eventually decides to attend."}
                publishedDate={"2nd Feb 2024"}
            />
        
         
            <BlogCard
                authorName={"dhrup sinha"}
                title={"sex to superconsciousness "}
                content={"Auggie is anxious about starting school, but eventually decides to attend."}
                publishedDate={"2nd Feb 2024"}
            />
         
            <BlogCard
                authorName={"dhrup sinha"}
                title={"sex to superconsciousness "}
                content={"Auggie is anxious about starting school, but eventually decides to attend."}
                publishedDate={"2nd Feb 2024"}
            />
        </div>
        </div>
    </div>
}