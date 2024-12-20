import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
    Variables: {
        
        authorId: any;
    }
}>();


blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("authorId", user.id);
            await next();
        } else {
            return c.json({
                msg: "You are not logged-in"
            })
        }
    } catch (e) {
        c.status(403);
        return c.json({
                msg: "You are not logged-in"
            })
    }
});

//create blog
blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const authorId =  c.get("authorId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorName: body.authorName,
            authorId: authorId
        }
    })

    return c.json({
        id: blog.id
    })
})


//update blog
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
            authorName: body.authorName

        }
    })

    return c.json({
        id: blog.id
    })
})


//all blog
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL, // Access DATABASE_URL from env
    }).$extends(withAccelerate())
    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            createdAt: true,
            id: true,
            author: {
                select: {
                    fullName: true
                }
            }
        }
    });
    return c.json({
        blogs
    })
})


// find single blog
blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                author: {
                    select: {
                        fullName: true,
                        bio: true,
                    }
                }
            }
        })

        return c.json({
            blog
        });
    } catch (e) {
        c.status(411);
        return c.json({
            msg: "Error while frtching blog post"
        })
    }
})




/**
  {
    "title" : "9876543231",
    "content": "dhrupkumarsinha@gmail.com",
    "authorName": "bhiku"
}
 */