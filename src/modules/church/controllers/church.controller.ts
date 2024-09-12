import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Auth, OpenControllerTag } from 'src/common/decorators';
import routes from 'src/common/routes';
import { ChurchCreateDTO } from 'src/modules/church/dto/church.create.dto';
import { ChurchUpdateDTO } from 'src/modules/church/dto/church.update.dto';
import { ChurchService } from 'src/modules/church/services/church.service';

@OpenControllerTag('Church', routes.church)
export class ChurchController {
  constructor(private readonly churchService: ChurchService) {}

  @Post()
  async create(@Body() data: ChurchCreateDTO) {
    return this.churchService.create(data);
  }

  @Auth()
  @Get()
  async findAll() {
    return this.churchService.findAll();
  }

  @Auth()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.churchService.findOne(id);
  }

  @Auth()
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: ChurchUpdateDTO) {
    return this.churchService.update(id, data);
  }

  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.churchService.delete(id);
  }
}
