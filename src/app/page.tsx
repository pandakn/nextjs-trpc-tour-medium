import TodoFeed from "~/components/TodoFeed";
import { api } from "~/trpc/server";

export default async function Home() {
  const todos = await api.todo.getAll.query();

  return (
    <main className="mx-auto max-w-xl p-24 ">
      <TodoFeed initTodos={todos} />
    </main>
  );
}
