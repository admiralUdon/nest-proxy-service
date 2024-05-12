import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { LogService } from 'app/core/providers/log/log.service';
import { AppCode } from 'app/core/types/app.type';
import { DefaultHttpException } from 'app/shared/custom/http-exception/default.http-exception';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { ProxyService } from './proxy.service';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';

@Controller()
export class ProxyController {
    
    constructor(
        private _proxyService: ProxyService,
        private readonly _logService: LogService
    ) {
        this._logService.registerClassName(ProxyController.name)
    }

    @Get()
    @UseGuards(AuthGuard)
    async reverseProxy(
        @Request() request: ExpressRequest, 
        @Response() response: ExpressResponse
    ){

        try {

            if (response.headersSent) {
                return null;
            }

            // Replace this with the URL of your target server
            const targetUrl = process.env.PROXY_URL ?? 'http://example.com'; 
            const result = await this._proxyService.reverseProxy(targetUrl, request);
            if (result) {                
                response.status(result.status);
                response.header(result.headers);
                response.send(result.data);
                return response;
            } else {                
                const message = "Proxy service is currently down";
                const failedCode = AppCode.GENERAL_ERROR;
                throw new DefaultHttpException({
                    message: failedCode.description,
                    code: failedCode.code,
                    statusCode: failedCode.status,
                    error : {
                        message
                    }
                });
            }
            
        } catch (error) {            
            throw new DefaultHttpException(error);
        }

    }
}