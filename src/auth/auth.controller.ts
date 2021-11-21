/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUtilisateurDto } from 'src/utilisateurs/dto/create-utilisateur.dto';
import { UpdateAuthDto } from './dto/connexion-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('inscription')
  inscription(@Body() createAuthDto: CreateUtilisateurDto) {
    return this.authService.inscription(createAuthDto);
  }

  @Post('connexion')
  connexion(@Body() cnxData: UpdateAuthDto) {
    return this.authService.connexion(cnxData);
  } 
}
