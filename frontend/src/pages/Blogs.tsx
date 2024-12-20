import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";



export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return <div>
            <Appbar />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
        </div>
    }
    return <div >
        <Appbar />
        <div className="flex justify-center">
            <div >
                {blogs.map(blog => <BlogCard
                    key={blog.id}
                    id={blog.id}
                    authName={blog.author.fullName || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={blog.createdAt} />)}

            </div>
        </div>
        
    </div>
}