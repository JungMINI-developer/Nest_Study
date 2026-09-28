import { Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TaskService {
  // 조회 - 전체
  getTasks() {}
  // 조회 - 개별
  getTask(taskId: number) {}

  // 생성
  create(payload: CreateTaskDto) {
    // Entity 기반으로 설계된 테이블 구조에 맞게 매핑한 후 저장
  }
  // 수정
  update(taskId: number, payload: UpdateTaskDto) {}
  // 삭제
  delete(taskId: number) {}
}
