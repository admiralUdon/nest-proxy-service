import { Injectable, Logger } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {

    private readonly logger = new Logger(JwtService.name);

    constructor(
        private readonly _nestJwtService: NestJwtService
    ) {
    }

    generateJwtToken(payload: any, secret: string): string {
        return this._nestJwtService.sign(payload, { secret });
    }

    verifyJwtToken<T>(token: string, secret: string): Promise<T> {
        try {
            return this._nestJwtService.verify(token, { secret });
        } catch (error) {
            this.logger.error(error);
            // Token is invalid or expired
            return null;
        }
    }
}
