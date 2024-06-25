import { Module } from '@nestjs/common';
import { LogServiceModule } from 'app/core/providers/log/log.module';
import { SignInController } from 'app/views/sign-in/sign-in.controller';

@Module({
    imports: [LogServiceModule],
    controllers: [SignInController],
    providers: []
})
export class SignInModule {}