"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import type { Todo } from "~/server/api/routers/todo";
import { api } from "~/trpc/react";
import CreateTodo from "./CreateTodo";
import TodoCard from "./TodoCard";

type TodoListProps = {
  initTodos: Todo[];
};

const TodoFeed = ({ initTodos }: TodoListProps) => {
  const getTodos = api.todo.getAll.useQuery(undefined, {
    initialData: initTodos,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const [listTodoRef] = useAutoAnimate();

  const { mutateAsync, error: todoError } = api.todo.create.useMutation({
    onSettled: () => {
      void getTodos.refetch();
    },
  });

  const submit = async (content: string) => {
    try {
      await mutateAsync({ content });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <CreateTodo submit={submit} />
      {todoError?.data?.zodError?.fieldErrors.content && (
        <pre className="pb-2 text-red-500">
          {todoError.data.zodError.fieldErrors.content}
        </pre>
      )}

      <div ref={listTodoRef} className="flex w-full flex-col gap-y-4">
        {getTodos.data.map((todo) => (
          <TodoCard
            key={todo.id}
            id={todo.id}
            isDone={todo.completed}
            content={todo.content}
          />
        ))}
      </div>
    </>
  );
};

export default TodoFeed;
