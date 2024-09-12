import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { configLoaderHelper } from 'src/common/helpers/config-loader.helper';
import { AuthController } from 'src/modules/auth//controllers/auth.controller';
import { AuthService } from 'src/modules/auth//services/auth.service';
import { ChurchStrategy } from 'src/modules/auth/strategies/church.strategy';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { LoggerService } from 'src/modules/logger/services/logger.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { UsersModule } from 'src/modules/users/users.module';
import { UsersService } from '../users/services/users.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: configLoaderHelper().jtw.secret,
      signOptions: { expiresIn: 0 },
    }),
  ],
  controllers: [AuthController],
  providers: [PrismaService, LoggerService, AuthService, LocalStrategy, ChurchStrategy, JwtStrategy, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
