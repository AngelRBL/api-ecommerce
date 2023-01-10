import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as MongoosePaginate from 'mongoose-paginate-v2';

@Schema()
export class Product extends Document {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: Object })
  image: object;

  @Prop({ required: true, type: Types.ObjectId })
  categories: string;

  @Prop({ required: true, type: Types.ObjectId })
  brand: string;

  @Prop({ required: true, type: Number })
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.plugin(MongoosePaginate);
