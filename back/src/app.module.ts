import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TodoModule } from './todo/todo.module';

import { config } from 'dotenv';
config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          type: 'postgres',
          port: parseInt(process.env.DB_PORT || '5432'),
          host: process.env.DB_HOST || 'localhost',
          database: process.env.DB_NAME || 'postgres',
          password: process.env.DB_PASSWORD || '',
          autoLoadEntities: true,
          synchronize: true,
          logging: ['error', 'info', 'log', 'schema', 'warn'],
          maxQueryExecutionTime: 1_000,
        };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './__generated__/schema.gql',
    }),
    TodoModule,
  ],
})
export class AppModule {}
