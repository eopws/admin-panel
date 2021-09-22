import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {
        super();
    }

    public serializeUser(user: User, done: CallableFunction) {
        done(null, user.id);
    }

    public async deserializeUser(userId: number, done: CallableFunction) {
        const user = await this.userService.getUserById(userId);

        if (!user) {
            done(new Error('User is not found'));
        }

        delete user.password;

        done(null, user);
    }
}
