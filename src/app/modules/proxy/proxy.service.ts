import { Injectable } from "@nestjs/common";
import { LogService } from "app/core/providers/log/log.service";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Request } from 'express';

@Injectable()
export class ProxyService {

    /**
     * Constructor
     */

    constructor(
        private readonly _logService: LogService
    ) {
        this._logService.registerClassName(ProxyService.name);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    
    reverseProxy(targetUrl: string, request: Request): Promise<AxiosResponse>
    {
        try {
            const proxyUrl = targetUrl + request.originalUrl;
            const basicToken = btoa(process.env.PROXY_BASICAUTH) ?? null;
            const authorization = basicToken ? { "Authorization": `Basic ${basicToken}` } : {};

            this._logService.debug("proxyUrl", proxyUrl);
            // Need to remove host cause it cause bug
            // because host is not the same with site cert
            const { host, ...requestHeaders } = request.headers;
            const headers: AxiosRequestConfig = {
                headers: {
                    ...requestHeaders,
                    ...authorization
                },
                responseType: 'arraybuffer'
            };
        
            return new Promise<AxiosResponse>((resolve, reject) => {
                axios.get(proxyUrl, headers)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        const { response } = error;
                        if (response) {
                            resolve(response);
                        } else {                            
                            reject(error);
                        }
                    });
            });
        } catch (error) {            
            throw new Error(error);
        }
    }
}

