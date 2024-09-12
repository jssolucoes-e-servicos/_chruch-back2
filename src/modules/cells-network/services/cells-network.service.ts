import { Injectable } from '@nestjs/common';
import { ResponseResultsHelper } from 'src/common/helpers/response-results.helper';
import { CellsNetworkCreateDTO } from 'src/modules/cells-network/dto/cells-network.create.dto';
import { CellsNetworkUpdateDTO } from 'src/modules/cells-network/dto/cells-network.update.dto';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class CellsNetworkService {
  constructor(private readonly prisma: PrismaService) {}
  private collection = 'cells-network';

  async create(data: CellsNetworkCreateDTO) {
    const dataExists = await this.prisma.cellsNetwork.findFirst({
      where: {
        name: data.name,
      },
    });
    if (dataExists) {
      ResponseResultsHelper.RegisterAlreadyExists(this.collection);
    }
    const church = await this.prisma.cellsNetwork.create({
      data,
    });

    return church;
  }

  async findAll() {
    return await this.prisma.cellsNetwork.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.cellsNetwork.findUnique({ where: { id } });
  }

  async update(id: string, data: CellsNetworkUpdateDTO) {
    const dataExists = await this.prisma.cellsNetwork.findUnique({
      where: {
        id,
      },
    });
    if (!dataExists) ResponseResultsHelper.RegisterNotExists(this.collection);
    return await this.prisma.cellsNetwork.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const dataExists = await this.prisma.cellsNetwork.findUnique({
      where: {
        id,
      },
    });
    if (!dataExists) ResponseResultsHelper.RegisterNotExists(this.collection);
    await this.prisma.cellsNetwork.delete({
      where: {
        id,
      },
    });
    return ResponseResultsHelper.RegisterDeleted(this.collection);
  }
}
