// import { OrGuard } from '@nest-lab/or-guard';
// import { Injectable, ExecutionContext, CanActivate, UnauthorizedException, Logger } from '@nestjs/common';
// import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';
// import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
// import { Session } from 'express-session';

// @Injectable()
// export class NoAuthGuard extends OrGuard(['basic', 'azure']) implements CanActivate {

//     private readonly logger = new Logger(NoAuthGuard.name);

//     canActivate(context: ExecutionContext) {
//         console.log("canActivate NoAuthGuard");
//         try {
//             this.logger.debug("NoAuthGuard context is used");
//             return super.canActivate(context);
//         } catch (error) {
//             this.logger.error(error);
//             throw error;
//         }
//     }
    
//     getAuthenticateOptions(context: ExecutionContext): IAuthModuleOptions<any> {
//         console.log("getAuthenticateOptions NoAuthGuard");
//         try {
            
//             const request: ExpressRequest & { session: Session & { user: any } } = context.switchToHttp().getRequest();
//             const strategy = request.body["authentication-strategy"] || request.headers["authentication-strategy"] || "basic";
    
//             console.log("NoAuthGuard getAuthenticateOptions strategy", strategy);
            
//             /**
//              * TODO: Figure this out
//              */
//             this.logger.debug("NoAuthGuard - Need to figure this out");
//             return {
//                 defaultStrategy: strategy,
//                 session: true
//             };

//         } catch (error) {
//             this.logger.error(error);
//             throw new Error(error);
//         }
        
//     }

//     handleRequest(error: any, user: any, info: any, context: ExecutionContext) {
//         console.log("handleRequest NoAuthGuard");
//         try {
        
//             const response: ExpressResponse = context.switchToHttp().getResponse();
//             const request: ExpressRequest & { session: Session & { user: any } } = context.switchToHttp().getRequest();
        
//             // Check if response has been sent already
//             if (response.headersSent) {
//                 return null;
//             }
        
//             // If error or not authenticated, redirect to /login or throw UnauthorizedException
//             if (!user) {

//                 this.logger.debug("User session missing, consider it expired / unauthorized", user);
    
//                 //  If user are requesting for /api and unauthenticated
//                 if (request && request.url.includes("/api/")) {
//                     // throw unauthorized error
//                     throw new UnauthorizedException();
//                 }
    
//                 //  If user are requesting url except /api (page, html) and still unauthenticated
//                 if (request && !request.url.includes("/api/")) {
//                     return null;
//                 }
                
//             }

//             if (error) {
//                 this.logger.error(error);
//                 throw new Error(error);
//             }            

//             // // Save user to session after successful login
//             request.session.user = user;
        
//             return user;

//         } catch (error) {
//             this.logger.error(error);
//             throw new UnauthorizedException(error);
//         }
//     }
// }