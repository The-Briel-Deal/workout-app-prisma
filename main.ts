import { PrismaClient } from "@prisma/client";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";

import user from "./routes/user";

const app = express();
// created for each request
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
