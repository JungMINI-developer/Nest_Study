import { Repository } from 'typeorm';
import { Boards } from './board.entity';
import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardRepository extends Repository<Boards> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Boards> {
    const { title, description } = createBoardDto;

    const board = new Boards();
    board.title = title;
    board.description = description;
    board.status = BoardStatus.PUBLIC;
    await board.save();

    return board;
  }
}
