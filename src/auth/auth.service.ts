/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/connexion-auth.dto';
import { UtilisateursService } from './../utilisateurs/utilisateurs.service';
import { CreateUtilisateurDto } from 'src/utilisateurs/dto/create-utilisateur.dto';



@Injectable()
export class AuthService {
  constructor(
       private readonly utilisateurService : UtilisateursService
    ){}

  inscription(AuthData: CreateUtilisateurDto) {
    return this.utilisateurService.creerUtilisateur(AuthData);
  }

  async connexion(cnxData: UpdateAuthDto) {      
    const existe = await this.utilisateurService.rechercherPar(cnxData.email)
    if (!existe) {
      throw new NotFoundException('Utilisateur non trouvé')
    }

    return existe
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
