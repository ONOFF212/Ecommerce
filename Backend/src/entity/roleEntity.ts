
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn
    } from 'typeorm';

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar', nullable:false})
    name:string; 

    // @CreateDateColumn()
    // createdAt: Date;

    // @UpdateDateColumn()
    // updatedAt: Date;
};