
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    JoinColumn,
    ManyToOne} 
from 'typeorm';

import { Roles } from './role_model.ts';


@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar', nullable:false})
    name:string;

    @Column({type:'varchar', nullable:false, unique:true})
    email:string;

    @Column({type:'varchar', nullable:false, unique:true, length:255, select:false})
    hashed_password:string;

    @ManyToOne(() => Roles, roles => roles.user)
    @JoinColumn({name:"rolesId"})
    roles: Roles;
}