import { Repository } from 'typeorm';
import { AccessLog } from './access-log.entity';
export declare class AccessService {
    private readonly accessLogRepository;
    constructor(accessLogRepository: Repository<AccessLog>);
    private generateRandomIP;
    registerAccess(email: string, passwordCaptured: string, ipAddress?: string, userAgent?: string): Promise<AccessLog>;
}
