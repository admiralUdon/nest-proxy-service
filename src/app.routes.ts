import { Routes } from "@nestjs/core";
import { ExpiredModule } from "app/modules/expired/expired.module";
import { HelloModule } from "app/modules/hello/hello.module";
import { LoginModule } from "app/modules/login/login.module";
import { LogoutModule } from "app/modules/logout/logout.module";
import { ProxyModule } from "app/modules/proxy/proxy.module";

export const appRoutes: Routes = [
    { path: 'login', module: LoginModule },
    { path: 'logout', module: LogoutModule },
    { path: 'expired', module: ExpiredModule },
    {
        path: 'api',
        children: [
            { path: 'hello', module: HelloModule },
        ],
    },
    { path: '*', module: ProxyModule },
]