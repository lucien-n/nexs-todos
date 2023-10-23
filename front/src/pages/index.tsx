import { Todo as TTodo } from "@/__generated__/graphql";
import Filters from "@/components/filters";
import NewTodo from "@/components/new-todo";
import Todo from "@/components/todo";
import { Separator } from "@/components/ui/separator";
import { FILTERS } from "@/lib/consts";
import { GET_TODOS } from "@/lib/gql/queries/todo";
import type { Filters as TFilters } from "@/lib/types";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const Index = () => {
  const { data } = useQuery(GET_TODOS);

  const [todos, setTodos] = useState<TTodo[]>([]);
  const [filters, setFilters] = useState<TFilters>({
    by: "createDate",
    direction: "ascending",
  });

  const sortTodos = (td: TTodo[]) => {
    const { by, direction } = filters;
    let compare: (a: TTodo, b: TTodo) => number = (a, b) =>
      new Date(a.createDate).getTime() - new Date(b.createDate).getTime();

    if (by === "updateDate")
      compare = (a, b) =>
        new Date(a.createDate).getTime() - new Date(b.createDate).getTime();
    else if (by === "content")
      compare = (a, b) => (a.content > b.content ? -1 : 1);
    else if (by === "completed")
      compare = (a, b) => (a.completed && !b.completed ? -1 : 1);

    let sorted = td;
    if (compare) {
      sorted = td.sort(compare);
    }

    if (direction === "asc") return sorted;
    return sorted.reverse();
  };

  useEffect(() => {
    if (!data?.todos) return;
    setTodos(data.todos);
  }, [data]);

  return (
    <section className="flex flex-col space-y-5">
      <NewTodo refetchQuery={GET_TODOS} />
      <Separator />
      <section className="flex gap-3">
        <Filters setFilters={setFilters} filters={filters} />
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
