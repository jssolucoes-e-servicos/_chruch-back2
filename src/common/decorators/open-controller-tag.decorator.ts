import { Controller, applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
export function OpenControllerTag(tag: string, route: string) {
  return applyDecorators(Controller(route), ApiTags(tag));
}
