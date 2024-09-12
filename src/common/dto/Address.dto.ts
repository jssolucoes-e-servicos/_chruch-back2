import { ApiPropertyOptional } from '@nestjs/swagger';
import { AddressesTypeEnum } from '../enums';

// DTO para os códigos IBGE
export class IbgeCodesDTO {
  @ApiPropertyOptional({ description: 'Código IBGE da cidade' })
  city?: string;

  @ApiPropertyOptional({ description: 'Código IBGE do estado' })
  state?: string;
}

// DTO para as coordenadas geográficas
export class LocationDTO {
  @ApiPropertyOptional({ description: 'Latitude' })
  lat?: string;

  @ApiPropertyOptional({ description: 'Longitude' })
  lng?: string;
}

// DTO para o endereço
export class AddressDTO {
  @ApiPropertyOptional({ description: 'Tipo de endereço', enum: AddressesTypeEnum })
  type?: AddressesTypeEnum;

  @ApiPropertyOptional({ description: 'Endereço completo em uma única linha' })
  inLine?: string;

  @ApiPropertyOptional({ description: 'CEP' })
  cep?: string;

  @ApiPropertyOptional({ description: 'Logradouro' })
  street?: string;

  @ApiPropertyOptional({ description: 'Número' })
  number?: string;

  @ApiPropertyOptional({ description: 'Complemento' })
  complement?: string;

  @ApiPropertyOptional({ description: 'Bairro' })
  neighborhood?: string;

  @ApiPropertyOptional({ description: 'Cidade' })
  city?: string;

  @ApiPropertyOptional({ description: 'Estado' })
  state?: string;

  @ApiPropertyOptional({ description: 'Códigos IBGE' })
  ibgeCodes?: IbgeCodesDTO;

  @ApiPropertyOptional({ description: 'Coordenadas geográficas' })
  location?: LocationDTO;
}
