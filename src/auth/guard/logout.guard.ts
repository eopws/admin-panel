import { ExecutionContext, Injectable } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

@Injectable()
export class LogoutGuard extends LocalAuthGuard {
    public async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const result = request.isAuthenticated();
        if (result) {
            await request.logOut();
        }
        return result;
    }
}
