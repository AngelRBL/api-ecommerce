import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  IsBoolean,
  IsNumber,
  IsMongoId,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'order total' })
  readonly total: number;

  @IsString()
  // @IsNotEmpty()
  @ApiProperty({ description: 'order charge_id' })
  readonly charge_id: string;

  @IsString()
  @ApiProperty({ description: 'order refund_id' })
  readonly refund_id: string;

  @IsNumber()
  @Min(1)
  @ApiProperty({ description: 'order quantity' })
  readonly quantity: number;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'order price' })
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'order status_payment' })
  readonly status_payment: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'order status' })
  readonly status: string;

  @IsString()
  // @IsNotEmpty()
  @ApiProperty({ description: 'order commentary' })
  readonly commentary: string;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ description: 'order product' })
  readonly product: string;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ description: 'order costumer' })
  readonly customer: string;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class FilterOrderDto {
  @IsPositive()
  @IsOptional()
  limit: number;

  @Min(1)
  @IsOptional()
  page: number;

  @IsOptional()
  @IsString()
  customer: string;

  @IsOptional()
  @IsString()
  charge_id: string;
}
