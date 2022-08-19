import * as trpc from "@trpc/server";
import { z } from "zod";
import db from "../prisma/db";
const user = trpc
  .router()
  .query("get", {
    input: z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
    async resolve(req) {
      const email = req.input.email;
      const password = req.input.password;
      const user = await db.user.findFirst({
        where: { email, password },
        select: { id: true, email: true, name: true },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },
  })
  .mutation("create", {
    // validate input with Zod
    input: z.object({
      name: z.string().min(5),
      email: z.string().email(),
      password: z.string().min(8),
    }),
    async resolve(req) {
      // use your ORM of choice
      return await db.user.create({
        data: {
          name: req.input.name,
          email: req.input.email,
          password: req.input.password,
        },
      });
    },
  });
export default user;
export type User = typeof user;
