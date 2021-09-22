import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    public async canActivate(context: ExecutionContext) {
        const type = context.getType();
        if (type === 'ws') {
            const ws = context.switchToWs();
            const { client } = ws.getClient();
            return client.request.isAuthenticated();
        }

        const request = context.switchToHttp().getRequest();
        return request.isAuthenticated();
    }
}
