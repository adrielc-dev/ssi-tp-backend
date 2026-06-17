import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessLog } from '../access/access-log.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(AccessLog)
    private readonly accessLogRepository: Repository<AccessLog>,
  ) {}

  async getStats() {
    const totalParticipants = await this.accessLogRepository.count();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    const todayParticipants = await this.accessLogRepository
      .createQueryBuilder('log')
      .where("date(log.created_at) = :today", { today: todayStr })
      .getCount();

    const totalEmails = await this.accessLogRepository
      .createQueryBuilder('log')
      .select('COUNT(DISTINCT log.email)', 'count')
      .getRawOne();

    const lastAccess = await this.accessLogRepository.find({
      order: { createdAt: 'DESC' },
      take: 1,
    });

    return {
      totalParticipants,
      totalEmails: parseInt(totalEmails?.count || '0', 10),
      todayParticipants,
      lastAccess: lastAccess.length > 0 ? lastAccess[0].createdAt : null,
    };
  }

  async getLogs() {
    const logs = await this.accessLogRepository.find({
      order: { createdAt: 'DESC' },
    });

    return logs.map((log) => {
      const emailParts = log.email.split('@');
      const domain = emailParts.length > 1 ? emailParts[1] : 'desconocido';
      const createdAt = new Date(log.createdAt);

      return {
        id: log.id,
        date: createdAt.toLocaleDateString('es-AR'),
        time: createdAt.toLocaleTimeString('es-AR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        email: log.email,
        domain,
        status: 'Capturado',
        createdAt: log.createdAt,
      };
    });
  }
}
