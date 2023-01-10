import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPositive,
  IsOptional,
  Min,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'user email' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'user password' })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'user role' })
  readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class FilterUserDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @Min(1)
  @IsOptional()
  page: number;

  @IsOptional()
  @IsString()
  role: string;
}
