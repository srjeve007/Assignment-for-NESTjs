import { Body, Controller, Post,Get, Query, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { UserdataService } from './userdata.service';
import { CreateUserdataDto } from './dto/create-userdata.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { Userdata } from './userdata.entity';
import { UpdateUserdataDto } from './dto/update-userdata.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('userdata')
@UseGuards(AuthGuard())
export class UserdataController {

    constructor( private userdataService:UserdataService){}


    @Post()
    createUserdata( @Body() createUserdataDto:CreateUserdataDto,
                    @GetUser() user:User)
        {
            return this.userdataService.createUserdata(createUserdataDto,user);
        }


    @Get()
    getUser( @Query() searchUserDto:SearchUserDto,
             @GetUser() user:User): Promise<Userdata[]>{

                     return this.userdataService.getUserdata(searchUserDto,user);
                  }

    @Get('/:id')
    getUserById(@Param('id') id:number,
    @GetUser() user:User   ):Promise<Userdata>{
              return this.userdataService.getUserdataById(id,user);
            }        


    @Delete('/:id')
    deleteUserById(@Param('id') id :number,
    @GetUser() user:User):Promise<void>{
               return this.userdataService.deleteUserdataById(id,user);
            }
                   

    @Patch('/:id/email/address')
     updateUserdata( @Param('id') id:number ,
                     @Body() updateUserdataDto:UpdateUserdataDto, 
                     @GetUser() user:User):Promise<Userdata>{
           
                               return this.userdataService.updateUserdata(id, updateUserdataDto,user);
                           }
           

}

