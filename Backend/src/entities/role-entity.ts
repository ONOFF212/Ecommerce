
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    DeleteDateColumn,
    } from 'typeorm';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar'})
    name:string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date | null;
};