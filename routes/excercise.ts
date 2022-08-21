import * as trpc from "@trpc/server";
import { z } from "zod";
import db from "../prisma/db";

const excercise = trpc
  .router()
  .query("getAll", {
    async resolve(req) {
      const excercises = await db.excercise.findMany({
        select: { id: true, created_at: true, name: true, intensity: true },
      });
      return excercises;
    },
  })
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
