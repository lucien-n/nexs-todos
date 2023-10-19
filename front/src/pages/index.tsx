import { Todo as TTodo } from "@/__generated__/graphql";
import NewTodo from "@/components/new-todo";
import Todo from "@/components/todo";
import { GET_TODOS } from "@/lib/gql/queries/todo";
import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";

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

  const onNew = useCallback(
    (data: TTodo) => {
      const { __typename, ...todo } = data;
      setTodos([...todos, todo]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [todos, setTodos]
  );

  const onDelete = useCallback(
    (id: string) => setTodos(todos.filter(({ id: _id }) => id !== _id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [todos, setTodos]
  );

  useEffect(() => {
    if (!data?.todos) return;
    setTodos(data.todos);
  }, [data]);

  return (
    <section>
      <NewTodo onNew={onNew} />
      {sortTodos(todos).map((todo) => (
        <Todo todo={todo} key={todo.id} onDelete={onDelete} />
      ))}
    </section>
  );
};

export default Index;
