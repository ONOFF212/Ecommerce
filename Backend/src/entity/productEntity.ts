
import {Entity, 
    Column, 
    PrimaryGeneratedColumn,
    ManyToOne,
    UpdateDateColumn,
    CreateDateColumn,
    DeleteDateColumn,
    JoinColumn} from "typeorm";

import "reflect-metadata";
import { Category } from "./categoryEntity.ts";


@Entity()
export class Products{
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
    img_url:string;

    @ManyToOne(()=> Category, category => category.product)
    @JoinColumn()
    category:Category;

    // @CreateDateColumn()
    // createdAt: Date;

    // @UpdateDateColumn()
    // updatedAt: Date;
   
    // @DeleteDateColumn({ nullable: true })
    // deletedAt: Date | null;

};



