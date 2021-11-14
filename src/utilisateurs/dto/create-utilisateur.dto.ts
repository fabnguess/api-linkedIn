import { IsEnum, IsString } from "class-validator"
import { RoleUtilisateur } from "src/utils/role-enum"

export class CreateUtilisateurDto {
    @IsString()
    nom: string

    @IsString()
    prenoms: string

    @IsString()
    email: string

    @IsString()
    motPasse:string

    @IsString()
    @IsEnum(RoleUtilisateur)
    role: string
}
