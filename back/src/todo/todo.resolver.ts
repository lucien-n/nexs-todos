import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/create-todo.input';

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
}