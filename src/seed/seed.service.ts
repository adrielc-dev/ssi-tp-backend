import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessLog } from '../access/access-log.entity';

@Injectable()
export class SeedService {
  private readonly domains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'live.com', 'protonmail.com'];
  private readonly firstNames = ['juan', 'maria', 'carlos', 'laura', 'pedro', 'ana', 'diego', 'lucia', 'facu', 'mica', 'tomas', 'valen', 'agus', 'santi', 'feli'];
  private readonly lastNames = ['perez', 'garcia', 'lopez', 'martinez', 'rodriguez', 'gonzalez', 'fernandez', 'diaz', 'moreno', 'torres'];

  constructor(
    @InjectRepository(AccessLog)
    private readonly accessLogRepository: Repository<AccessLog>,
  ) {}

  private randomIP(): string {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
  }

  private randomDate(): Date {
    const now = new Date();
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    return new Date(threeDaysAgo.getTime() + Math.random() * (now.getTime() - threeDaysAgo.getTime()));
  }

  private randomPassword(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let pwd = '';
    for (let i = 0; i < 8 + Math.floor(Math.random() * 6); i++) {
      pwd += chars[Math.floor(Math.random() * chars.length)];
    }
    return pwd;
  }

  private randomEmail(): string {
    const name = this.firstNames[Math.floor(Math.random() * this.firstNames.length)];
    const lastName = this.lastNames[Math.floor(Math.random() * this.lastNames.length)];
    const domain = this.domains[Math.floor(Math.random() * this.domains.length)];
    const num = Math.floor(Math.random() * 100);
    return `${name}.${lastName}${num}@${domain}`;
  }

  async generate(count: number): Promise<{ created: number }> {
    await this.accessLogRepository.clear();

    const records: object[] = [];
    for (let i = 0; i < count; i++) {
      records.push({
        email: this.randomEmail(),
        passwordCaptured: this.randomPassword(),
        ipAddress: this.randomIP(),
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        createdAt: this.randomDate(),
      });
    }

    await this.accessLogRepository
      .createQueryBuilder()
      .insert()
      .into(AccessLog)
      .values(records)
      .execute();

    return { created: records.length };
  }
}
