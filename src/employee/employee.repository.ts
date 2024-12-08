import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/common/constants/enums';
import { Employee, EmployeeDocument } from 'src/common/models/employee.model';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class EmployeeRepository extends BaseRepository<EmployeeDocument> {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {
    super(employeeModel);
  }

  async findByEmail(email: string): Promise<EmployeeDocument | null> {
    return this.employeeModel.findOne({ email }).exec();
  }

  async createSuperAdmin(
    employee: Partial<Employee>,
  ): Promise<EmployeeDocument> {
    if (!(await this.employeeModel.findOne({ role: Role.SUPER_ADMIN }))) {
      employee.role = Role.SUPER_ADMIN;
      return this.employeeModel.create(employee);
    }
  }
}
