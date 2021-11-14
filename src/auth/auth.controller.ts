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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
