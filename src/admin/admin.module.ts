import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UsersAdminController } from './users-admin.controller';

@Module({
    controllers: [UsersAdminController],
    exports: [],
    imports: [UserModule],
})
export class AdminModule {}
