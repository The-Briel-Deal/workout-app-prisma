import * as trpc from "@trpc/server";
import { z } from "zod";
import db from "../prisma/db";
const workout = trpc
  .router()
  .query("getAll", {
    input: z.object({
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.number().nullish(),
      page: z.number().min(0),
      userId: z.string({ description: "User ID" }),
    }),
    async resolve(req) {
      console.log(req);
      const workout = await db.workout.findMany({
        where: { user_id: req.input.userId },
        select: { id: true, name: true },
        orderBy: { created_at: "desc" },
        skip: (req.input.page || 0) * (req.input.limit || 10),
        take: req.input.limit || 10,
      });
      const pages = Math.ceil(
        (await db.workout.count({
          where: { user_id: req.input.userId },
        })) / (req.input.limit || 10)
      );
      const items = { pages, items: workout };
      return items;
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
