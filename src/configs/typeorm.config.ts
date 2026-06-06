import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

interface DbConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
}

const dbConfig = config.get<DbConfig>('db');

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbConfig.type as any,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
};
