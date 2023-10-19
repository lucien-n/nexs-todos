import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Length(3, 120)
  @Field()
  content: string;
}
