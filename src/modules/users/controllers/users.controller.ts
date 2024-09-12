import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Auth, OpenControllerTag } from 'src/common/decorators';
import { IFindWithName } from 'src/common/interfaces/find-with-name.interface';
import routes from 'src/common/routes';
import { UserCreateDTO } from 'src/modules/users/dto/users.create.dto';
import { UserUpdateDTO } from 'src/modules/users/dto/users.update.dto';
import { UsersService } from 'src/modules/users/services/users.service';

@OpenControllerTag('Users', routes.users)
export class UsersController {
  constructor(private readonly _service: UsersService) {}

  @Post(':churchId')
  async create(@Param('churchId') churchId: string, @Body() data: UserCreateDTO) {
    return this._service.create(churchId, data);
  }

  @Post(':churchId/firt-auth')
  async createWithNotAuth(@Param('churchId') churchId: string, @Body() data: UserCreateDTO) {
    return this._service.create(churchId, data);
  }

  @Auth()
  @Get('global')
  async findGlobal() {
    return this._service.findGlobal();
  }

  @Auth()
  @Get(':churchId')
  async findAll(@Param('churchId') churchId: string) {
    return this._service.findAll(churchId);
  }

  @Auth()
  @Get(':churchId/:id')
  async findOne(@Param('id') id: string) {
    return this._service.findOne(id);
  }

  //@UseGuards(JwtAuthGuard)
  @Auth()
  @Post(':churchId/find-with-name')
  async findWithName(@Param('churchId') churchId: string, @Body() data: IFindWithName, @Query('skip') skip: number) {
    if (skip === undefined) {
      skip = 0;
    }
    return this._service.findWithName(churchId, data);
  }

  @Auth()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UserUpdateDTO) {
    return this._service.update(id, data);
  }

  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this._service.delete(id);
  }
}
