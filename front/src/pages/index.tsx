import { Todo as TTodo } from "@/__generated__/graphql";
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
    <h1>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.content}</div>
      ))}
    </h1>
  );
};

export default Index;
