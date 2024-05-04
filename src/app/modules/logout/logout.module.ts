import { Module } from '@nestjs/common';
import { LogoutController } from 'app/modules/logout/logout.controller';

@Module({
    imports: [],
    controllers: [LogoutController],
})
export class LogoutModule {}