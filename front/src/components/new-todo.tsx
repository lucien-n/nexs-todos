import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl } from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";

type Props = {};

const formSchema = z.object({
  content: z.string().min(3, {
    message: "Content must be at least 3 characters.",
  }),
});

const NewTodo = ({}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default NewTodo;
