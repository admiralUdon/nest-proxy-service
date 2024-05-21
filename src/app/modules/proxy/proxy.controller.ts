import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { LogService } from 'app/core/providers/log/log.service';
import { AppCode } from 'app/core/types/app.type';
import { DefaultHttpException } from 'app/shared/custom/http-exception/default.http-exception';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { ProxyService } from './proxy.service';
import { LocalGuard } from 'app/core/auth/guards/local.guard';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class ProxyController {
    
    constructor(
        private _proxyService: ProxyService,
        private readonly _logService: LogService
    ) {
        this._logService.registerClassName(ProxyController.name)
    }

    @Get()
    @UseGuards(LocalGuard)
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
                // Set original HTTP status
                response.status(result.status);
                // Set original HTTP headers
                response.header(result.headers);
                // Set no cache in header 
                response.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
                response.header('Pragma', 'no-cache');
                response.header('Expires', '0');
                response.header('Surrogate-Control', 'no-store');
                // Send original HTTP data
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