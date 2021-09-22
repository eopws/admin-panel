import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
    @ApiProperty({ example: 'gg@gg.gg', description: 'Email' })
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'password123', description: 'Password' })
    readonly password: string;
}
