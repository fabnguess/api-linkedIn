/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SetMetadata } from '@nestjs/common';
import { RoleUtilisateur } from 'src/utils/role-enum';

export const ROLES_KEY = 'roles'
export const Roles = (...roles: RoleUtilisateur[]) => SetMetadata(ROLES_KEY, roles);
