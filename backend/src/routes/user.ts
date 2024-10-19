import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt';
import { signinInput } from "@luciferdk/medium-common";


// Create the main Hono app
export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	}
}>();



userRouter.post('/signup', async (c) => {
	const body = await c.req.json();
	const { success } = signinInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			msg: "Input type is not valid"
		})
	}

	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL, // Access DATABASE_URL from env
	}).$extends(withAccelerate())
	
	//const hashedPassword = await bcrypt.hash(password, 10),

	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
				fullName: body.fullName
			}
		});
		const jwt = await sign({
			id: user.id
		}, c.env.JWT_SECRET);
		return c.json({ jwt });
		/* return c.json("signuped"); */
	} catch (e) {
		c.status(403);
		return c.json({ error: "user already exist signup" })
	}
})

userRouter.post('/api/user/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL, // Access DATABASE_URL from env
	}).$extends(withAccelerate())

	const body = await c.req.json();
	//const hashedPassword = await bcrypt.hash(password, 10),

	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
				password: body.password,
			}
		});
		if (!user) {
			c.status(403);
			return c.text("user not exist's")
		}

		const jwt = await sign({
			id: user.id
		}, c.env.JWT_SECRET);
		return c.json({ jwt });

	} catch (e) {
		c.status(411);
		return c.json({ error: "user already exist signup" })
	}
})


