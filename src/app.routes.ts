import { Routes } from "@nestjs/core";
import { HelloModule } from "app/modules/hello/hello.module";
import { ProxyModule } from "app/modules/proxy/proxy.module";
import { UserModule } from "app/modules/user/user.module";
import { ExpiredModule } from "app/views/expired/expired.module";
import { LoginModule } from "app/views/login/login.module";
import { LogoutModule } from "app/views/logout/logout.module";

export const appRoutes: Routes = [
    { path: 'login', module: LoginModule },
    { path: 'logout', module: LogoutModule },
    { path: 'expired', module: ExpiredModule },
    {
        path: 'api',
        children: [
            { path: 'hello', module: HelloModule },
            { path: 'user', module: UserModule },
        ],
    },
    { path: '*', module: ProxyModule },
]