import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";

const db = new PrismaClient();
const appRouter = trpc
  .router()
  .query("getUser", {
    input: z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
    async resolve(req) {
      const email = req.input.email;
      const password = req.input.password;
      const user = await db.user.findFirst({
        where: { email, password },
        select: { id: true, email: true, name: true },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },
  })
  .mutation("createUser", {
    // validate input with Zod
    input: z.object({
      name: z.string().min(5),
      email: z.string().email(),
      password: z.string().min(8),
    }),
    async resolve(req) {
      // use your ORM of choice
      return await db.user.create({
        data: {
          name: req.input.name,
          email: req.input.email,
          password: req.input.password,
        },
      });
    },
  });
export type AppRouter = typeof appRouter;
const app = express();

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = trpc.inferAsyncReturnType<typeof createContext>;
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
console.log("listening on localhost:4000");
app.listen(4000);
