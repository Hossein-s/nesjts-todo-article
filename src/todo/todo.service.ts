import { Todo } from './todo.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
    ) {}

    async getTodo(id: number): Promise<Todo> {
        return await this.todoRepository.findOneOrFail(id);
    }

    async getTodos(): Promise<Todo[]> {
        return await this.todoRepository.find();
    }

    async createTodo(todo: Todo): Promise<Todo> {
        return await this.todoRepository.save(todo);
    }

    async updateTodo(id: number, todo: Todo): Promise<Todo> {
        const oldTodo = await this.todoRepository.findOneOrFail(id);
        const newTodo = {
            ...oldTodo,
            ...todo,
        };

        return await this.todoRepository.save(newTodo);
    }

    async deleteTodo(id: number): Promise<boolean> {
        await this.todoRepository.delete(id);
        return true;
    }
}
