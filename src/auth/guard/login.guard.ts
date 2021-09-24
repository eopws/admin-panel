import { ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from './local-auth.guard';

@Injectable()
export class LoginGuard extends LocalAuthGuard {
    constructor(
        private readonly usersService: UserService
    ) {
        super();
    }

    public async canActivate(context: ExecutionContext) {
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();

        const user = await this.usersService.findByEmail(request.body.email);

        if (!user.ban) {
            await super.logIn(request);
    
            return result;
        }

        return false;
    }
}
