import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import {
  CreateEmployeeInput,
  EmployeeType,
  // UpdateEmployeeInput,
} from '@common/dtos/EmployeeDtos';
import { Employee, EmployeeDocument } from '@common/models/employee.model';
import { EmployeeService } from '../employee.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@common/guards/jwt-auth/jwt-auth.guard';
import { RoleGuard } from '@common/guards/role/role.guard';
import { Roles } from '@common/decorators/role/roles.decorator';
import { Role } from '@common/constants/enums';

@UseGuards(JwtAuthGuard, RoleGuard)
@Resolver(() => EmployeeType)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Roles(Role.SUPER_ADMIN)
  @Mutation(() => EmployeeType)
  async createAdmin(
    @Args('createAdminInput') createAdminInput: CreateEmployeeInput,
  ): Promise<Employee> {
    const employee = createAdminInput as EmployeeDocument;
    employee.role = Role.ADMIN;
    return this.employeeService.create(employee);
  }

  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Mutation(() => EmployeeType)
  async createEmployee(
    @Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput,
  ): Promise<Employee> {
    const employee = createEmployeeInput as EmployeeDocument;
    employee.role = Role.Employee;
    return this.employeeService.create(employee);
  }

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
