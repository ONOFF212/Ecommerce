
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

import { Role } from './role-entity.ts';


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar', nullable:false})
    name:string;

    @Column({type:'varchar', nullable:false, unique:true})
    email:string;

    @Column({type:'varchar', nullable:false, unique:true, length:255, select:false})
    password:string;

    @ManyToOne(() => Role)
    @JoinColumn({name:"role_id"})
    roles: Role;

    // @CreateDateColumn()
    // createdAt: Date;

    // @UpdateDateColumn()
    // updatedAt: Date;
   
    // @DeleteDateColumn({ nullable: true })
    // deletedAt: Date | null;
}