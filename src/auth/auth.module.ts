import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UtilisateursModule } from 'src/utilisateurs/utilisateurs.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
  
  PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory:()=>({
        secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 3600 }
      })
      

    }),
    UtilisateursModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, JwtStrategy, RolesGuard]
})
export class AuthModule { }
