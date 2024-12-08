import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';
import { EnvService } from 'src/common/env/env.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly envService: EnvService,
  ) {}

  async onApplicationBootstrap() {
    const hashedPassword = await bcrypt.hash(
      this.envService.get('SUPER_PASSWORD'),
      10,
    );
    this.employeeRepository.createSuperAdmin({
      email: this.envService.get('SUPER_USER'),
      name: 'Super-Admin',
      password: hashedPassword,
    });
  }
}
