import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EnvService } from 'src/common/env/env.service';
import { EmployeeRepository } from './employee.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from 'src/common/models/employee.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  providers: [EmployeeService, EnvService, EmployeeRepository],
  exports: [EmployeeRepository],
})
export class EmployeeModule {}
