import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'gg@gg.gg', description: 'Email' })
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'password123', description: 'Password' })
    readonly password: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'Nagibator300', description: 'Nickname' })
    readonly nickname: string;
}
