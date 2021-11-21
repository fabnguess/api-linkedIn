/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { UtilisateursService } from './utilisateurs.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorateurs/roles.decorator';
import { RoleUtilisateur } from 'src/utils/role-enum';
import { RolesGuard } from './../auth/guards/roles.guard';

@Controller('utilisateurs')
export class UtilisateursController {
  constructor(private readonly utilisateursService: UtilisateursService) {}

  @Post()
  creer(@Body() utilisateurData: CreateUtilisateurDto) {
    return this.utilisateursService.creerUtilisateur(utilisateurData);
  }
  
  @Roles(RoleUtilisateur.ADMIN, RoleUtilisateur.PREMIUM)
  @UseGuards(JwtAuthGuard, RolesGuard)
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
