import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvService } from './common/env/env.service';
import { EnvModule } from './common/env/env.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { ApolloDriver } from '@nestjs/apollo';
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { EmployeeResolver } from './employee/schema/employee.resolve';
import { EmployeeService } from './employee/employee.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    MongooseModule.forRootAsync({
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        uri: envService.get('MONGO_URI'),
      }),
    }),
    EnvModule,
    EmployeeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, EnvService, EmployeeResolver, EmployeeService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
  
}
