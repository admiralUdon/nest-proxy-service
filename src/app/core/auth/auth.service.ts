// auth.service.ts
import { Injectable } from '@nestjs/common';
import { LogService } from 'app/core/providers/log/log.service';

@Injectable()
export class AuthService {

    constructor(
        private _logService: LogService
    ) {
        this._logService.registerClassName(AuthService.name)
    }

    // Implement your own logic to validate username/password
    async validateUser(username: string, password: string): Promise<any> {
        try {
            this._logService.debug("validateUser", { username, password })
            
            if (username === 'admin' && password === 'password') {
                return { username, password };
            }
            
            throw new Error("Invalid username or password");
        } catch(error) {
            this._logService.debug(error);
            return null;
        }
    }

    // Implement your own logic to validate Azure AD user
    async validateAzureADUser(token: string): Promise<any> {
        try {
            this._logService.debug("Need to debug this");
            // Use the token to validate the user
            // Example: You can decode the token and verify its authenticity
            // If the token is valid, return the user object
            // If not, return null
            return { username: 'azure_user' };
        } catch (error) {
            this._logService.debug(error);
            return null;
        }
    }
}
