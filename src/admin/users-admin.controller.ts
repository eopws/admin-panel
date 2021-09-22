import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/roles/decorator/roles.decorator';
import { UserService } from 'src/user/user.service';

@Controller('users')
@Roles('admin')
export class UsersAdminController {
    constructor(private userService: UserService) {}

    @Get('/')
    getAllUsers() {
        return this.userService.getAllUsers();
    }
}
