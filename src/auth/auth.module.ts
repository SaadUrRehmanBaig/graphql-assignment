import { Module } from '@nestjs/common';
import { EnvService } from 'src/common/env/env.service';
import { EmployeeModule } from 'src/employee/employee.module';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    EmployeeModule,
    JwtModule.registerAsync({
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        secret: envService.get('JWT_SECRET'),
        signOptions: { expiresIn: envService.get('JWT_EXPIRY') },
      }),
    }),
    PassportModule,
  ],
  providers: [EnvService, JwtStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
