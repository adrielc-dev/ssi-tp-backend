import { Controller, Post, Body, Req } from '@nestjs/common';
import { AccessService } from './access.service';

@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @Post()
  async registerAccess(
    @Body() body: { email: string; password: string },
    @Req() req: any,
  ) {
    const forwarded = req.headers['x-forwarded-for'] as string;
    const ipAddress = forwarded ? forwarded.split(',')[0].trim() : req.socket?.remoteAddress;
    const userAgent = req.headers['user-agent'] || '';

    const log = await this.accessService.registerAccess(
      body.email,
      body.password,
      ipAddress,
      userAgent,
    );

    return {
      success: true,
      message: 'Acceso registrado',
      id: log.id,
    };
  }
}
