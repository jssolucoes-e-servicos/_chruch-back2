import { Global, Module } from '@nestjs/common';
import { LoggerService } from 'src/modules/logger/services/logger.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Global()
@Module({
  providers: [PrismaService, LoggerService],
  exports: [PrismaService],
})
export class PrismaModule {}
