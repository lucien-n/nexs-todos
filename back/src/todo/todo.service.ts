import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoInput } from './dto/create-todo.input';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly repository: Repository<Todo>,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async create(createTodoInput: CreateTodoInput) {
    const res = await this.repository
      .createQueryBuilder()
      .insert()
      .into('todos')
      .values(createTodoInput)
      .returning('*')
      .execute();
    return res.raw?.[0];
  }
}
