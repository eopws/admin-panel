import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthorizedUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const type = ctx.getType();
        if (type === 'ws') {
            const ws = ctx.switchToWs();
            const { client } = ws.getClient();
            return client.request.user;
        }

        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);
