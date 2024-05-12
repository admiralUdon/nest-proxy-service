import { Controller, Get, Request, Render } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { LogService } from 'app/core/providers/log/log.service';

@Controller()
@ApiExcludeController()
export class LogoutController {

    /**
     * Constructor
     */

    constructor(
        private _logService: LogService,
    ) {
        this._logService.registerClassName(LogoutController.name);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    
    @Get()
    @Render('logout')
    azureOAuth2Login(@Request() request) {
        return {
            app_title       : process.env.APP_TITLE ?? "Nest Proxy App Example",
            app_description : process.env.APP_DESCRIPTION ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            azure_enabled   : process.env.AZURE_ENABLED === "true" ?? false,
            azure_SSO_URL   : process.env.AZURE_SSO_URL
        }
    }
}