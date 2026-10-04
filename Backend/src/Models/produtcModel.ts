
import {Entity, 
    Column, 
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn} from "typeorm";

import "reflect-metadata";
import { Category } from "./categoryModel.js";


@Entity()
export class Products{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: "varchar" })
    Name:string;

    @Column({ type: "varchar" })
    Description:string;

    @Column({ type: "varchar" })
    Price:string;

    @Column({ type: "varchar" })
    Stock:string;

    @Column({ type: "varchar" })
    imgUrl:string;

    @ManyToOne(()=> Category, category => category.product)
    @JoinColumn({ name: "categoryId" })
    category:Category;

};



