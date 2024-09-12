import { RolesGuard } from 'src/modules/auth/guards/roles.guard';

import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

export function Auth(/* ...roles: RolesEnum[] */) {
  return applyDecorators(
    /* SetMetadata("roles", roles), */
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    //ApiSecurity('JWT-auth'),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

/* export function AuthTag(...roles: RolesEnum[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(
      JwtAuthGuard,
    ),
    ApiSecurity('JWT-auth'),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
 */
