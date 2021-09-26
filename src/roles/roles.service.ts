import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) {}

    async takeAwayAllRolesFromAUser(user: User) {
        const rows = await this.rolesRepository.find({ where: { user } });

        await this.rolesRepository.remove(rows);
    }

    async takeAwayARoleFromAUser(role: string, user: User) {
        const roleRow = await this.rolesRepository.find({ where: { user, idGroup: role } });

        this.rolesRepository.remove(roleRow);
    }

    async assignUserARole(role: string, user: User) {
        const candidate = await this.rolesRepository.findOne({ where: { user, idGroup: role } });

        if (candidate) {
            return;
        }

        const newRow = this.rolesRepository.create({idGroup: role, user});

        this.rolesRepository.save(newRow);
    }
}
