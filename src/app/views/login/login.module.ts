import { Module } from '@nestjs/common';
import { LogServiceModule } from 'app/core/providers/log/log.module';
import { LoginController } from 'app/views/login/login.controller';

@Module({
    imports: [LogServiceModule],
    controllers: [LoginController],
    providers: []
})
export class LoginModule {}