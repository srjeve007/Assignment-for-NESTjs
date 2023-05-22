import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn ,ManyToOne} from "typeorm";


@Entity()
export class Userdata extends BaseEntity{


    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    firstname:string;

    @Column({nullable:true})
    lastname:string;

    @Column({unique:true})
    username:string;

    @Column({unique:true})
    email:string;

    @Column()
    dateofbirth:string;

    @Column()
    address:string;

    @CreateDateColumn()
    createdOn: Date;

     @UpdateDateColumn()
     updatedOn: Date;
    credential: any;

     @ManyToOne((_type) =>User, (user)=>user.userdatas, {eager:false})
     @Exclude({ toPlainOnly:true})
     user:User;
}