import { Module } from '@nestjs/common';
import { LoggerService } from 'src/modules/logger/services/logger.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { UsersController } from 'src/modules/users/controllers/users.controller';
import { UsersService } from 'src/modules/users/services/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, LoggerService],
  exports: [UsersService],
})
export class UsersModule {}
