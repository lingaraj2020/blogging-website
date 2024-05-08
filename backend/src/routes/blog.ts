import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@rajlingaraj/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use(async(c,next)=>{
    const authHeader=c.req.header('Authorization')
    try{
        if(!authHeader){
            c.status(401);
            return c.json({error:"unauthorized"})
        }
        const token=authHeader;
        console.log(token);
        const response=await verify(token,c.env.JWT_SECRET);
        console.log(response);
        if(!response){
            c.status(401);
            return c.json({error:"unauthorized"});
        }
        c.set('userId',response.id);
        await next();
    }catch(e){
        c.status(401);
        return c.json({error:"unauthorized!!"});
    }
  
})

blogRouter.post("/",async(c)=>{
    const userId=c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())

    const body =await c.req.json();
    const {success}=createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs not correct"
        })
    }
    const post=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:userId
        }
    });
    return c.json({
        id:post.id
    });
})

blogRouter.put("/",async(c)=>{
    const userId=c.get('userId');
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
    const body=await c.req.json();
    const {success}=updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs not correct"
        })
    }
    const post=await prisma.post.update({
        where:{
            id:body.id,
            authorId:userId
        },
        data:{
            title:body.title,
            content:body.content
        }
    });

    return c.json({
        message:`Post ID ${post.id} has been updated!`
    })
})

//add pagination
blogRouter.get("/bulk",async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
    const blogs=await prisma.post.findMany({
        select:{
            title:true,
            content:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });

    return c.json({
        blogs
    })
})

blogRouter.get("/:id",async(c)=>{
    const id=c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    try{
        const post=await prisma.post.findFirst({
            where:{
                id:id
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });
        return c.json({
            post
        })
    }
    catch(e){
        c.status(411);
        return c.json({
            error:"Error while fetching blog!"
        })
    }
})
