import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { appRoutes } from 'app.routes';
import { throttlerConfig } from 'app/config/throttler.config';
import { ExpiredModule } from 'app/modules/expired/expired.module';
import { HelloModule } from 'app/modules/hello/hello.module';
import { LoginModule } from 'app/modules/login/login.module';
import { LogoutModule } from 'app/modules/logout/logout.module';
import { ProxyModule } from 'app/modules/proxy/proxy.module';

@Module({
    imports: [
        // Config modules
        ConfigModule.forRoot({expandVariables: true}),
        ThrottlerModule.forRoot(throttlerConfig),
        // Custom modules
        LoginModule,
        LogoutModule,
        ExpiredModule,
        HelloModule,
        ProxyModule, // See demo module for websocket demo
        // Router modules
        RouterModule.register(appRoutes)
    ]
})
export class AppModule {}