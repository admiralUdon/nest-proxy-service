import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LogServiceModule } from 'app/core/providers/log/log.module';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';

@Module({
  imports: [HttpModule, LogServiceModule],
  controllers: [ProxyController],
  providers: [ProxyService]
})
export class ProxyModule {}