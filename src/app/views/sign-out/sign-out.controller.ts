import { Controller, Get, Request, Response, Render } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { LogService } from 'app/core/providers/log/log.service';
import { DefaultHttpException } from 'app/shared/custom/http-exception/default.http-exception';

@Controller()
@ApiExcludeController()
export class SignOutController {

    /**
     * Constructor
     */

    constructor(
        private _logService: LogService,
    ) {
        this._logService.registerClassName(SignOutController.name);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    
    @Get()
    signOut(@Request() request, @Response() response) {

        try {

            request.logout((error) => {
                if (error) {
                    throw new Error(error);
                }
                request.session.destroy((error) => {
                    if (error) {
                        throw new Error(error);
                    }
                });
                response.clearCookie('connect.sid', { path: '/' });
            });
        
            return response.render('sign-out', {
                app_title       : process.env.APP_TITLE ?? "Nest Proxy App Example",
                app_description : process.env.APP_DESCRIPTION ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                azure_enabled   : process.env.AZURE_ENABLED === "true" ?? false,
                azure_SSO_URL   : process.env.AZURE_SSO_URL
            });
        } catch(error) {
            throw new DefaultHttpException(error);
        }

    }
}