import { Todo as TTodo } from "@/__generated__/graphql";
import NewTodo from "@/components/new-todo";
import Todo from "@/components/todo";
import { GET_TODOS } from "@/lib/gql/queries/todo";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const Index = () => {
  const { data } = useQuery(GET_TODOS);
  const [todos, setTodos] = useState<TTodo[]>([]);

  useEffect(() => {
    if (!data?.todos) return;
    setTodos(data.todos);
  }, [data]);

  return (
    <main>
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
      <NewTodo />
    </main>
  );
};

export default Index;
