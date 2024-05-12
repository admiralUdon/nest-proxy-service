import { Controller, Get, Request, Response, Render, Post, UseGuards, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AzureADGuard } from 'app/core/auth/guards/azure-ad.guard';
import { LocalGuard } from 'app/core/auth/guards/local.guard';
import { LogService } from 'app/core/providers/log/log.service';
import { Request as ExpressRequest } from 'express';
import { Session } from 'express-session';

@Controller()
@ApiTags("Login")
export class LoginController {

    /**
     * Constructor
     */

    constructor(
        private _logService: LogService,
    ) {
        this._logService.registerClassName(LoginController.name);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    @Get()
    azureOAuth2Login(
        @Request() request: ExpressRequest, 
        @Response() response,
        @Query('status') status
    ) {
        if (request.user) {
            return response.redirect('/');
        }        
    
        return response.render('login', {
            app_title       : process.env.APP_TITLE ?? "Nest Proxy App Example",
            app_description : process.env.APP_DESCRIPTION ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            azure_enabled   : process.env.AZURE_ENABLED === "true" ?? false,
            azure_SSO_URL   : process.env.AZURE_SSO_URL,
            status
        });
    }

    @Post()
    @UseGuards(LocalGuard)
    async loginBasic(@Request() request: ExpressRequest & { session: Session & { user: any } }, @Response() response) {
        // Save user to session after successful login
        request.session.user = request.user;
        return response.redirect('/');
    }

    @Post('azure')
    @UseGuards(AzureADGuard)
    loginAzure(){}

    @Get('azure/callback')
    @UseGuards(AzureADGuard)
    async loginAzureCallback(@Request() request: ExpressRequest & { session: Session & { user: any } }, @Response() response) {
        // Save user to session after successful login
        request.session.user = request.user;
        return response.redirect('/');
    }
}