import { Module } from '@nestjs/common';
import { LogServiceModule } from 'app/core/providers/log/log.module';
import { ExpiredController } from 'app/views/expired/expired.controller';

@Module({
    imports: [LogServiceModule],
    controllers: [ExpiredController],
})
export class ExpiredModule {}