import {
    Entity,
    Column, 
    PrimaryGeneratedColumn,
    OneToMany,
    JoinTable} from "typeorm";

import { Products } from "./product_model.ts";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: "varchar" })
    name:string;

    @OneToMany(() => Products, product => product.category)
    product : Products[];
};



