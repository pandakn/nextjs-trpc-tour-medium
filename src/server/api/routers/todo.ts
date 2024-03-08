import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const TTodo = z.object({
  id: z.number(),
  content: z.string().min(3, "content must be at least 4 characters"),
  completed: z.boolean(),
});

export type Todo = z.infer<typeof TTodo>;

const todos: Todo[] = [
  {
    id: 1,
    content: "My first blog",
    completed: false,
  },
];

export const todoRouter = createTRPCRouter({
  create: publicProcedure
    .input(TTodo.pick({ content: true }))
    .mutation(async ({ input }) => {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const todo: Todo = {
        id: todos.length + 1,
        content: input.content,
        completed: false,
      };

      todos.push(todo);

      return todos;
    }),

  getAll: publicProcedure.query(async () => {
    return todos;
  }),
});
