import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    async getTodos() {
        return await this.todoService.getTodos();
    }

    @Get(':id')
    async getTodo(@Param('id') id: number) {
        return await this.todoService.getTodo(id);
    }

    @Post()
    async createTodo(@Body() todo: Todo) {
        return await this.todoService.createTodo(todo);
    }

    @Put(':id')
    async updateTodo(@Param('id') id: number, @Body() todo: Todo) {
        return await this.todoService.updateTodo(id, todo);
    }

    @Delete(':id')
    async deleteTodo(@Param('id') id: number) {
        return await this.deleteTodo(id);
    }
}
