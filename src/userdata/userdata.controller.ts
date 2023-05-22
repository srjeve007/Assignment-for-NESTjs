import { Body, Controller, Post,Get, Query } from '@nestjs/common';
import { UserdataService } from './userdata.service';
import { CreateUserdataDto } from './dto/create-userdata.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { Userdata } from './userdata.entity';

@Controller('userdata')
export class UserdataController {

    constructor( private userdataService:UserdataService){}


    @Post()
    createUserdata( @Body() createUserdataDto:CreateUserdataDto)
        {
            return this.userdataService.createUserdata(createUserdataDto);
        }


    @Get()
    getUser( @Query() searchUserDto:SearchUserDto): Promise<Userdata[]>{


   return this.userdataService.getUser(searchUserDto);
}












}


