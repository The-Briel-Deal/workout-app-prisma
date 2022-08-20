import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";

// Routes
import user from "./routes/user";
import workout from "./routes/workout";
import workoutSet from "./routes/set";
import excercise from "./routes/excercise";
const app = express();
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = trpc.inferAsyncReturnType<typeof createContext>;

const appRouter = trpc
  .router()
  .merge("user.", user)
  .merge("workout.", workout)
  .merge("set.", workoutSet)
  .merge("excercise.", excercise);
export type AppRouter = typeof appRouter;
app.use(cors());
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
const port = process.env.PORT || 4000;
console.log(`listening on localhost:${port}`);
app.listen(port);
