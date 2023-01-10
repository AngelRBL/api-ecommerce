import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  IsNumber,
  IsObject,
  IsArray,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'title  product' })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'description product' })
  readonly description: string;

  @IsNumber()
  @ApiProperty({ description: 'price product' })
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'image product' })
  readonly image: object;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'categories product' })
  readonly categories: Array<any>;

  @IsString()
  @ApiProperty({ description: 'brand product' })
  readonly brand: string;

  @IsString()
  @ApiProperty({ description: 'stock product' })
  readonly stock: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @Min(1)
  @IsOptional()
  page: number;

  @IsString()
  @IsOptional()
  category: string;
}
