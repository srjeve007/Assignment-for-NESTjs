import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationDto } from './dto/authentication.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {

    constructor( @InjectRepository(User)
                    public UserRepository: Repository<User>,
                     private jwtService:JwtService, )
     {}


    async signUp(authenticationDto:AuthenticationDto):Promise<void>{
        const {email, password}=authenticationDto;
        const salt =await bcrypt.genSalt();
        const hashedPassword= await bcrypt.hash(password, salt);

        const user=  this.UserRepository.create({email, password:hashedPassword});

      try{ await this.UserRepository.save(user);  }
      catch(error)
                { 
                    if(error.errno===1062){
                         throw new ConflictException('username already exist');
                     } 
                     else{
                         throw new InternalServerErrorException();
                     }
                }
     }
 

     async signIn(authenticationDto:AuthenticationDto):Promise<{accessToken:string}>{
        const {email, password}=authenticationDto;
        const user= await this.UserRepository.findOne({where:{email}});

        if(user && (await bcrypt.compare(password, user.password))){
            const payload:JwtPayload= {email};
            const accessToken:string =  this.jwtService.sign(payload);

            return {accessToken}
        }
        else{ throw new UnauthorizedException(' Please check your login credentials'); }

     }
 }




