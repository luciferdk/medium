import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt';
import { blogRouter } from "./routes/blog";
import { userRouter } from "./routes/user";
//import { bcrypt } from 'bcryptjs';


// Create the main Hono app


const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	}
}>();

app.route("/api/user", userRouter);
app.route("/api/blog", blogRouter);


export default app;