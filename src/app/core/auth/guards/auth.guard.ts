import { Injectable, ExecutionContext, CanActivate, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard, IAuthModuleOptions } from '@nestjs/passport';
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { Session } from 'express-session';

@Injectable()
export class AuthGuard extends PassportAuthGuard('basic') implements CanActivate {

    private readonly logger = new Logger(AuthGuard.name);

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log("canActivate AuthGuard");
        try {
            const request = context.switchToHttp().getRequest();
            const result = (await super.canActivate(context)) as boolean;
            await super.logIn(request);
            
            return result;
        } catch (error) {     
            this.logger.error(error);
            throw error;
        }
    }

    // getAuthenticateOptions(context: ExecutionContext): IAuthModuleOptions<any> {
    //     console.log("getAuthenticateOptions AuthGuard");
    //     try {
            
    //         const request: ExpressRequest & { session: Session & { user: any } } = context.switchToHttp().getRequest();
    //         const strategy = request.body["authentication-strategy"] || request.headers["authentication-strategy"] || "basic";
    
    //         console.log({
    //             defaultStrategy: strategy,
    //             session: true
    //         });
            
    //         /**
    //          * TODO: Figure this out
    //          */
    //         this.logger.debug("AuthGuard - Need to figure this out");
    //         return {
    //             defaultStrategy: strategy,
    //             session: true
    //         };

    //     } catch (error) {
    //         this.logger.error(error);
    //         throw new Error(error);
    //     }

    // }

    handleRequest(error: any, user: any, info: any, context: ExecutionContext) {
        console.log("handleRequest AuthGuard");
        try {

            const response: ExpressResponse = context.switchToHttp().getResponse();
            const request: ExpressRequest & { session: Session & { user: any } } = context.switchToHttp().getRequest();
    
            /**
             * request.session.user -> after login baru ada ada value 
             * request.user -> undefined after login, will only have value after serialized
             */
            user = request.session.user ?? request.user;
        
            // Check if response has been sent already
            if (response.headersSent) {
                return null;
            }
        
            // If error or not authenticated, redirect to /login or throw UnauthorizedException
            if (!user) {
    
                this.logger.debug("User session missing, consider it expired / unauthorized", user);
    
                //  If user are requesting for /api and unauthenticated
                if (request && request.url.includes("/api/")) {
                    // throw unauthorized error
                    throw new UnauthorizedException();
                }
    
                //  If user are requesting url except /api (page, html) and still unauthenticated
                if (request && !request.url.includes("/api/")) {
                    // Redirect to login page
                    response.redirect('/login');
                }
            }
    
            if (error) {
                this.logger.error(error);
                throw new Error(error);
            }
            
            return user;

        } catch (error) {
            this.logger.error(error);
            throw new UnauthorizedException({error});
        }
        
    }
}