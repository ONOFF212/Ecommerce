import {
    Entity,
    Column, 
    PrimaryGeneratedColumn,
    OneToMany,
    UpdateDateColumn,
    CreateDateColumn,
    DeleteDateColumn,
    JoinTable} from "typeorm";

import { Product } from "./product-entity.ts";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: "varchar" })
    name:string;

    @OneToMany(() => Product, product => product.category)
    product : Product[];

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date | null;
};



