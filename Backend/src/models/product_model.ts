
import {Entity, 
    Column, 
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn} from "typeorm";

import "reflect-metadata";
import { Category } from "./category_model.ts";


@Entity()
export class Products{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: "varchar" })
    name:string;

    @Column({ type: "varchar" })
    description:string;

    @Column({ type: "varchar" })
    price:string;

    @Column({ type: "varchar" })
    stock:string;

    @Column({ type: "varchar" })
    img_url:string;

    @ManyToOne(()=> Category, category => category.product)
    @JoinColumn({ name: "categoryId" })
    category:Category;

};



