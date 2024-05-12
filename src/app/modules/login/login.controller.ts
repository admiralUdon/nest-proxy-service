import { Controller, Get, Request, Response, Logger, Render, Post, UseGuards, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LogService } from 'app/core/providers/log/log.service';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { Session } from 'express-session';

@Controller()
export class LoginController {

    constructor(
        private _logService: LogService,
    ) {
        this._logService.registerClassName(LoginController.name);
    }
    
    @Get()
    @Render('login')
    azureOAuth2Login(@Request() request) {
        return {
            app_title       : process.env.APP_TITLE ?? "Nest Proxy App Example",
            app_description : process.env.APP_DESCRIPTION ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            azure_enabled   : process.env.AZURE_ENABLED === "true" ?? false,
            azure_SSO_URL   : process.env.AZURE_SSO_URL
        }
    }

    @Post()
    @UseGuards(AuthGuard('basic'))
    async loginBasic(@Request() request: ExpressRequest & { session: Session & { user: any } }, @Response() response) {
        const { username } = request.body;
        // Save user to session after successful login
        request.session.user = { username };
        return response.redirect('/');
    }

    @Post('azure')
    @UseGuards(AuthGuard('azure'))
    async loginAzure(@Request() request: ExpressRequest & { session: Session & { user: any } }, @Response() response) {
        const { username } = request.body;
        // Save user to session after successful login
        request.session.user = { username };
        return response.redirect('/');
    }
}