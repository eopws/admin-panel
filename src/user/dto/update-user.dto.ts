import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ example: 'Nagibator300', description: 'Nickname' })
    readonly nickname: string;

    readonly roles: string[];
}
