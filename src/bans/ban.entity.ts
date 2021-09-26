import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'bans' })
export class Ban {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user) => user.ban, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: User;

    @Column({ unique: false, default: '1' })
    lockStatus: string;

    @Column({ unique: false })
    reason: string;

    @Column({ unique: false })
    tmp_to: Date;

    @Column({ unique: false })
    tmp_from: Date;
}
