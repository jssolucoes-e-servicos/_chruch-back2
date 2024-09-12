import { PartialType } from '@nestjs/mapped-types';
import { CellsNetworkCreateDTO } from 'src/modules/cells-network/dto/cells-network.create.dto';

export class CellsNetworkRetrieveDTO extends PartialType(CellsNetworkCreateDTO) {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
