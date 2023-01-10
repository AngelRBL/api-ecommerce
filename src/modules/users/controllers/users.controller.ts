import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Put,
  Post,
  Delete,
  Query,
  Param,
  HttpException,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { MailService } from '../../../mail/services/mail.service';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';
import { CreateUserDto, UpdateUserDto, FilterUserDto } from '../dtos/user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';
import { UsersService } from '../services/users.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private mailService: MailService,
  ) {}

  @Roles(Role.ADMIN)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Pagination of users' })
  async get(@Query() params: FilterUserDto) {
    const users = await this.userService.paginate(params);
    users.docs.forEach((user) => (user.password = undefined));

    return users;
  }

  @Roles(Role.ADMIN)
  @Get('list')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List of users' })
  async getList() {
    const users = await this.userService.find();
    users.forEach((user) => (user.password = undefined));

    return users;
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get one users' })
  async getOne(@Param('id', MongoIdPipe) id: string) {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new HttpException('Error user not found', HttpStatus.NOT_FOUND);
    }

    user.password = undefined;

    return user;
  }

  @Roles(Role.ADMIN)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create user' })
  async create(@Body() payload: CreateUserDto) {
    const exists = await this.userService.existEmail(payload.email);
    if (exists) {
      throw new HttpException(
        'Error the email is already registered',
        HttpStatus.FORBIDDEN,
      );
    }

    const created = await this.userService.create(payload);

    await this.mailService
      .sendMail(created.email, 'Welcome to ecommerce', './welcome')
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    created.password = undefined;

    return created;
  }

  @Roles(Role.ADMIN)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'update user' })
  async updateOne(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateUserDto,
  ) {
    const exists = await this.userService.existEmail(payload.email);
    if (!exists) {
      throw new HttpException(
        'Error the mail does not exist',
        HttpStatus.FORBIDDEN,
      );
    }

    return this.userService.updateOne(id, payload);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'delete user' })
  async deleteOne(@Param('id', MongoIdPipe) id: string) {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new HttpException('Error user not found', HttpStatus.NOT_FOUND);
    }

    return this.userService.deleteOne(user._id);
  }
}
