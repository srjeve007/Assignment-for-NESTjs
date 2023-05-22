import { Userdata } from "src/userdata/userdata.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn('uuid')
     id:string;

     @Column({unique:true})
     email:string;

     @Column()
     password:string;

     @OneToMany((_type) =>Userdata, (userdata)=>userdata.user, {eager:true}  )
     
     userdatas  :Userdata[];



}