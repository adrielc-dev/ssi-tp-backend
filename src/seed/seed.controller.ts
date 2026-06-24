import { Controller, Post, Param } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post(':count')
  async seed(@Param('count') count: string) {
    const num = parseInt(count, 10) || 50;
    return this.seedService.generate(num);
  }
}
