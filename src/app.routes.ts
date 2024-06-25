import { Routes } from "@nestjs/core";
import { HelloModule } from "app/modules/hello/hello.module";
import { ProxyModule } from "app/modules/proxy/proxy.module";
import { UserModule } from "app/modules/user/user.module";
import { ExpiredModule } from "app/views/expired/expired.module";
import { SignInModule } from "app/views/sign-in/sign-in.module";
import { SignOutModule } from "app/views/sign-out/sign-out.module";

export const appRoutes: Routes = [
    { path: 'sign-in', module: SignInModule },
    { path: 'sign-out', module: SignOutModule },
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