import * as trpc from "@trpc/server";
import { z } from "zod";
import db from "../prisma/db";
const workout = trpc.router().query("getAll", {
  input: z.string({ description: "User ID" }),
  async resolve(req) {
    const workout = await db.workout.findMany({
      select: { id: true, name: true },
    });
    return workout;
  },
});
//   .mutation("create", {
//     // validate input with Zod
//     input: z.object({
//       name: z.string().min(5),
//       email: z.string().email(),
//       password: z.string().min(8),
//     }),
//     async resolve(req) {
//       // use your ORM of choice
//       return await db.user.create({
//         data: {
//           name: req.input.name,
//           email: req.input.email,
//           password: req.input.password,
//         },
//       });
//     },
//   });
export default workout;
export type Workout = typeof workout;
