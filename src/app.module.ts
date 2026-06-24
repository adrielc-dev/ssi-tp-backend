import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessModule } from './access/access.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AccessLog } from './access/access-log.entity';

function databaseConfig() {
  if (process.env.DATABASE_URL) {
    return TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [AccessLog],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
      timezone: 'UTC',
    });
  }

  return TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: 'database.sqlite',
    entities: [AccessLog],
    synchronize: true,
  });
}

@Module({
  imports: [
    databaseConfig(),
    AccessModule,
    DashboardModule,
  ],
})
export class AppModule {}
