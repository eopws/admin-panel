import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'Nagibator300', description: 'Nickname' })
    readonly nickname: string;
}
