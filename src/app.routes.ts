import { Routes } from "@nestjs/core";
import { HelloModule } from "app/modules/hello/hello.module";
import { ProxyModule } from "app/modules/proxy/proxy.module";

export const appRoutes: Routes = [
    {
        path: 'api',
        children: [
            { path: 'hello', module: HelloModule },
        ],
    },
    { path: '*', module: ProxyModule },
]