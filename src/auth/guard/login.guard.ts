import { ExecutionContext, Injectable } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

@Injectable()
export class LoginGuard extends LocalAuthGuard {
    public async canActivate(context: ExecutionContext) {
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result;
    }
}
