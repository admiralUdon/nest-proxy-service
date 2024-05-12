import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OIDCStrategy, VerifyCallback, IOIDCStrategyOption } from 'passport-azure-ad';
import { AuthService } from 'app/core/auth/auth.service';
import { LogService } from 'app/core/providers/log/log.service';
import { Request as ExpressRequest } from 'express';

@Injectable()
export class AzureStrategy extends PassportStrategy(OIDCStrategy, 'azure') {
    
    constructor(
        private _logService: LogService,
        private _authService: AuthService
    ) {
        console.log("constructor AzureStrategy");
        const config: IOIDCStrategyOption = {
            clientID: process.env.AZURE_CLIENT_ID,
            clientSecret: process.env.AZURE_SECRET_KEY,
            identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0/.well-known/openid-configuration`,
            responseType: 'code',
            responseMode: 'query',
            redirectUrl: process.env.AZURE_CALLBACK_URL, // Replace with your app's redirect URI
            allowHttpForRedirectUrl: true, // Set to false in production
            scope: ['openid','profile'],
            nonceLifetime: 600,
            nonceMaxAmount: 5,
            useCookieInsteadOfSession: true,
            cookieEncryptionKeys: [ { key: '12345678901234567890123456789012', iv: '123456789012' }],
        };
        super(config);
    }

    // authenticate(request: ExpressRequest, options?: IOIDCStrategyOption): void {
    //     console.log("authenticate AzureStrategy");
    //     try {

    //         const strategy = request.headers["authentication-strategy"] || request.body["authentication-strategy"];
    //         console.log("AzureStrategy strategy", strategy);

    //         if (strategy && strategy === "azure") {                
    //             super.authenticate(request, options);
    //             request.headers["authentication-strategy"] = "azure";
    //         }

    //     } catch(error) {
    //         throw new Error(error);
    //     }

    // }
    
    async validate(accessToken: string, refreshToken: string, params: any, profile: any, done: VerifyCallback): Promise<any> {
        console.log("validate AzureStrategy");
        try {

            this._logService.debug("Access Token", accessToken);
            const user = await this._authService.validateAzureADUser(accessToken);
            this._logService.debug("User", user);

            if (!user) {
                return new Error('Unauthorized');
            }
            
            return done(null, user);
        } catch (error) {
            this._logService.error(error);
            return done(error, null, {message: error.message});
        }
    }
}
