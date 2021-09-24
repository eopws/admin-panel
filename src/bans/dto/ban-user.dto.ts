import { IsNotEmpty } from "class-validator";
import { User } from "src/user/user.entity";

export class BanUserDto {
    @IsNotEmpty()
    user: User;

    lockStatus: string;

    @IsNotEmpty()
    reason: string;

    @IsNotEmpty()
    tmp_to: Date;

    @IsNotEmpty()
    tmp_from: Date;
}