import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, FilterQuery } from 'mongoose';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto, FilterUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(User.name) private paginateModel: PaginateModel<User>,
  ) {}

  find() {
    const filters: FilterQuery<User> = {};

    filters.role = { $in: 'user' };

    return this.userModel.find(filters);
  }

  paginate(params?: FilterUserDto) {
    const filters: FilterQuery<User> = {};

    const options = {
      page: params ? Number(params.page) : 1,
      limit: params ? Number(params.limit) : 32,
    };

    if (params) {
      const { role } = params;

      if (role) {
        filters.role = { $in: role };
      }
    }

    return this.paginateModel.paginate(filters, options);
  }

  findById(id: string) {
    return this.userModel.findById(id).exec();
  }
  existEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  create(payload: CreateUserDto) {
    return this.userModel.create(payload);
  }

  updateOne(id: string, payload: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );
  }

  deleteOne(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
