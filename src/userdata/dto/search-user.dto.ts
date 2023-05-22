import {  IsOptional, IsString } from "class-validator";

export class SearchUserDto{

    @IsOptional()
    @IsString()
    username?:string;

    @IsOptional()
    @IsString()
    search?:string;
}