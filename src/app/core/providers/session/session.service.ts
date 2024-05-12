import { Injectable, Logger } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionService extends PassportSerializer {

    private readonly logger = new Logger(SessionService.name);

    constructor(
    ) {
        super();
    }


    serializeUser(user: any, done: (err: Error, user: any) => void): any {
        try {
            this.logger.debug("serializeUser", user);
            if (!user) {
                throw new Error ("Missing user, user not being serialized");
            }
            return done(null, user);
        } catch (error) {
            this.logger.debug(error);
            return done(null, {});
        }
    }

    async deserializeUser(user: any, done: (err: Error, user: any) => void): Promise<any> {
        try {
            this.logger.debug("deserializeUser", user);
            const { username } = user;
            if (username !== "admin") {
                throw new Error ("Unknown user, user not being deserialized");
            }
            return done(null, user);
        } catch (error) {
            this.logger.debug(error);
            return done(null, {});
        }
    }
}