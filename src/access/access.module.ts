import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessLog } from './access-log.entity';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccessLog])],
  controllers: [AccessController],
  providers: [AccessService],
  exports: [AccessService, TypeOrmModule],
})
export class AccessModule {}
