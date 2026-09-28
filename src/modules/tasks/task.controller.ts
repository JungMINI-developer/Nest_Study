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

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // 조회 - 전체
  @Get()
  findAll() {
    this.taskService.getTasks();
  }

  // 조회 - 상세
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    this.taskService.getTask(id);
  }

  // 생성
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreateTaskDto) {
    this.taskService.create(body);
  }

  // 수정
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateTaskDto) {
    this.taskService.update(id, body);
  }

  //삭제
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.taskService.delete(id);
  }
}
