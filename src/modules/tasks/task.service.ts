import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
  // DTO를 엔티티 개겣로 매핑한 후 실제 DB에 저장
  // SQL: INSERT INTO tasks (title, content, category, thumbnail, ...)
  async create(payload: CreateTaskDto) {
    // Entity 기반으로 설계된 테이블 구조에 맞게 매핑한 후 저장
    // create(): DTO 데이터를 바탕으로 새로운 엔티티 인스턴스를 생성.
    const newTask = this.taskRepository.create(payload);

    // save(): 생성된 엔티티 객체를 실제 DB 테이블에 저장.
    await this.taskRepository.save(newTask);
    return {
      message: 'task 생성을 완료하였습니다.',
      statusCode: HttpStatus.CREATED, // 201
    };
  }
  // 수정
  // 특정 ID의 데이터를 찾아 페이로드(updateTaskDto)의 내용으로 변경한다.
  // SQL: UPDATE tasks SET title =?, content = ?, ... WHERE id = ?
  async update(taskId: number, payload: UpdateTaskDto) {
    // 기존 데이터 확인
    // 아무 구현된 getTask()를 호출하여 데이터가 있는지 없는지 먼저 검증
    // 데이터가 없으면 getTask 내부에서 NotFoundException을 발생.
    const task = await this.getTask(taskId);

    //데이터 병합(Merging)
    // Object.assign(대상객체, 소스객체)를 사용하여 기존 엔티티에 수정된 내용만 덮어씌움
    // payload에 없는 속성은 기본 값을 유지
    Object.assign(task, payload);

    // DB저장
    // save() 메서드는 엔티티에 primary key(id)가 포함되어 있으면
    // 새로운 행을 생성하지 않고, 기존 행을 업데이트 한다.
    return await this.taskRepository.save(task);
  }

  // 삭제
  // ID를 기준으로 데이터를 삭제한다.
  // SQL: DELETE FROM tasks WHERE taskId = ?
  async delete(taskId: number) {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });

    if (!task) {
      throw new NotFoundException('해당ID에 해당하는 taks가 없습니다.');
    }

    await this.taskRepository.delete(taskId);

    return {
      message: 'task 삭제를 완료하였습니다.',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }
}
