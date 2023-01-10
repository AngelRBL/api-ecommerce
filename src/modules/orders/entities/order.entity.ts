import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as MongoosePaginate from 'mongoose-paginate-v2';

import { Product } from './../../products/entities/product.entity';
@Schema()
export class Order extends Document {
  @Prop({ required: true, type: Number })
  total: number;

  @Prop({ type: String })
  charge_id: string;

  @Prop({ type: String, default: '' })
  refund_id: string;

  @Prop({ required: true, type: Number })
  quantity: number;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: String })
  status_payment: string;

  @Prop({
    required: true,
    type: String,
    enum: ['creada', 'preparando', 'aprobada', 'enviada', 'cancelado'],
    default: 'creada',
  })
  status: string;

  @Prop({ required: true, type: String })
  commentary: string;

  @Prop({ required: true, type: Types.ObjectId, ref: Product.name })
  product: Product | Types.ObjectId;

  @Prop({ required: true, type: String })
  customer: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.plugin(MongoosePaginate);
