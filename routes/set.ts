import * as trpc from "@trpc/server";
import { z } from "zod";
import db from "../prisma/db";
const workoutSet = trpc
  .router()
  .query("getAll", {
    input: z.string({ description: "Workout ID" }),
    async resolve(req) {
      const sets = await db.set.findMany({
        where: { workout_id: req.input },
        select: {
          id: true,
          created_at: true,
          reps: true,
          weight_lb: true,
          Exercise: { select: { id: true, name: true } },
        },
      });
      return sets;
    },
  })
  .mutation("create", {
    input: z.object({
      workoutId: z.string({ description: "User ID" }),
      excerciseId: z.string({ description: "Excercise ID" }),
      reps: z.number().min(1),
      weightLb: z.number().min(1),
    }),
    async resolve(req) {
      return await db.set.create({
        data: {
          reps: req.input.reps,
          excercise_id: req.input.excerciseId,
          weight_lb: req.input.weightLb,
          workout_id: req.input.workoutId,
        },
      });
    },
  });
export default workoutSet;
export type WorkoutSet = typeof workoutSet;
