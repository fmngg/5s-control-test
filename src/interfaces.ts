import { z } from "zod";

export const TodoSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.enum(["Новая", "В работе", "Завершена"]),
  date: z.string(),
});

export type ITodo = z.infer<typeof TodoSchema>;
