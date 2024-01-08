import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { TodoResolver } from './todo/todo.resolver';
import { mkdir, writeFileSync } from 'fs';
import { printSchema } from 'graphql';

const generateSchema = async () => {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);

  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([TodoResolver]);
  mkdir('./__generated__', () => {
    writeFileSync('./__generated__/schema.gql', printSchema(schema));
  });
};

generateSchema();
