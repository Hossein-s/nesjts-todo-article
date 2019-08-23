import { Todo } from './todo.entity';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class TodoService {
    constructor(
        @Inject(REQUEST)
        private readonly request,
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
    ) {}

    async getTodo(id: number): Promise<Todo> {
        const todo = await this.todoRepository.findOne({
            id,
            user: this.request.user,
        });

        if (!todo) {
            throw new NotFoundException();
        }

        return todo;
    }

    async getTodos(): Promise<Todo[]> {
        return await this.todoRepository.find({ user: this.request.user });
    }

    async createTodo(todo: Todo): Promise<Todo> {
        return await this.todoRepository.save({ ...todo, user: this.request.user });
    }

    async updateTodo(id: number, todo: Todo): Promise<Todo> {
        const oldTodo = await this.todoRepository.findOne({
            id,
            user: this.request.user,
        });
        
        if (!oldTodo) {
            throw new NotFoundException();
        }

        const newTodo = {
            ...oldTodo,
            ...todo,
        };

        return await this.todoRepository.save(newTodo);
    }

    async deleteTodo(id: number): Promise<boolean> {
        await this.todoRepository.delete({ id, user: this.request.user });
        return true;
    }
}
