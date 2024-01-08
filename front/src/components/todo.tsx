import { Todo as TTodo, UpdateTodoInput } from "@/__generated__/graphql";
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
import { GET_TODOS } from "@/lib/gql/queries/todo";

type Props = {
  todo: TTodo;
  onUpdate: (todo: UpdateTodoInput) => void;
  onChange: (todo: TTodo) => void;
};

const Todo = ({ todo, onUpdate, onChange }: Props) => {
  const [deleteTodo, { loading: deleteLoading }] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }],
  });

  const [completed, setCompleted] = useState<boolean>(todo.completed);
  const [content, setContent] = useState<string>(todo.content);
  const [editing, setEditing] = useState<boolean>(false);

  const handleDeleteClick = async () => {
    if (!todo.id) return;
    await deleteTodo({ variables: { id: todo.id } });
  };

  const handleCompleteClick = async () => {
    const { id, content } = todo;
    onUpdate({ id, content, completed: !completed });

    setCompleted(!completed);
  };

  const handleEditingClick = async () => {
    if (editing) {
      const { id, content, completed } = todo;
      onUpdate({ id, content, completed });
    }

    setEditing(!editing);
  };

  return (
    <Card className="flex w-full m-0 gap-3 items-center">
      <CardHeader className="p-3 pr-0">
        <Checkbox onClick={handleCompleteClick} checked={completed} />
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
              onChange({ ...todo, content: e.target.value })
            }
          />
        ) : (
          <p>{todo.content}</p>
        )}
      </CardContent>
      <CardFooter className="p-0 m-0">
        <Button variant="ghost" onClick={handleEditingClick}>
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
