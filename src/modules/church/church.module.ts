import { Module } from '@nestjs/common';
import { ChurchController } from 'src/modules/church/controllers/church.controller';
import { ChurchService } from 'src/modules/church/services/church.service';
import { LoggerService } from 'src/modules/logger/services/logger.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Module({
  controllers: [ChurchController],
  providers: [PrismaService, LoggerService, ChurchService],
  exports: [ChurchService],
})
export class ChurchModule {}
