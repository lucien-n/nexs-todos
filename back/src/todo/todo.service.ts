import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoInput } from './dto/create-todo.input';
import { Todo } from './entities/todo.entity';
import { UpdateTodoInput } from './dto/update-todo.input';

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
      .into('todo')
      .values(createTodoInput)
      .returning('*')
      .execute();
    return res.raw?.[0];
  }

  async update(updateTodoInput: UpdateTodoInput) {
    const res = await this.repository
      .createQueryBuilder()
      .update()
      .set(updateTodoInput)
      .returning('*')
      .execute();
    return res.raw?.[0];
  }

  async delete(id: string) {
    const res = await this.repository
      .createQueryBuilder()
      .delete()
      .from('todo')
      .where('id = :id', { id })
      .returning('*')
      .execute();
    return res.raw?.[0];
  }
}
