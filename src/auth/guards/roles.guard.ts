import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RoleUtilisateur } from 'src/utils/role-enum';
import { ROLES_KEY } from './../decorateurs/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const requireRoles = this.reflector.getAllAndOverride<RoleUtilisateur[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])


    if (!requireRoles) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()

    return requireRoles.some((role) => user.role?.includes(role));
  }
}
