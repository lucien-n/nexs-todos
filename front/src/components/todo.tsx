import { Todo as TTodo } from "@/__generated__/graphql";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DELETE_TODO, UPDATE_TODO } from "@/lib/gql/mutations/todo";
import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

type Props = {
  todo: TTodo;
  refetchQuery: any;
};

const Todo = ({ todo, refetchQuery }: Props) => {
  const [deleteTodo, { data: deleteData, loading: deleteLoading }] =
    useMutation(DELETE_TODO, { refetchQueries: [{ query: refetchQuery }] });
  const [updateTodo, { loading: updateLoading }] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: refetchQuery }],
  });

  const [completed, setCompleted] = useState<boolean>(todo.completed);

  const handleDeleteClick = async () => {
    if (!todo.id) return;
    await deleteTodo({ variables: { id: todo.id } });
  };

  const handleCompleteClick = async (e: ChangeEvent<HTMLInputElement>) => {
    const checked = !!e.target.checked;
    setCompleted(checked);

    const { __typename, ...todoData } = todo;
    await updateTodo({
      variables: {
        updateTodoInput: { ...todoData, completed: checked },
      },
    });
  };

  return (
    <Card className="flex w-full m-0 gap-3 px-3 py-1 items-center">
      <CardHeader className="p-0 m-0">
        <Checkbox
          onClick={handleCompleteClick}
          checked={completed}
          disabled={updateLoading}
        />
      </CardHeader>
      <CardContent className="p-0 m-0 w-full">{todo.content}</CardContent>
      <CardFooter className="p-0 m-0">
        <Button
          disabled={deleteLoading}
          variant={"destructive"}
          onClick={() => handleDeleteClick()}
        >
          {deleteLoading ? "Deleting" : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Todo;
