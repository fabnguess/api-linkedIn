import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UtilisateurEntity } from './../../utilisateurs/entities/utilisateur.entity';

export class CreateArticleDto {
   @IsNotEmpty()
   @IsString()
   contenu: string

   @IsNotEmpty()
   @IsNumber()
   auteur: UtilisateurEntity
}
