
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    JoinColumn,
    UpdateDateColumn,
    CreateDateColumn,
    DeleteDateColumn,
    ManyToOne} 
from 'typeorm';

import { Roles } from './roleEntity.ts';


@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar', nullable:false})
    name:string;

    @Column({type:'varchar', nullable:false, unique:true})
    email:string;

    @Column({type:'varchar', nullable:false, unique:true, length:255, select:false})
    password:string; //ToDo: make this name as "password"

    @ManyToOne(() => Roles)
    @JoinColumn({name:"role_id"})
    roles: Roles;

    // @CreateDateColumn()
    // createdAt: Date;

    // @UpdateDateColumn()
    // updatedAt: Date;
   
    // @DeleteDateColumn({ nullable: true })
    // deletedAt: Date | null;
}