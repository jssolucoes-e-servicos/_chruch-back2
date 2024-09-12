import { Controller, UseGuards, applyDecorators } from "@nestjs/common";
import { ApiSecurity, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/modules/auth/guards/jwt-auth.guard";

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
export function AuthControllerTag(tag: string, route: string) {
  return applyDecorators(
    //SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard),
    Controller(route),
    ApiTags(tag),
    ApiSecurity("JWT-auth"),
    ApiUnauthorizedResponse({ description: "Unauthorized" }),
  );
}
