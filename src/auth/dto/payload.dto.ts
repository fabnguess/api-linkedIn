import {  IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { RoleUtilisateur } from "src/utils/role-enum"

export class PayloadDto  {
    @IsNotEmpty()
    @IsNumber()
    id:number
    
    @IsNotEmpty()
    @IsString()
    @IsEnum(RoleUtilisateur)
    role: string
}