import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as MongoosePaginate from 'mongoose-paginate-v2';
import { Document } from 'mongoose';

import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
  @Prop({ required: true, unique: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({
    required: true,
    default: 'user',
    enum: ['user', 'admin'],
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(MongoosePaginate);
UserSchema.pre('save', async function (next) {
  const user = this as User;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // Random additional data
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(user.password, salt);

  // Replace the password with the hash
  user.password = hash;

  return next();
});
