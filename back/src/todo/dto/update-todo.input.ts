import { Field, InputType } from '@nestjs/graphql';
import { CreateTodoInput } from './create-todo.input';
import { IsBoolean, IsUUID } from 'class-validator';

@InputType()
export class UpdateTodoInput extends CreateTodoInput {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @IsBoolean()
  completed: boolean;
}
