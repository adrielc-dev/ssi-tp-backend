import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessLog } from './access-log.entity';

@Injectable()
export class AccessService {
  constructor(
    @InjectRepository(AccessLog)
    private readonly accessLogRepository: Repository<AccessLog>,
  ) {}

  private generateRandomIP(): string {
    const octets = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256));
    return octets.join('.');
  }

  async registerAccess(
    email: string,
    passwordCaptured: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<AccessLog> {
    const log = new AccessLog();
    log.email = email;
    log.passwordCaptured = passwordCaptured;
    log.ipAddress = ipAddress || this.generateRandomIP();
    log.userAgent = userAgent || '';
    return this.accessLogRepository.save(log);
  }
}
