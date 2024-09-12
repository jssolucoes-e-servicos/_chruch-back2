import { Injectable } from '@nestjs/common';
import { ResponseResultsHelper } from 'src/common/helpers/response-results.helper';
import { ChurchCreateDTO } from 'src/modules/church/dto/church.create.dto';
import { ChurchUpdateDTO } from 'src/modules/church/dto/church.update.dto';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class ChurchService {
  constructor(private readonly prisma: PrismaService) {}
  private collection = 'Churches';

  async create(data: ChurchCreateDTO) {
    const dataExists = await this.prisma.church.findUnique({
      where: {
        cnpj: data.cnpj,
      },
    });
    if (dataExists) {
      ResponseResultsHelper.RegisterAlreadyExists(this.collection);
    }
    const church = await this.prisma.church.create({
      data: {
        name: data.name,
        fantasy: data.fantasy,
        cnpj: data.cnpj,
        ie: data.ie,
        shepherd: data.shepherd,
        email: data.email,
        phone: data.phone,
        isThirst: data.isThirst,
        plainId: data.plainId,
        address: {
          type: 'comercial',
          cep: data.address.cep,
          street: data.address.street,
          number: data.address.number,
          complement: data.address.complement,
          neighborhood: data.address.neighborhood,
          city: data.address.city,
          state: data.address.state,
          inLine: data.address.inLine,
          ibgeCodes: {
            city: data.address.ibgeCodes.city,
            state: data.address.ibgeCodes.state,
          },
          location: {
            lat: data.address.location.lat,
            lng: data.address.location.lng,
          },
        },
      },
    });

    return church;
  }

  async findAll() {
    return await this.prisma.church.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.church.findUnique({ where: { id } });
  }

  async update(id: string, data: ChurchUpdateDTO) {
    const dataExists = await this.prisma.church.findUnique({
      where: {
        id,
      },
    });
    if (!dataExists) ResponseResultsHelper.RegisterNotExists(this.collection);
    return await this.prisma.church.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const dataExists = await this.prisma.church.findUnique({
      where: {
        id,
      },
    });
    if (!dataExists) ResponseResultsHelper.RegisterNotExists(this.collection);
    await this.prisma.church.delete({
      where: {
        id,
      },
    });
    return ResponseResultsHelper.RegisterDeleted(this.collection);
  }
}
