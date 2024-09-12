import { Module } from '@nestjs/common';
import { CellsNetworkController } from 'src/modules/cells-network/controllers/cells-network.controller';
import { CellsNetworkService } from 'src/modules/cells-network/services/cells-network.service';
import { LoggerService } from 'src/modules/logger/services/logger.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Module({
  controllers: [CellsNetworkController],
  providers: [PrismaService, LoggerService, CellsNetworkService],
  exports: [CellsNetworkService],
})
export class CellsNetworkModule {}
