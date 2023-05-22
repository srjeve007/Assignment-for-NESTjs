import { IsDate, IsNotEmpty, IsString } from "class-validator";


export class CreateUserdataDto{
    @IsNotEmpty()
    @IsString()
    firstname:string;

    @IsNotEmpty()
    @IsString()
    lastname:string;

    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @IsString()
    email:string;

    
    @IsNotEmpty()
    @IsString()  
    dateofbirth:string;
    
    @IsNotEmpty()
    @IsString()
    address:string;

}






