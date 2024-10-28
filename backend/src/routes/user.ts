import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, } from 'hono/jwt';
import { signupInput, signinInput } from "@luciferdk/medium-common";
import { updateBio } from "@luciferdk/medium-common";


// Create the main Hono app
export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	}
}>();



userRouter.post('/signup', async (c) => {
	const body = await c.req.json();
	const { success } = signupInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			msg: "Inputs is not valid"
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
		return c.text(jwt);
		/* return c.json("signuped"); */
	} catch (e) {
		c.status(403);
		return c.text('invalid')
	}
})

userRouter.post('/signin', async (c) => {
	const body = await c.req.json();
	const { success } = signinInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({
			message: "Inputs not Correct"
		})
	}
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL, // Access DATABASE_URL from env
	}).$extends(withAccelerate())

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
			return c.text("user not exist")
		}

		const jwt = await sign({
			id: user.id
		}, c.env.JWT_SECRET);
		return c.text(jwt);

	} catch (e) {
		c.status(411);
		return c.text('Invalid')
	}
})




//update userInfo
userRouter.put('/biography', async (c) => {
    const body = await c.req.json();
	
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const biography = await prisma.user.update({
        where: {
            id: body.id
        },
        data: {
            fullName: body.fullName,
			bio: body.bio,

        }
    })

    return c.json({
        id: biography.id
    })
})



/**
 * {
    "email": "dhrupkumarsinha@gmail.com",
   "password" : "9876543231",
   "fullName": "rajabhyaa"
}
 */