import { Todo as TTodo, UpdateTodoInput } from "@/__generated__/graphql";
import Filters from "@/components/filters";
import NewTodo from "@/components/new-todo";
import Todo from "@/components/todo";
import { Separator } from "@/components/ui/separator";
import { FILTERS } from "@/lib/consts";
import { UPDATE_TODO } from "@/lib/gql/mutations/todo";
import { GET_TODOS } from "@/lib/gql/queries/todo";
import type { Filters as TFilters } from "@/lib/types";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";

const Index = () => {
  const { data } = useQuery(GET_TODOS);

  const [todos, setTodos] = useState<TTodo[]>([]);
  const [filters, setFilters] = useState<TFilters>({
    by: "createDate",
    direction: "ascending",
  });
  const [updateTodo, { loading: updateLoading }] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
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

    let sorted = td.slice();
    if (compare) {
      sorted = td.slice().sort(compare);
    }

    if (direction === "asc") return sorted;
    return sorted.reverse();
  };

  const handleUpdateTodo = async (todo: UpdateTodoInput) => {
    await updateTodo({
      variables: {
        updateTodoInput: todo,
      },
      optimisticResponse: {
        updateTodo: { ...todo, content: "[OR] " + todo.content },
      },
    });
  };

  const handleChangeTodo = ({
    id,
    content,
    completed,
  }: Partial<Pick<TTodo, "content" | "completed">> &
    Required<Pick<TTodo, "id">>) => {
    let todo = todos.find(({ id: todoId }) => todoId === id);
    if (!todo) return;

    setTodos([
      ...todos.filter(({ id: todoId }) => todoId !== id),
      {
        ...todo,
        id,
        content: content ?? todo.content,
        completed: completed === undefined ? todo.completed : completed,
      },
    ]);
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
          <Todo
            todo={todo}
            key={todo.id}
            onUpdate={handleUpdateTodo}
            onChange={handleChangeTodo}
          />
        ))}
      </section>
    </section>
  );
};

export default Index;
