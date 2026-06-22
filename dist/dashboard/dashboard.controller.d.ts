import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(): Promise<{
        totalParticipants: number;
        totalEmails: number;
        todayParticipants: number;
        lastAccess: Date | null;
    }>;
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
