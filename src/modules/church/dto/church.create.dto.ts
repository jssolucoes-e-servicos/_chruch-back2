import { ApiPropertyOptional } from '@nestjs/swagger';
import { AddressDTO } from 'src/common/dto/Address.dto';
import { BooleanValidator, EmailValidator, MongoIdValidator, PhoneValidator, StringValidator } from 'src/common/validators';

export class ChurchCreateDTO {
  @StringValidator({ fieldName: 'name', label: 'Razão Social' })
  name: string;

  @StringValidator({ fieldName: 'fantasy', label: 'Nome Fantasia', optional: true })
  fantasy?: string | null;

  @StringValidator({ fieldName: 'cnpj', label: 'CNPJ', minLength: 14 })
  cnpj: string;

  @StringValidator({ fieldName: 'ie', label: 'Inscrição Estadual (IE)', optional: true })
  ie?: string;

  @EmailValidator({ fieldName: 'email', label: 'Email', optional: true })
  email?: string | null;

  @PhoneValidator({ fieldName: 'phone', label: 'Telefone', optional: true })
  phone?: string | null;

  @StringValidator({ fieldName: 'shepherd', label: 'Nome do pastor responsável' })
  shepherd: string;

  @StringValidator({ fieldName: 'image', label: 'Image', optional: true })
  image?: string | null;

  @ApiPropertyOptional({ description: 'Endereço da igreja' })
  address?: AddressDTO;

  @BooleanValidator({ fieldName: 'isThirst', label: 'É uma sede', optional: true })
  isThirst?: boolean | null;

  //@StringValidator({ fieldName: 'ID do plano', })
  @MongoIdValidator({ fieldName: 'plainId', label: 'ID do plano' })
  plainId: string;
}
