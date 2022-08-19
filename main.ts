import { PrismaClient } from "@prisma/client";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";

// Routes
import user from "./routes/user";
import workout from "./routes/workout";
const app = express();
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = trpc.inferAsyncReturnType<typeof createContext>;
app.use(
  "/user",
  trpcExpress.createExpressMiddleware({
    router: user,
    createContext,
  })
);
console.log("listening on localhost:4000");
app.listen(4000);
