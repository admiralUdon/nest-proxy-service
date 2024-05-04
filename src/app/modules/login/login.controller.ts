import { Controller, Get, Request, Logger, Render } from '@nestjs/common';

@Controller()
export class LoginController {

    private readonly logger = new Logger(LoginController.name);
    
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
}