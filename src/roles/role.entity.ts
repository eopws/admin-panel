import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity({
    name: 'roles',
})
export class Role {
    @ApiProperty({ example: 1, description: 'Unique role id' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'moderator', description: 'Unique role name' })
    @Column()
    value: string;

    @ApiProperty({
        example: 'Moderation privileges',
        description: 'Role description',
    })
    @Column()
    description: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}
