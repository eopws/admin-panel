import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity({
    name: 'roles',
})
export class Role {
    @ApiProperty({ example: 1, description: 'Unique role id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.role)
    @JoinColumn()
    user: User;

    @Column({ unique: false, default: 0, nullable: false })
    idGroup: string;
}
