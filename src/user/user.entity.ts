import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/role.entity';
import { ManyToOne, Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @ApiProperty({ example: 1, description: 'Unique user id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Nagibator3000', description: 'Nickname' })
    @Column({ unique: true })
    nickname: string;

    @ApiProperty({ example: '237.6', description: 'User balance' })
    @Column({ unique: false, default: 0, nullable: false })
    balance: number;

    @ApiProperty({ example: '12.3', description: 'Money hold for active bets' })
    @Column({ unique: false, default: 0, nullable: false })
    hold: number;

    @ApiProperty({ example: 'gg@gg.gg', description: 'Email' })
    @Column({ unique: true })
    email: string;

    @ApiProperty({ example: 'password123', description: 'Password' })
    @Column()
    password: string;

    @ApiProperty({ example: 'true', description: 'If user is banned' })
    @Column({ default: false })
    banned: boolean;

    @ManyToMany(() => Role, (role) => role.user)
    role: Role;
}
