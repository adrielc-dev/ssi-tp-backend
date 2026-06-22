import { Repository } from 'typeorm';
import { AccessLog } from '../access/access-log.entity';
export declare class DashboardService {
    private readonly accessLogRepository;
    constructor(accessLogRepository: Repository<AccessLog>);
    getStats(): Promise<{
        totalParticipants: number;
        totalEmails: number;
        todayParticipants: number;
        lastAccess: Date | null;
    }>;
    private generateRandomIP;
    getLogs(): Promise<{
        id: number;
        date: string;
        time: string;
        email: string;
        domain: string;
        password: string;
        ipAddress: string;
        status: string;
        createdAt: Date;
    }[]>;
}
