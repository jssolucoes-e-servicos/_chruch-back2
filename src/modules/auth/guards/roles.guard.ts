import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/common/decorators/roles.decorator";
import { RolesEnum } from "src/common/enums/roles.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredProfiles = this.reflector.getAllAndOverride<RolesEnum[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredProfiles) {
      console.log("role guard is true", requiredProfiles);
      return true;
    }
    const req = context.switchToHttp().getRequest();
    //console.log(req);

    //const { user } = context.switchToHttp().getRequest();
    //console.log(user);
    return true; //requiredProfiles.some((profile) => user.profile?.includes(profile));
  }
}
