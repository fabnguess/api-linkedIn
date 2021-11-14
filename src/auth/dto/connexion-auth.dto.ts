import { IsEmail, IsNotEmpty } from 'class-validator';


export class UpdateAuthDto  {
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    motPasse:string
}
