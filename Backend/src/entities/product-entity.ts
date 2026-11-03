
import {Entity, 
    Column, 
    PrimaryGeneratedColumn,
    ManyToOne,
    UpdateDateColumn,
    CreateDateColumn,
    DeleteDateColumn,
    JoinColumn} from "typeorm";

import "reflect-metadata";
import { Category } from "./category-entity.ts";


@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: "varchar" })
    name:string;

    @Column({ type: "varchar" })
    description:string;

    @Column({ type: "int" })
    price:number;

    @Column({ type: "int" })
    stock:number;

    @Column({ type: "varchar" })
    imgUrl:string;

    @ManyToOne(()=> Category, category => category.product)
    @JoinColumn()
    category:Category;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
   
    @DeleteDateColumn({ nullable: true })
    deletedAt: Date | null;

};



