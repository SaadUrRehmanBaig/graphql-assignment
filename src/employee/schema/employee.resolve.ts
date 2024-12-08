import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  EmployeeType,
  // CreateEmployeeInput,
  // UpdateEmployeeInput,
} from '@common/dtos/EmployeeDtos';
import { Employee } from '@common/models/employee.model';
import { EmployeeService } from '../employee.service';

@Resolver(() => EmployeeType)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  // @Mutation(() => EmployeeType)
  // async createEmployee(
  //   @Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput,
  // ): Promise<Employee> {
  //   return this.employeeService.create(createEmployeeInput);
  // }

  // @Mutation(() => EmployeeType)
  // async updateEmployee(
  //   @Args('id') id: string,
  //   @Args('updateEmployeeInput') updateEmployeeInput: UpdateEmployeeInput,
  // ): Promise<Employee> {
  //   return this.employeeService.update(id, updateEmployeeInput);
  // }

  @Query(() => [EmployeeType])
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Query(() => EmployeeType)
  async findOne(@Args('id') id: string): Promise<Employee> {
    return this.employeeService.findOne(id);
  }
}
