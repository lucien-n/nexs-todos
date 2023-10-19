import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly service: TodoService) {}

  @Query(() => [Todo], { name: 'todos' })
  findAll() {
    return this.service.findAll();
  }

  @Mutation(() => Todo)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.service.create(createTodoInput);
  }

  @Mutation(() => Todo)
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.service.update(updateTodoInput);
  }

  @Mutation(() => Todo)
  deleteTodo(@Args('id') id: string) {
    return this.service.delete(id);
  }
}
