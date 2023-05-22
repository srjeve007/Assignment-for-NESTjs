import { Body, Injectable, NotFoundException, Param, Patch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userdata } from './userdata.entity';
import { CreateUserdataDto } from './dto/create-userdata.dto';
import { promises } from 'dns';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserdataDto } from './dto/update-userdata.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class UserdataService {

    constructor(@InjectRepository(Userdata) private userdataRepository:Repository<Userdata> ){}



            async createUserdata(createUserdataDto:CreateUserdataDto, user:User):Promise<Userdata>{

                const {firstname, lastname,username,email,dateofbirth,address}=createUserdataDto;
                const usernameExist= await this.userdataRepository.findOne({where:{username:'username'}});
            
                if(!usernameExist){
                const usersdata= this.userdataRepository.create({firstname, lastname,username,email,address,dateofbirth,user});
                
               await this.userdataRepository.save(usersdata);
               return usersdata;}
            
               else{ throw new NotFoundException(`User with username "${username}" already exists`);}
            }


          
            async getUserdata(searchUserDto:SearchUserDto,user:User):Promise<Userdata[]>{
    
                const {username, search}=searchUserDto;
                const query= this.userdataRepository.createQueryBuilder('userdata');
            
                query.where({user});
            
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


                    
            async getUserdataById(id:number,user:User):Promise<Userdata>{
            const found= await this.userdataRepository.findOne({where:{id, }});
    
            if(!found)
                 {
                     throw new NotFoundException(`User with ID "${id}" not found`);
                 }

            return found;    
                } 

            async deleteUserdataById(id:number,user:User):Promise<void>{
                    const found= await this.userdataRepository.findOne({where:{id, }});
                    console.log(found);
                    if(found)
                    { await this.userdataRepository.delete(id); }
                    else
                    {throw new NotFoundException(`User with ID "${id}" not found`); }
                }   
           
            
                async updateUserdata(id:number, updateUserdataDto:UpdateUserdataDto,  user1:User):Promise<Userdata>{

                    const {firstname, lastname , email, dateofbirth, address, }=updateUserdataDto;
                    

                    const user= await this.getUserdataById(id, user1);
                
                    user.firstname=firstname;
                    user.lastname=lastname;
                    user.email=email;
                    user.dateofbirth=dateofbirth;
                    user.address=address;
                
                    await this.userdataRepository.save(user);
                    return user;
                
                } 


}
