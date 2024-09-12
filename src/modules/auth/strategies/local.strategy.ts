import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async validate(username: string, password: string): Promise<any> {
    console.log('enter here');

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      console.log(`attempt error: { username: ${username} }`);
      //throw new UnauthorizedException();
      throw new BadRequestException();
    }
    return user;
  }
}
