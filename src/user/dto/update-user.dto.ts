import { ApiProperty } from '@nestjs/swagger';
import { BanUserDto } from 'src/bans/dto';

export class UpdateUserDto {
    readonly nickname?: string;
    readonly email?: string;
    readonly roles?: string[];
    readonly ban?: BanUserDto | 'unban';
}
