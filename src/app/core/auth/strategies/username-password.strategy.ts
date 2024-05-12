// username-password.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IVerifyOptions, Strategy } from 'passport-local';
import { AuthService } from 'app/core/auth/auth.service';
import { LogService } from 'app/core/providers/log/log.service';
import { Request as ExpressRequest } from 'express';

@Injectable()
export class UsernamePasswordStrategy extends PassportStrategy(Strategy, 'basic') {

    constructor(
        private _logService: LogService,
        private _authService: AuthService,
    ) {
        console.log("constructor UsernamePasswordStrategy");
        super();
        this._logService.registerClassName(UsernamePasswordStrategy.name);
        
    }

    // authenticate(request: ExpressRequest, options?: IVerifyOptions): void {
    //     console.log("authenticate UsernamePasswordStrategy");
    //     try {
    //         const strategy = request.headers["authentication-strategy"] || request.body["authentication-strategy"] || "basic";
    //         console.log("UsernamePasswordStrategy strategy", strategy);
            
    //         if (strategy && strategy === "basic") {   
    //             console.log("masukkk00000");    
    //             super.authenticate(request, options);
    //         }

    //         request.headers["authentication-strategy"] = "basic";

    //     } catch(error) {
    //         throw new Error(error);
    //     }
        
    // }

    async validate(username: string, password: string, done: (error: any, user?: Express.User | false, options?: IVerifyOptions) => void ): Promise<any> {
        console.log("validate UsernamePasswordStrategy");
        try {

            this._logService.debug("Username & Password", { username, password });
            const user = await this._authService.validateUser(username, password);
            this._logService.debug("User", user);

            if (!user) {
                throw new Error("Invalid username or password");
            }

            return done(null, user);
        } catch (error) {
            this._logService.error(error);
            return done(error, null, {message: error.message});
        }
    }
}