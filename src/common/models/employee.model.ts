import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../constants/enums';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop()
  class: string;

  @Prop()
  subjects: string[];

  @Prop()
  attendance: number;

  @Prop({
    default: Role.Employee,
    enum: [Role.Employee, Role.ADMIN, Role.SUPER_ADMIN],
  })
  role: string;

  @Prop({ required: true })
  password: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
