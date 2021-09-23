import {
    Injectable,
    UnauthorizedException,
    HttpException,
    HttpStatus,
    BadRequestException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    public async validateUser(
        email: string,
        pass: string,
    ): Promise<User | null> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            return null;
        }

        const isMatch = pass === user.password //await bcrypt.compare(pass, user.password);
        if (isMatch) {
            delete user.password;
            return user;
        }

        return null;
    }
    public async signup(userDto: CreateUserDto) {
        const candidate = await this.userService.findByEmail(userDto.email);
        if (candidate) {
            throw new BadRequestException(
                'User with this email already exists',
            );
        }

        const hashPassword = await bcrypt.hash(userDto.password, 10);
        const user = await this.userService.createUser({
            ...userDto,
            password: hashPassword,
        });

        delete user.password;
        return user;
    }
}
