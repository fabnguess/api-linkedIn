/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadDto } from './../dto/payload.dto';
import { UtilisateursService } from './../../utilisateurs/utilisateurs.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly utilisateurService: UtilisateursService,
    private readonly configService: ConfigService
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
      
  }

  async validate(payload: PayloadDto) {
    const user = await this.utilisateurService.afficherUtilisateur(payload.id)
    if (!user) {
      throw new UnauthorizedException('Utilisateur non autorisé')
    }

    return user;
  }
}
