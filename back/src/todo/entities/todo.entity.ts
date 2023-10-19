import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType({ description: 'Todo' })
export class Todo {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', length: 120 })
  content: string;

  @Field()
  @Column({ type: 'bool', default: false })
  completed: boolean;

  @Field()
  @CreateDateColumn()
  createDate: Date;

  @Field()
  @UpdateDateColumn()
  updateDate: Date;
}
