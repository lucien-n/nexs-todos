import { Todo as TTodo } from "@/__generated__/graphql";
import Filters from "@/components/filters";
import NewTodo from "@/components/new-todo";
import Todo from "@/components/todo";
import { Separator } from "@/components/ui/separator";
import { GET_TODOS } from "@/lib/gql/queries/todo";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const Index = () => {
  const { data } = useQuery(GET_TODOS);
  const [todos, setTodos] = useState<TTodo[]>([]);

  useEffect(() => {
    if (!data?.todos) return;
    setTodos(
      data.todos
        .map((todo) => {
          const { __typename, ...todoData } = todo;
          return todoData;
        })
        .sort(
          (a, b) =>
            new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
        )
        .reverse()
    );
  }, [data]);

  return (
    <section className="flex flex-col space-y-5">
      <NewTodo refetchQuery={GET_TODOS} />
      <Separator />
      <section className="flex gap-3">
        <Filters setTodos={setTodos} />
      </section>
      <section className="flex flex-col space-y-2">
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} refetchQuery={GET_TODOS} />
        ))}
      </section>
    </section>
  );
};

export default Index;
