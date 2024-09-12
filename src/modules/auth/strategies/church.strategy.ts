import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { LoggerService } from 'src/modules/logger/services/logger.service';

@Injectable()
export class ChurchStrategy extends PassportStrategy(Strategy, 'church') {
  constructor(
    private readonly _authService: AuthService,
    private readonly _logger: LoggerService,
  ) {
    super();
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async validate(req: Request): Promise<any> {
    const { username, password } = req.body;
    const user = await this._authService.validateUser(username, password);
    if (!user) {
      this._logger.setWarn('ChurchStrategy', `attempt error: { username: ${username} }`);
      throw new UnauthorizedException();
    }
    return user;
  }
}
