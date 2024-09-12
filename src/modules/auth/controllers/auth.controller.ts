/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, ForbiddenException, Post, Request, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IRequestWithUser } from 'src/common/interfaces';
import routes from 'src/common/routes';
import { AuthDTO } from 'src/modules/auth/dto/auth.dto';
import { ChurchAuthGuard } from 'src/modules/auth/guards/church-auth.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { AuthService } from 'src/modules/auth/services/auth.service';

@ApiTags('Auth')
@Controller(routes.auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiSecurity('jwt')
  @UseGuards(ChurchAuthGuard)
  async loginWithOrigin(@Request() req: IRequestWithUser, @Body() data: AuthDTO) {
    const { app = null } = req.body;
    //Reject access in recovery
    if (app === null) {
      throw new ForbiddenException(`${req.user.name}, você não esta acessando através de uma aplicação autorizada.`);
    }
    //Reject access in recovery
    if (req.user.inRecovery) {
      throw new ForbiddenException(`${req.user.name}, você está em processo de recuperação de senha.`);
    }

    return this.authService.login(req.user);
  }

  @Post('unlock')
  @UseGuards(JwtAuthGuard)
  async unlock(@Body() data: { personId: string; password: string }) {
    return await this.authService.unlock(data);
  }
}
