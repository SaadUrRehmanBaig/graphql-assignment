import { Role } from '@common/constants/enums';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...args: Role[]) => SetMetadata('roles', args);
