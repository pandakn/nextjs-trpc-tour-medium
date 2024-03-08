"use client";

import { useState } from "react";

type CreateTodoProps = {
  submit: (content: string) => Promise<void>;
};

function CreateTodo({ submit }: CreateTodoProps) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit(content);
    setContent("");
  };

  return (
    <div className="mb-4 w-full">
      <form className="flex flex-col items-center justify-center gap-2 sm:flex-row">
        <input
          value={content}
          name="content"
          className="rounded-xl p-2 text-lg outline-none placeholder:text-base sm:text-xl"
          type="text"
          placeholder="What to do on a nice day?"
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="whitespace-nowrap rounded-xl bg-textColor px-4 py-2 font-bold text-white"
          onClick={handleSubmit}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default CreateTodo;
