import { Todo as TTodo } from "@/__generated__/graphql";
import NewTodo from "@/components/new-todo";
import Todo from "@/components/todo";
import { Separator } from "@/components/ui/separator";
import { GET_TODOS } from "@/lib/gql/queries/todo";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const Index = () => {
  const { data } = useQuery(GET_TODOS);
  const [todos, setTodos] = useState<TTodo[]>([]);

  const sortTodos = (todos: TTodo[]) => {
    return todos
      .slice()
      .sort(
        (a, b) =>
          new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
      );
  };

  useEffect(() => {
    if (!data?.todos) return;
    setTodos(data.todos);
  }, [data]);

  return (
    <section className="flex flex-col space-y-5">
      <NewTodo refetchQuery={GET_TODOS} />
      <Separator />
      <section className="flex flex-col space-y-2">
        {sortTodos(todos).map((todo) => (
          <Todo todo={todo} key={todo.id} refetchQuery={GET_TODOS} />
        ))}
      </section>
    </section>
  );
};

export default Index;
