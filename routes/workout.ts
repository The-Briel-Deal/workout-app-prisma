import * as trpc from "@trpc/server";
import { z } from "zod";
import db from "../prisma/db";
const workout = trpc
  .router()
  .query("getAll", {
    input: z.string({ description: "User ID" }),
    async resolve(req) {
      const workout = await db.workout.findMany({
        select: { id: true, name: true },
      });
      return workout;
    },
  })
  .mutation("create", {
    // validate input with Zod
    input: z.object({
      userId: z.string({ description: "User ID" }),
      name: z.string().min(5),
    }),
    async resolve(req) {
      // use your ORM of choice
      return await db.workout.create({
        data: {
          name: req.input.name,
          user_id: req.input.userId,
        },
      });
    },
  });
export default workout;
export type Workout = typeof workout;
