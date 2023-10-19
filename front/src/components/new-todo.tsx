import { Todo } from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CREATE_TODO } from "@/lib/gql/mutations/todo";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  onNew: (todo: Todo) => void;
};

const formSchema = z.object({
  content: z.string().min(3, {
    message: "Content must be at least 3 characters.",
  }),
});

const NewTodo = ({ onNew }: Props) => {
  const [createTodo, { data: createData, loading: createLoading }] =
    useMutation(CREATE_TODO);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { content } = values;

    createTodo({
      variables: {
        createTodoInput: {
          content,
        },
      },
    });
  };

  useEffect(() => {
    if (createData?.createTodo) onNew(createData.createTodo);
  }, [createData]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input placeholder="Walk the dog" {...field}></Input>
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <Button type="submit" disabled={createLoading}>
          {createLoading ? "Creating..." : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default NewTodo;
