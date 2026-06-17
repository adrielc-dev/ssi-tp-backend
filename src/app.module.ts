import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessModule } from './access/access.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AccessLog } from './access/access-log.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      entities: [AccessLog],
      synchronize: true,
    }),
    AccessModule,
    DashboardModule,
  ],
})
export class AppModule {}
