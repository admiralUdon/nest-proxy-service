import { Module } from '@nestjs/common';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { HttpModule } from '@nestjs/axios';
import { LogServiceModule } from 'app/core/providers/log/log.module';

@Module({
  imports: [HttpModule, LogServiceModule],
  controllers: [ProxyController],
  providers: [ProxyService]
})
export class ProxyModule {}