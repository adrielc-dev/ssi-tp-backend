import { AccessService } from './access.service';
export declare class AccessController {
    private readonly accessService;
    constructor(accessService: AccessService);
    registerAccess(body: {
        email: string;
        password: string;
    }, req: any): Promise<{
        success: boolean;
        message: string;
        id: number;
    }>;
}
