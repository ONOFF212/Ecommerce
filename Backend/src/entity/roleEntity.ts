
import {
    Entity,
    Column,
    PrimaryGeneratedColumn
    } from 'typeorm';

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'varchar', nullable:false})
    name:string; 
};