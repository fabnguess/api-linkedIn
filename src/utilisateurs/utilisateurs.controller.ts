/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';

@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  @Post()
  creer(@Body() utilisateurData: CreateUtilisateurDto) {
    return this.utilisateursService.creerUtilisateur(utilisateurData);
  }

  @Get()
  liser() {
    return this.utilisateursService.listerUtilisateur();
  }

  @Get(':id')
  afficher(@Param('id') id: string) {
    return this.utilisateursService.afficherUtilisateur(+id);
  }

  @Put(':id')
  modifier(@Param('id') id: string, @Body() utilisateurData: UpdateUtilisateurDto) {
    return this.utilisateursService.modifierUtilisateur(+id, utilisateurData);
  }

  @Delete(':id')
  supprimer(@Param('id') id: string) {
    return this.utilisateursService.supprimerUtilisateur(+id);
  }
}
