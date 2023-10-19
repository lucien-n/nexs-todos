import { Todo as TTodo } from "@/__generated__/graphql";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DELETE_TODO } from "@/lib/gql/mutations/todo";
import { useMutation } from "@apollo/client";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useEffect } from "react";
import { GET_TODOS } from "@/lib/gql/queries/todo";

type Props = {
  todo: TTodo;
  refetchQuery: any;
};

const Todo = ({ todo, refetchQuery }: Props) => {
  const [deleteTodo, { data: deleteData, loading: deleteLoading }] =
    useMutation(DELETE_TODO, { refetchQueries: [{ query: refetchQuery }] });

  const handleDeleteClick = async () => {
    if (!todo.id) return;
    await deleteTodo({ variables: { id: todo.id } });
  };

  return (
    <Card className="flex w-full m-0 gap-3 px-3 py-1 items-center">
      <CardHeader className="p-0 m-0">
        <Checkbox></Checkbox>
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
