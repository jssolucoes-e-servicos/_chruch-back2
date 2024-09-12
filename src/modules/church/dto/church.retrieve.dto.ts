import { PartialType } from '@nestjs/mapped-types';
import { ChurchCreateDTO } from 'src/modules/church/dto/church.create.dto';

export class ChurchRetrieveDTO extends PartialType(ChurchCreateDTO) {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}