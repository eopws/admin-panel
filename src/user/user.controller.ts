import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Put,
    UseGuards,
    SetMetadata,
    Request,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/guard/authenticated.guard';
import { Roles } from 'src/roles/decorator/roles.decorator';
import { RolesGuard } from 'src/roles/guard/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//import { Roles } from 'src/auth/roles-auth.decorator';
//import { RolesGuard } from 'src/auth/roles.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 200, type: User })
    @Post('/add')
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @ApiOperation({ summary: 'Get user profile' })
    @ApiResponse({ status: 200, type: [User] })
    @Get('/:id')
    getProfile(@Param() params) {
        return this.userService.getUserById(params.id);
    }

    @ApiOperation({ summary: 'Update user profile' })
    @ApiResponse({ status: 200, type: [User] })
    @Put('/:id')
    updateProfile(@Param() params, @Body() userDto: UpdateUserDto) {
        return this.userService.updateUser(params.id, userDto);
    }

    @Get('/')
    getAllProfiles() {
        return this.userService.getAllUsers();
    }
}
