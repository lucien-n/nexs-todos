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

  const compareDate = (a: any, b: any) => {
    return new Date(a).getTime() - new Date(b).getTime();
  };

  const sortTodos = (td: TTodo[]) => {
    const sorted = td
      .sort((a, b) => compareDate(a.createDate, b.createDate))
      .reverse();
    return sorted;
  };

  useEffect(() => {
    if (!data?.todos) return;
    setTodos(
      data.todos.map((todo: TTodo) => {
        const { __typename, ...todoData } = todo;
        return todoData;
      })
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
        {sortTodos(todos).map((todo) => (
          <Todo todo={todo} key={todo.id} refetchQuery={GET_TODOS} />
        ))}
      </section>
    </section>
  );
};

export default Index;
