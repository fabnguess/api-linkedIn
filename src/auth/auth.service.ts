/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/connexion-auth.dto';
import { UtilisateursService } from './../utilisateurs/utilisateurs.service';
import { CreateUtilisateurDto } from 'src/utilisateurs/dto/create-utilisateur.dto';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from './dto/payload.dto';



@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly utilisateurService: UtilisateursService
  ) { }

  inscription(AuthData: CreateUtilisateurDto) {
    return this.utilisateurService.creerUtilisateur(AuthData);
  }

  async connexion(cnxData: UpdateAuthDto):Promise<{access_token:string}> {
    const existe = await this.utilisateurService.rechercherPar(cnxData.email)
    if (!existe) {
      throw new NotFoundException('Utilisateur non trouvé')
    }
    const payload:PayloadDto={
      id:existe.id,
      role:existe.role
    }
    const token = this.jwtService.sign(payload)

    return {access_token:token}
  } 
}
