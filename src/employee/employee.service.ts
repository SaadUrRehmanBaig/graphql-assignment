import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';
import { EnvService } from 'src/common/env/env.service';
import * as bcrypt from 'bcrypt';
// import {
//   CreateEmployeeInput,
//   UpdateEmployeeInput,
// } from './schema/employee.schema';
import { Employee, EmployeeDocument } from '@common/models/employee.model';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly envService: EnvService,
  ) {}

  async create(employee: EmployeeDocument): Promise<Employee> {
    employee.password = await this.createHashedPassword(employee.password);
    return (await this.employeeRepository.create(employee)).save();
  }

  // async update(
  //   id: string,
  //   updateEmployeeInput: UpdateEmployeeInput,
  // ): Promise<Employee> {
  //   return this.employeeModel.findByIdAndUpdate(id, updateEmployeeInput, {
  //     new: true,
  //   });
  // }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.findAll();
  }

  async findOne(id: string): Promise<Employee> {
    return this.employeeRepository.findOneById(id);
  }

  async onApplicationBootstrap() {
    const hashedPassword = await this.createHashedPassword(
      this.envService.get('SUPER_PASSWORD'),
    );
    this.employeeRepository.createSuperAdmin({
      email: this.envService.get('SUPER_USER'),
      name: 'Super-Admin',
      password: hashedPassword,
    });
  }

  async createHashedPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
}
