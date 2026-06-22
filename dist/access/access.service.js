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
exports.AccessService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const access_log_entity_1 = require("./access-log.entity");
let AccessService = class AccessService {
    accessLogRepository;
    constructor(accessLogRepository) {
        this.accessLogRepository = accessLogRepository;
    }
    generateRandomIP() {
        const octets = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256));
        return octets.join('.');
    }
    async registerAccess(email, passwordCaptured, ipAddress, userAgent) {
        const log = new access_log_entity_1.AccessLog();
        log.email = email;
        log.passwordCaptured = passwordCaptured;
        log.ipAddress = ipAddress || this.generateRandomIP();
        log.userAgent = userAgent || '';
        return this.accessLogRepository.save(log);
    }
};
exports.AccessService = AccessService;
exports.AccessService = AccessService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(access_log_entity_1.AccessLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AccessService);
//# sourceMappingURL=access.service.js.map