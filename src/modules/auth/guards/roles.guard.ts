import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

import { ROLES_KEY } from './../decorators/roles.decorator';
import { PayloadToken } from '../models/token.model';
import { Role } from '../models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    // ['admin', 'user']
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    // example: get de user
    // { role: 'admin', sub: 'daqw1231' }

    // const isAuth = roles.includes(user.role as Role);
    const isAuth = roles.some((role) => role == user.role);

    if (!isAuth) {
      throw new HttpException(`you don't have access`, HttpStatus.FORBIDDEN);
    }

    return isAuth;
  }
}
