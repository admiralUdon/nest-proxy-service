import { Module } from '@nestjs/common';
import { LogServiceModule } from 'app/core/providers/log/log.module';
import { SignOutController } from 'app/views/sign-out/sign-out.controller';

@Module({
    imports: [LogServiceModule],
    controllers: [SignOutController],
})
export class SignOutModule {}