
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
    } from 'typeorm';

import { Users } from './user_model.ts';

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar', nullable:false})
    name:string;

    @OneToMany(() => Users, user => user.roles)
    user:Users[];  
};