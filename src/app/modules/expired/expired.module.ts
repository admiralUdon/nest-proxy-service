import { Module } from '@nestjs/common';
import { ExpiredController } from 'app/modules/expired/expired.controller';

@Module({
    imports: [],
    controllers: [ExpiredController],
})
export class ExpiredModule {}