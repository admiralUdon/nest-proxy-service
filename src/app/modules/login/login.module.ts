import { Module } from '@nestjs/common';
import { LoginController } from 'app/modules/login/login.controller';

@Module({
    imports: [],
    controllers: [LoginController],
})
export class LoginModule {}