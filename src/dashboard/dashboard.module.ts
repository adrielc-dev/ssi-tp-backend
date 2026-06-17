import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessLog } from '../access/access-log.entity';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccessLog])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
