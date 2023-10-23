import { Todo as TTodo } from "@/__generated__/graphql";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DELETE_TODO, UPDATE_TODO } from "@/lib/gql/mutations/todo";
import { useMutation } from "@apollo/client";
import { Check, Edit, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

type Props = {
  todo: TTodo;
  refetchQuery: any;
};

const Todo = ({ todo, refetchQuery }: Props) => {
  const [deleteTodo, { loading: deleteLoading }] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: refetchQuery }],
  });
  const [updateTodo, { loading: updateLoading }] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: refetchQuery }],
  });

  const [completed, setCompleted] = useState<boolean>(todo.completed);
  const [content, setContent] = useState<string>(todo.content);
  const [editing, setEditing] = useState<boolean>(false);

  const handleDeleteClick = async () => {
    if (!todo.id) return;
    await deleteTodo({ variables: { id: todo.id } });
  };

  const handleCompleteClick = async () => {
    setCompleted(!completed);

    const { id, content } = todo;
    await updateTodo({
      variables: {
        updateTodoInput: { id, content, completed: !completed },
      },
    });
  };

  const handleEditingClick = async () => {
    if (editing) {
      const { id, completed } = todo;
      await updateTodo({
        variables: {
          updateTodoInput: {
            id,
            completed,
            content,
          },
        },
      });
    }

    setEditing(!editing);
  };

  return (
    <Card className="flex w-full m-0 gap-3 items-center">
      <CardHeader className="p-3 pr-0">
        <Checkbox
          onClick={handleCompleteClick}
          checked={completed}
          disabled={updateLoading}
        />
      </CardHeader>
      <CardContent
        className="py-2 px-1 w-full"
        onDoubleClick={() => setEditing(true)}
        onKeyDown={({ key }) => (key === "Enter" ? handleEditingClick() : null)}
      >
        {editing ? (
          <Input
            type="text"
            value={content}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setContent(e.target.value)
            }
          />
        ) : (
          <p>{content}</p>
        )}
      </CardContent>
      <CardFooter className="p-0 m-0">
        <Button
          disabled={updateLoading}
          variant="ghost"
          onClick={handleEditingClick}
        >
          {editing ? <Check /> : <Edit />}
        </Button>
        <Button
          disabled={deleteLoading}
          variant="ghost"
          onClick={handleDeleteClick}
        >
          <Trash2 />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Todo;
