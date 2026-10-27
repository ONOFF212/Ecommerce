import {
    Entity,
    Column, 
    PrimaryGeneratedColumn,
    OneToMany,
    UpdateDateColumn,
    CreateDateColumn,
    JoinTable} from "typeorm";

import { Products } from "./productEntity.ts";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: "varchar" })
    name:string;

    @OneToMany(() => Products, product => product.category)
    product : Products[];

    // @CreateDateColumn()
    // createdAt: Date;
    
    // @UpdateDateColumn()
    // updatedAt: Date;
};



