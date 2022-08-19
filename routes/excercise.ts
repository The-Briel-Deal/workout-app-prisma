import * as trpc from "@trpc/server";
import { z } from "zod";
import db from "../prisma/db";

const excercise = trpc
  .router()
  // .query("getAll", {
  //   input: z.string({ description: "Workout ID" }),
  //   async resolve(req) {
  //     const sets = await db.set.findMany({
  //       where: { workout_id: req.input },
  //       select: { id: true, created_at: true, reps: true, weight_lb: true },
  //     });
  //     return sets;
  //   },
  // });
  .mutation("create", {
    input: z.object({
      name: z.string().min(1),
      intensity: z.number().min(1).max(10),
    }),
    async resolve(req) {
      return await db.excercise.create({
        data: {
          name: req.input.name,
          intensity: req.input.intensity,
        },
      });
    },
  });
export default excercise;
export type Excercise = typeof excercise;
