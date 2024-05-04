import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { appRoutes } from 'app.routes';
import { throttlerConfig } from 'app/config/throttler.config';
import { HelloModule } from 'app/modules/hello/hello.module';
import { ProxyModule } from 'app/modules/proxy/proxy.module';

@Module({
    imports: [
        // Config modules
        ConfigModule.forRoot({expandVariables: true}),
        ThrottlerModule.forRoot(throttlerConfig),
        // Custom modules
        HelloModule,
        ProxyModule, // See demo module for websocket demo
        // Router modules
        RouterModule.register(appRoutes)
    ]
})
export class AppModule {}