import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";

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
app.use(
  "/user",
  trpcExpress.createExpressMiddleware({
    router: user,
    createContext,
  })
);
app.use(
  "/workout",
  trpcExpress.createExpressMiddleware({
    router: workout,
    createContext,
  })
);
app.use(
  "/set",
  trpcExpress.createExpressMiddleware({
    router: workoutSet,
    createContext,
  })
);
app.use(
  "/excercise",
  trpcExpress.createExpressMiddleware({
    router: excercise,
    createContext,
  })
);
const port = process.env.PORT || 4000;
console.log(`listening on localhost:${port}`);
app.listen(port);
