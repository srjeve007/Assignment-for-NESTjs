import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userdata } from './userdata.entity';
import { CreateUserdataDto } from './dto/create-userdata.dto';
import { promises } from 'dns';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UserdataService {

    constructor(@InjectRepository(Userdata) private userdataRepository:Repository<Userdata> ){}



            async createUserdata(createUserdataDto:CreateUserdataDto):Promise<Userdata>{

                const {firstname, lastname,username,email,dateofbirth,address}=createUserdataDto;
                const usernameExist= await this.userdataRepository.findOne({where:{username:'username'}});
            
                if(!usernameExist){
                const usersdata= this.userdataRepository.create({firstname, lastname,username,email,address,dateofbirth});
                
               await this.userdataRepository.save(usersdata);
               return usersdata;}
            
               else{ throw new NotFoundException(`User with username "${username}" already exists`);}
            }


          
            async getUser(searchUserDto:SearchUserDto):Promise<Userdata[]>{
    
                const {username, search}=searchUserDto;
                const query= this.userdataRepository.createQueryBuilder('userdata');
            
               
            
                if(username)
                    {
                        query.andWhere('userdata.username = :username', {username});
                    }
                if(search)
                    {
                        query.andWhere(
                        '(LOWER(userdata.firstname) LIKE LOWER  (:search) OR LOWER(userdata.lastname) LIKE LOWER(:search))',
                            {search : '%${search}%'},
                                      )
                    }    
            
                    const users= await query.getMany();
                    return users;
            }


}
