import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/entities/user.entity';
import { CreateUserDto } from './../../users/dtos/user.dto';

import { PayloadToken } from '../models/token.model';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.existEmail(email);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return null;
    }

    user.password = undefined;
    return user;
  }

  generateJwt(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user._id };

    return { access_token: this.jwtService.sign(payload), user };
  }

  registerUser(payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  exists(email: string) {
    return this.userService.existEmail(email);
  }
}
