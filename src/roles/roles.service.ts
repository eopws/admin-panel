import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) {}

    public async createRole(dto: CreateRoleDto) {
        return await this.rolesRepository.save(dto);
    }

    public async getRoleByValue(value: string) {
        const role = await this.rolesRepository.findOne({ value });
        return role;
    }
}
