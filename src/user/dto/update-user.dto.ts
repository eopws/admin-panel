import { ApiProperty } from '@nestjs/swagger';
import { BanUserDto } from 'src/bans/dto';

export class UpdateUserDto {
    @ApiProperty({ example: 'Nagibator300', description: 'Nickname' })
    readonly nickname: string;

    readonly roles: string[];

    readonly ban?: BanUserDto;
}
