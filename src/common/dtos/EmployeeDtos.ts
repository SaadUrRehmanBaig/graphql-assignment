import { AppConstants } from '@common/constants/constants';
import { Role } from '@common/constants/enums';
import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, Min } from 'class-validator';

@ObjectType()
export class EmployeeType {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  age: number;

  @Field({ nullable: true })
  class: string;

  @Field(() => [String], { nullable: true })
  subjects: string[];

  @Field({ nullable: true })
  attendance: number;

  @Field()
  role: string;
}

// @InputType()
// export class CreateEmployeeInput {
//   @Field()
//   @IsNotEmpty({ message: AppConstants.MESSGES.REQUIRED_EMAIL })
//   @IsEmail({}, { message: AppConstants.MESSGES.EMAIL_PASSWORD_WRONG })
//   email: string;

//   @Field()
//   @IsNotEmpty({ message: AppConstants.MESSGES.REQUIRED_NAME })
//   name: string;

//   @Field({ nullable: true })
//   @IsOptional()
//   @Min(18, { message: AppConstants.MESSGES.UNDER_AGE })
//   age: number;

//   @Field({ nullable: true })
//   class: string;

//   @Field(() => [String], { nullable: true })
//   subjects: string[];

//   @Field({ nullable: true })
//   attendance: number;

//   @Field()
//   @IsEnum([Role.ADMIN, Role.Employee])
//   role: string;

//   @Field()
//   @IsNotEmpty({ message: AppConstants.MESSGES.REQUIRED_PASSWORD })
//   password: string;
// }

// @InputType()
// export class UpdateEmployeeInput {
//   @Field()
//   email: string;

//   @Field()
//   name: string;

//   @Field({ nullable: true })
//   age: number;

//   @Field({ nullable: true })
//   class: string;

//   @Field(() => [String], { nullable: true })
//   subjects: string[];

//   @Field({ nullable: true })
//   attendance: number;

//   @Field()
//   password: string;
// }
