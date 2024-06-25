import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { appRoutes } from 'app.routes';
import { throttlerConfig } from 'app/config/throttler.config';
import { AuthServiceModule } from 'app/core/auth/auth.module';
import { SessionServiceModule } from 'app/core/providers/session/session.module';
import { ExpiredModule } from 'app/views/expired/expired.module';
import { HelloModule } from 'app/modules/hello/hello.module';
import { SignInModule } from 'app/views/sign-in/sign-in.module';
import { SignOutModule } from 'app/views/sign-out/sign-out.module';
import { ProxyModule } from 'app/modules/proxy/proxy.module';
import { UserModule } from 'app/modules/user/user.module';

@Module({
    imports: [
        // Config modules
        ConfigModule.forRoot({expandVariables: true}),
        ThrottlerModule.forRoot(throttlerConfig),
        AuthServiceModule,
        SessionServiceModule,
        // Custom modules
        HelloModule,
        SignInModule,
        SignOutModule,
        ExpiredModule,
        UserModule,
        ProxyModule, // See demo module for websocket demo
        // Router modules
        RouterModule.register(appRoutes)
    ]
})
export class AppModule {}