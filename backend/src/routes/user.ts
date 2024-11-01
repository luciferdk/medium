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


//signup endpoint
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


//signin routes
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




interface UserUpdatePayload {
	bio?: string;
	fullName?: string;
  }
  
  // Get user's bio and full name
  userRouter.get('/:id', async (c) => {
	
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL, // Access DATABASE_URL from env
	}).$extends(withAccelerate())
	
	const userId = c.req.param('id');
  
	try {
	  const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { bio: true, fullName: true },
	  });
  
	  if (!user) {
		return c.json({ error: 'User not found' }, 404);
	  }
  
	  return c.json({ bio: user.bio, fullName: user.fullName });
	} catch (error) {
	  return c.json({ error: 'Error fetching user data' }, 500);
	}
  });
  
  // Update user's bio and full name
  userRouter.put('/:id', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL, // Access DATABASE_URL from env
	}).$extends(withAccelerate())


	const userId = c.req.param('id');
	const data: UserUpdatePayload = await c.req.json();
  
	try {
	  const updatedUser = await prisma.user.update({
		where: { id: userId },
		data: {
		  bio: data.bio || undefined,
		  fullName: data.fullName || undefined,
		},
	  });
  
	  return c.json({ message: 'User updated successfully', user: updatedUser });
	} catch (error) {
	  return c.json({ error: 'Error updating user data' }, 500);
	}
  });
  



/**
 * {
    "email": "dhrupkumarsinha@gmail.com",
   "password" : "9876543231",
   "fullName": "rajabhyaa"
}
 */