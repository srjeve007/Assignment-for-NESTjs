import { IsDate, IsNotEmpty, IsString } from "class-validator";


export class UpdateUserdataDto{
   
    @IsString()
    firstname:string;

   
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