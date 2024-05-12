import { Module } from '@nestjs/common';
import { LogServiceModule } from 'app/core/providers/log/log.module';
import { LogoutController } from 'app/views/logout/logout.controller';

@Module({
    imports: [LogServiceModule],
    controllers: [LogoutController],
})
export class LogoutModule {}