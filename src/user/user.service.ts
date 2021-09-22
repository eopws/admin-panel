import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { EmailIsTakenException } from './exceptions/email-is-taken.exception';
import { NameIsTakenException } from './exceptions/name-is-taken.exception';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private roleService: RolesService,
    ) {}

    public async createUser({
        nickname,
        email,
        password,
    }: {
        nickname: string;
        email: string;
        password: string;
    }) {
        let existedUser = await this.usersRepository.findOne({
            email,
        });
        if (existedUser) {
            throw new EmailIsTakenException();
        }

        existedUser = await this.usersRepository.findOne({
            nickname,
        });
        if (existedUser) {
            throw new NameIsTakenException();
        }

        const user = new User();
        user.nickname = nickname;
        user.email = email;
        user.password = password;
        return this.usersRepository.save(user);
    }

    public getAllUsers() {
        return this.usersRepository.find();
    }

    public getUserById(id: number): Promise<User> {
        return this.usersRepository.findOne(id, { relations: ['role'] });
    }

    public findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ email: email });
    }

    public async updateUser(id: string, { nickname }: UpdateUserDto) {
        const user = await this.usersRepository.findOne(id);
        if (!user) {
            throw new NotFoundException('ewrwerwer');
        }

        const existedUser = await this.usersRepository.findOne({
            nickname,
        });
        if (existedUser) {
            throw new NameIsTakenException();
        }

        user.nickname = nickname;
        delete user.password;

        return this.usersRepository.save(user);
    }
}
