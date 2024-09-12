import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { configLoaderHelper } from 'src/common/helpers/config-loader.helper';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configLoaderHelper().jtw.secret,
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
