import {
    Controller,
    Request,
    Body,
    Post,
    UseGuards,
    Get,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginGuard } from './guard/login.guard';
import { LogoutGuard } from './guard/logout.guard';
import { UnauthenticatedGuard } from './guard/unauthenticated.guard';
import { AuthenticatedGuard } from './guard/authenticated.guard';
import { AuthDto } from './dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'User logging in' })
    @ApiResponse({ status: 200, type: User })
    @UseGuards(LoginGuard)
    @Post('/login')
    login(@Request() req, @Body() authDto: AuthDto) {
        return req.user;
        // return this.authService.login(req.user);
    }

    @UseGuards(LogoutGuard)
    @ApiOperation({ summary: 'User logging out' })
    @ApiResponse({ status: 200, type: User })
    @Post('/logout')
    logout() {
        return;
    }

    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 200, type: User })
    @UseGuards(UnauthenticatedGuard)
    @Post('/signup')
    async signup(@Body() userDto: CreateUserDto, @Request() req) {
        const user = await this.authService.signup(userDto);
        await new Promise<void>((resolve, reject) =>
            req.logIn(user, (err) => (err ? reject(err) : resolve())),
        );
        return user;
    }

    @UseGuards(AuthenticatedGuard)
    @Get('/test')
    async test(@Request() req) {
        return req.user;
    }
}
