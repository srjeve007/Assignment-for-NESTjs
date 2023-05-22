import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Userdata } from "./userdata/userdata.entity";


export const typeOrmConfig : TypeOrmModuleOptions= {
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'Shubh@7507',
    database:'assignment',
    synchronize:true,
    entities: [Userdata]

}