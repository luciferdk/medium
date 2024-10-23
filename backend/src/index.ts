import { Hono } from 'hono'
import { cors } from "hono/cors";
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
app.use('/*',cors())
app.route("/api/user", userRouter);
app.route("/api/blog", blogRouter);


export default app;