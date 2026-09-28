import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TaskEntity } from './entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // 조회 - 전체
  @Get()
  async findAll(): Promise<TaskEntity[]> {
    return await this.taskService.getTasks();
  }

  // 조회 - 상세
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return await this.taskService.getTask(id);
  }

  // 생성
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreateTaskDto) {
    return await this.taskService.create(body);
  }

  // 수정
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateTaskDto) {
    return this.taskService.update(id, body);
  }

  //삭제
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.delete(id);
  }
}
