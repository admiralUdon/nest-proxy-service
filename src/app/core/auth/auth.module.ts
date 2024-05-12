import { Module } from '@nestjs/common';
import { AuthService } from 'app/core/auth/auth.service';
import { AzureStrategy } from './strategies/azure-ad.strategy';
import { UsernamePasswordStrategy } from './strategies/username-password.strategy';
import { LogServiceModule } from '../providers/log/log.module';
import { AuthGuard } from './guards/auth.guard';
// import { NoAuthGuard } from './guards/noAuth.guard';

@Module({
    imports: [
        LogServiceModule,
    ],
    providers: [
        AuthService,
        AzureStrategy,
        UsernamePasswordStrategy,
        // AuthGuard,
        // NoAuthGuard
    ],
    exports: [
        AuthService,
        // AzureStrategy,
        // UsernamePasswordStrategy,
        // AuthGuard,
        // NoAuthGuard
    ],
})
export class AuthServiceModule {}
