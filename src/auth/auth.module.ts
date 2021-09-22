import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalSerializer } from './local.serializer';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, LocalSerializer],
    imports: [
        PassportModule.register({ session: true }),
        forwardRef(() => UserModule),
    ],
    exports: [AuthService],
})
export class AuthModule {}
