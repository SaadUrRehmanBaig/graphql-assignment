import { SignInResponseDto } from '@common/dtos/SignInDtosResponse';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeeRepository } from 'src/employee/employee.repository';
import * as bcrypt from 'bcrypt';
import { AppConstants } from '@common/constants/constants';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private employeeRepo: EmployeeRepository,
  ) {}
  async signIn(email: string, password: string): Promise<SignInResponseDto> {
    const user = await this.employeeRepo.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException({
        message: AppConstants.MESSGES.EMAIL_PASSWORD_WRONG,
      });
    }
    return {
      token: this.jwtService.sign({
        email: user.email,
        sub: user._id,
        role: user.role,
      }),
      email: user.email,
      name: user.name,
    };
  }
}
