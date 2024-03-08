type TodoCardProps = {
  id: number;
  content: string;
  isDone: boolean;
};

const TodoCard = ({ content, isDone }: TodoCardProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
      <div className="flex flex-1 items-center gap-x-2 truncate">
        <p
          className={`text-textColor text-lg md:text-2xl ${
            isDone && "line-through"
          }`}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

export default TodoCard;
