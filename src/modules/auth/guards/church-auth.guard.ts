import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class ChurchAuthGuard extends AuthGuard("church") {}
