import { PartialType } from '@nestjs/mapped-types';
import { ChurchCreateDTO } from 'src/modules/church/dto/church.create.dto';

export class ChurchUpdateDTO extends PartialType(ChurchCreateDTO) {}