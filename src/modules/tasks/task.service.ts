import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskEntity } from './entities/task.entity';

import { CreateTaskDto, UpdateTaskDto } from './dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  // 조회 - 전체
  // DB의 모든 데이터를 배열 형태로 가져온다.
  // SQL: SELECT * FROM tasks
  async getTasks(): Promise<TaskEntity[]> {
    // find()는 조건 없이 호출하면 전체 데이터를 조회한다.
    return await this.taskRepository.find();
  }

  // 조회 - 개별
  async getTask(taskId: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      throw new NotFoundException('해당ID에 해당하는 taks가 없습니다.');
    }
    return task;
  }

  // 생성
  create(payload: CreateTaskDto) {
    // Entity 기반으로 설계된 테이블 구조에 맞게 매핑한 후 저장
  }
  // 수정
  update(taskId: number, payload: UpdateTaskDto) {}
  // 삭제
  delete(taskId: number) {}
}
