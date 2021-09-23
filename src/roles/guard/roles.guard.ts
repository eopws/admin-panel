import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/user/user.entity';
import { ROLES_KEY } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    public canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (!requiredRoles) {
            // Если возвращается NULL, то эндпоинт доступен всем, даже незарегистрированным пользователяи
            return true;
        }
        const req = context.switchToHttp().getRequest();
        const user: User = req.user;
        if (!user?.role) {
            return false;
        }
        return !!user.role.find((value) => requiredRoles.includes(value.idGroup));
    }
}
