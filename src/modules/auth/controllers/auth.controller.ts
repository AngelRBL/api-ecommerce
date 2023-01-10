import {
  Controller,
  Post,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
  HttpCode,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from '../services/auth.service';
import { User } from './../../users/entities/user.entity';
import { CreateUserDto } from './../../users/dtos/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'Login' })
  @HttpCode(HttpStatus.OK)
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJwt(user);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'user register' })
  async register(@Body() payload: CreateUserDto) {
    const isExist = await this.authService.exists(payload.email);

    if (isExist) {
      throw new HttpException('Email has been exist', HttpStatus.BAD_REQUEST);
    }

    const created = await this.authService.registerUser(payload);

    if (!created) {
      throw new HttpException(
        'Error in create account',
        HttpStatus.BAD_REQUEST,
      );
    }

    return created;
  }
}
