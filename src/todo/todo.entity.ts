import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../auth/user.entity';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, { eager: false })
    user: User;

    @Column({ length: 250 })
    text: string;

    @Column({ default: false })
    completed: boolean;

    @Column({ nullable: true })
    completeTime: Date;

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;
}
