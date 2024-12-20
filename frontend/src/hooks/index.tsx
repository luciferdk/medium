import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";



export interface Blog {
    "createdAt": string;
    "content": string;
    "title": string;
    "id": string;
    "bio": string;
    "author": {
        "bio": string;
        "fullName": string
    }
}

export const useBlog = ({id}:{id:string})=>{

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/blog/${id}`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            setBlog(response.data.blog);
            setLoading(false);
        })
    }, [id])
    
    return {
        loading,
        blog
    }
}




export const useBlogs = () =>{
    const [loading , setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            setBlogs(response.data.blogs);
            setLoading(false);
        })
    }, [])

    return {
        loading,
        blogs
    }
}