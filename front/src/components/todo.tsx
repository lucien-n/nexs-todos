import { Todo as TTodo } from "@/__generated__/graphql";
import { Card, CardContent, CardHeader } from "./ui/card";

type Props = {
  todo: TTodo;
};

const Todo = ({ todo }: Props) => {
  return (
    <Card>
      <CardHeader>{todo.completed}</CardHeader>
      <CardContent>{todo.content}</CardContent>
    </Card>
  );
};

export default Todo;
