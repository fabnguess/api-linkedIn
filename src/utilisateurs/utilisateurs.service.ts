/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { UtilisateurEntity } from './entities/utilisateur.entity';

@Injectable()
export class UtilisateursService {
  constructor(
    @InjectRepository(UtilisateurEntity)
    private readonly utilisateurRepository: Repository<UtilisateurEntity>
  ) { }

  async creerUtilisateur(utilisateurData: CreateUtilisateurDto) {
    const existe = await this.rechercherPar(utilisateurData.email)
    if (existe) {
      throw new ConflictException(`L'email ${utilisateurData.email} est déjà utlisé`)
    }

    const hashage = await this.hashMotDePasse(utilisateurData.motPasse)

    const utilisateur = this.utilisateurRepository.create(utilisateurData);
    utilisateur.salt = hashage['salt']
    utilisateur.motPasse = hashage['motPasseHashe']

    delete utilisateur.motPasse
    delete utilisateur.salt

    return this.utilisateurRepository.save(utilisateur);
  }

  listerUtilisateur(): Promise<UtilisateurEntity[]> {
    return this.utilisateurRepository.find();
  }

  afficherUtilisateur(id: number): Promise<UtilisateurEntity> {
    return this.utilisateurRepository.findOne(id);
  }

  modifierUtilisateur(id: number, utilisateurData: UpdateUtilisateurDto) {
    return this.utilisateurRepository.update(id, utilisateurData);
  }

  supprimerUtilisateur(id: number) {
    return this.utilisateurRepository.softDelete(id);
  }

  private async hashMotDePasse(motDePasse: string): Promise<Object> {
    const salt = await bcrypt.genSalt()
    const motPasseHashe = await bcrypt.hash(motDePasse, salt)
    return {
      salt,
      motPasseHashe
    }
  }

  async rechercherPar(email: string): Promise<UtilisateurEntity> {
    return await this.utilisateurRepository.findOne({ email })
  }
}
