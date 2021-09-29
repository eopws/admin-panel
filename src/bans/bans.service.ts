import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Ban } from './ban.entity';
import { BanUserDto } from './dto';

@Injectable()
export class BansService {
    constructor(
        @InjectRepository(Ban)
        private bansRepository: Repository<Ban>
    ) {}

    async banUser(banDto: BanUserDto) {
        const candidate = await this.bansRepository.findOne({ where: { user: banDto.user } });

        if (candidate) { // user is already banned
            return;
        }

        const newRow = this.bansRepository.create(banDto);

        this.bansRepository.save(newRow);
    }

    async unbanUser(user: User) {
        const ban = await this.bansRepository.findOne({ where: { user } });

        this.bansRepository.remove(ban);
    }
}
