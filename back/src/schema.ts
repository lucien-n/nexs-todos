import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { Todo } from './todo/entities/todo.entity';

const generateSchema = async () => {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);

  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([Todo]);
};

generateSchema();
