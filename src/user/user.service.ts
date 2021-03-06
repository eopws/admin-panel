import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';
import { User } from './user.entity';
import { EmailIsTakenException } from './exceptions/email-is-taken.exception';
import { NameIsTakenException } from './exceptions/name-is-taken.exception';
import { UpdateUserDto } from './dto/update-user.dto';
import { BansService } from 'src/bans/bans.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private bansService: BansService,
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
        return this.usersRepository.find({ relations: ['role', 'ban'] });
    }

    public getUserById(id: number): Promise<User> {
        return this.usersRepository.findOne(id, { relations: ['role', 'ban'] });
    }

    public findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ email: email }, { relations: ['role', 'ban'] });
    }

    public async updateUser(id: string, { nickname, email, roles, ban }: UpdateUserDto) {
        const user = await this.usersRepository.findOne(id);
        if (!user) {
            throw new NotFoundException('ewrwerwer');
        }

        delete user.password;

        if (nickname) {
            user.nickname = nickname;
        }

        if (email) {
            user.email = email;
        }

        if (roles) {
            await this.roleService.takeAwayAllRolesFromAUser(user);

            roles.forEach(async (role) => {
                await this.roleService.assignUserARole(role, user);
            });
        }

        if (ban) {
            if (ban !== 'unban') {
                this.bansService.banUser(ban);
            } else {
                this.bansService.unbanUser(user);
            }
        }

        return this.usersRepository.save(user);
    }

    async assignUserARole(user: string | User, role: string) {
        if (typeof user === 'string') {
            user = await this.usersRepository.findOne(user);
        }

        this.roleService.assignUserARole(role, user);
    }
}
