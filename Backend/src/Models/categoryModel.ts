


import {
    Entity,
    Column, 
    PrimaryGeneratedColumn,
    OneToMany,
    JoinTable} from "typeorm";

import "reflect-metadata";
import { Products } from "./produtcModel.js";


@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: "varchar" })
    Name:string;

    @OneToMany(() => Products, product => product.category)
    product : Products[];

};



